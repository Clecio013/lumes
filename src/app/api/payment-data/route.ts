import { NextRequest, NextResponse } from 'next/server';
import { SheetsClient } from '@/lib/@lumes/sheets/client';

/**
 * GET /api/payment-data?payment_id=123456789
 *
 * Busca dados de um pagamento específico para exibir na página de obrigado
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const paymentId = searchParams.get('payment_id');

    // Validar payment_id
    if (!paymentId) {
      return NextResponse.json(
        { success: false, error: 'Payment ID é obrigatório' },
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

    // Buscar linha por Payment ID
    const row = await sheetsClient.findRowByColumn({
      searchColumn: 'Payment ID',
      searchValue: paymentId,
    });

    if (!row) {
      return NextResponse.json(
        { success: false, error: 'Pagamento não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se já tem data de nascimento
    const nascimento = row['Nascimento'] || '';
    const hasNascimento = nascimento !== '' && nascimento !== '-';

    // Extrair preço (remover "R$ " e converter)
    const precoStr = String(row['Preço Total'] || '0');
    const preco = parseFloat(precoStr.replace(/[^0-9.,]/g, '').replace(',', '.'));

    // Retornar dados necessários para UI
    return NextResponse.json({
      success: true,
      data: {
        nome: String(row['Nome'] || ''),
        email: String(row['Email'] || ''),
        telefone: String(row['Telefone'] || ''),
        preco,
        hasNascimento,
        paymentId,
      },
    });
  } catch (error) {
    console.error('[API /payment-data] Erro:', error);

    return NextResponse.json(
      { success: false, error: 'Erro ao buscar dados do pagamento' },
      { status: 500 }
    );
  }
}
