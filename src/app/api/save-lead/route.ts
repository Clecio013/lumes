import { NextResponse } from 'next/server';
import { SheetsClient } from '@/lib/@lumes/sheets';
import { getCurrentBatch } from '@/app/projeto45dias/lib/batches-config';

/**
 * POST /api/save-lead
 *
 * Salva dados do lead no Google Sheets ANTES de criar o checkout
 * Status Lead: "Lead capturado"
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, email, telefone, nascimento, lote_id } = body;

    // Validação básica
    if (!nome || !email || !telefone || !nascimento || !lote_id) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Validar se nome tem sobrenome (ao menos 2 palavras)
    if (nome.split(' ').length < 2) {
      return NextResponse.json(
        { error: 'Por favor, informe seu nome completo' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validar telefone (apenas números, 10 ou 11 dígitos)
    const phoneNumbers = telefone.replace(/\D/g, '');
    if (phoneNumbers.length !== 10 && phoneNumbers.length !== 11) {
      return NextResponse.json(
        { error: 'Telefone inválido' },
        { status: 400 }
      );
    }

    // Validar data de nascimento (formato YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(nascimento)) {
      return NextResponse.json(
        { error: 'Formato de data inválido' },
        { status: 400 }
      );
    }

    // Buscar informações do lote atual
    const batch = getCurrentBatch();

    if (!batch || batch.id !== lote_id) {
      return NextResponse.json(
        { error: 'Lote inválido ou campanha encerrada' },
        { status: 400 }
      );
    }

    // Calcular splits (20% Lumes, 40% Amauri, 40% Seyune)
    const splitLumes = batch.promotionalPrice * 0.2;
    const splitAmauri = batch.promotionalPrice * 0.4;
    const splitSeyune = batch.promotionalPrice * 0.4;

    // Formatar telefone para exibição
    const formattedPhone = phoneNumbers.length === 11
      ? `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2, 7)}-${phoneNumbers.slice(7)}`
      : `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2, 6)}-${phoneNumbers.slice(6)}`;

    // Formatar data para pt-BR
    const [year, month, day] = nascimento.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    // Criar cliente Google Sheets
    const sheetsClient = SheetsClient.create({
      privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY!,
      clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
      sheetId: process.env.GOOGLE_SHEETS_SHEET_ID!,
      sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1',
    });

    console.log('[Save Lead API] Salvando lead:', {
      nome,
      email,
      telefone: formattedPhone,
      nascimento: formattedDate,
      lote: batch.name,
    });

    // Salvar lead no Google Sheets
    await sheetsClient.addRow({
      Data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      Nome: nome,
      Email: email,
      Telefone: formattedPhone,
      Nascimento: formattedDate,
      Lote: batch.name,
      'Preço Total': `R$ ${batch.promotionalPrice.toFixed(2)}`,
      'Lumes (20%)': `R$ ${splitLumes.toFixed(2)}`,
      'Amauri (40%)': `R$ ${splitAmauri.toFixed(2)}`,
      'Seyune (40%)': `R$ ${splitSeyune.toFixed(2)}`,
      'Status Lead': 'Lead capturado',
      'Status Pagamento': '-',
      'WebDiet?': 'Não',
      'MFit?': 'Não',
      'Preference ID': '',
      'ID MP': '',
      Link: '',
    });

    console.log('[Save Lead API] ✅ Lead salvo com sucesso');

    return NextResponse.json({
      success: true,
      email,
    });
  } catch (error) {
    console.error('[Save Lead API] Erro:', error);

    return NextResponse.json(
      { error: 'Erro ao salvar lead' },
      { status: 500 }
    );
  }
}
