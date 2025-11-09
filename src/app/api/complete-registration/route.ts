import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { SheetsClient } from '@/lib/@lumes/sheets/client';

/**
 * Schema de validação
 */
const CompleteRegistrationSchema = z.object({
  paymentId: z.string().min(1, 'Payment ID é obrigatório'),
  nascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),
});

/**
 * Calcula idade a partir de data de nascimento
 */
function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/**
 * Formata data de YYYY-MM-DD para DD/MM/YYYY
 */
function formatDateBR(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * POST /api/complete-registration
 *
 * Salva data de nascimento após compra
 *
 * Body: { paymentId: string, nascimento: string (YYYY-MM-DD) }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar dados
    const validation = CompleteRegistrationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const { paymentId, nascimento } = validation.data;

    // Validar idade (18-100 anos)
    const birthDate = new Date(nascimento);
    const age = calculateAge(birthDate);

    if (age < 18) {
      return NextResponse.json(
        {
          success: false,
          error: 'Você deve ter pelo menos 18 anos para participar do programa',
        },
        { status: 400 }
      );
    }

    if (age > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Data de nascimento inválida',
        },
        { status: 400 }
      );
    }

    // Conectar com Google Sheets
    const sheetsClient = SheetsClient.create({
      privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY!,
      clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
      sheetId: process.env.GOOGLE_SHEETS_SHEET_ID!,
      sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1',
    });

    // Buscar linha para verificar se já existe
    const row = await sheetsClient.findRowByColumn({
      searchColumn: 'Payment ID',
      searchValue: paymentId,
    });

    if (!row) {
      return NextResponse.json(
        {
          success: false,
          error: 'Pagamento não encontrado. Entre em contato com o suporte.',
        },
        { status: 404 }
      );
    }

    // Verificar se já tem data de nascimento (evitar override)
    const existingNascimento = row['Nascimento'] || '';
    if (existingNascimento !== '' && existingNascimento !== '-') {
      return NextResponse.json(
        {
          success: false,
          error: 'Cadastro já foi completado anteriormente',
        },
        { status: 400 }
      );
    }

    // Atualizar data de nascimento
    await sheetsClient.updateRowByColumn({
      searchColumn: 'Payment ID',
      searchValue: paymentId,
      updates: {
        Nascimento: formatDateBR(nascimento),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Cadastro completo com sucesso!',
    });
  } catch (error) {
    console.error('[API /complete-registration] Erro:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao salvar dados. Tente novamente.',
      },
      { status: 500 }
    );
  }
}
