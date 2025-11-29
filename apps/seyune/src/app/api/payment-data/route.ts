import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { SheetsClient } from '@lumes/sheets/client';

/**
 * GET /api/payment-data?payment_id=123456789
 *
 * Busca dados de um pagamento específico para exibir na página de obrigado
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let paymentId = searchParams.get('payment_id');
    const sessionId = searchParams.get('session_id');

    console.log('[API /payment-data] Parâmetros recebidos:', { paymentId, sessionId });

    // Se payment_id é na verdade um session_id do Stripe (começa com cs_)
    if (paymentId && paymentId.startsWith('cs_')) {
      console.log('[API /payment-data] payment_id é um session_id, convertendo...');
      try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
        const session = await stripe.checkout.sessions.retrieve(paymentId);
        const originalSessionId = paymentId;
        paymentId = session.payment_intent as string;

        console.log('[API /payment-data] Convertido session_id para payment_intent:', {
          sessionId: originalSessionId,
          paymentIntentId: paymentId,
        });
      } catch (error) {
        console.error('[API /payment-data] Erro ao buscar session do Stripe:', error);
      }
    }
    // Se não tem payment_id mas tem session_id (Stripe), buscar payment_intent
    else if (!paymentId && sessionId) {
      // Se session_id começa com "cs_", é do Stripe - buscar payment_intent
      if (sessionId.startsWith('cs_')) {
        try {
          const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
          const session = await stripe.checkout.sessions.retrieve(sessionId);
          paymentId = session.payment_intent as string;

          console.log('[API /payment-data] Convertido session_id para payment_intent:', {
            sessionId,
            paymentIntentId: paymentId,
          });
        } catch (error) {
          console.error('[API /payment-data] Erro ao buscar session do Stripe:', error);
        }
      } else {
        // Caso seja outro formato, usar session_id diretamente
        paymentId = sessionId;
      }
    }

    console.log('[API /payment-data] Buscando pagamento com ID:', paymentId);

    // Validar payment_id
    if (!paymentId) {
      return NextResponse.json(
        { success: false, error: 'Payment ID ou Session ID é obrigatório' },
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
