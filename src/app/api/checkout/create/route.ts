import { NextResponse } from 'next/server';
import { MercadoPagoClient } from '@/lib/@lumes/mercadopago';
import { getCurrentBatch } from '@/app/projeto45dias/lib/batches-config';
import { hasAvailableSlots } from '@/app/projeto45dias/lib/slots-manager';
import { SheetsClient } from '@/lib/@lumes/sheets';

/**
 * POST /api/checkout/create
 *
 * Cria checkout do Mercado Pago para Projeto 45 Graus
 * Agora recebe TODOS os dados do usuário (coletados antes do pagamento)
 */
export async function POST(req: Request) {
  try {
    // Parse body
    const body = await req.json();
    const { nome, email, telefone, nascimento } = body;

    // Validação básica
    if (!nome || !email || !telefone || !nascimento) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Validar lote atual
    const batch = getCurrentBatch();

    if (!batch) {
      return NextResponse.json(
        { error: 'Campanha encerrada ou não iniciada' },
        { status: 400 }
      );
    }

    // Verificar se há vagas disponíveis
    const slotsAvailable = await hasAvailableSlots(batch.id);

    if (!slotsAvailable) {
      return NextResponse.json(
        { error: 'Vagas esgotadas para este lote' },
        { status: 400 }
      );
    }

    // Criar cliente Mercado Pago
    // Nota: Use sandbox: true com credenciais de TESTE, sandbox: false com credenciais de PRODUÇÃO
    const mpClient = MercadoPagoClient.create({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
      sandbox: process.env.NODE_ENV !== 'production', // true em desenvolvimento (credenciais de teste)
    });

    // Calcular splits (20% Lumes, 40% Amauri, 40% Seyune)
    const splitLumes = batch.promotionalPrice * 0.2;
    const splitAmauri = batch.promotionalPrice * 0.4;
    const splitSeyune = batch.promotionalPrice * 0.4;

    // Criar checkout com TODOS os dados do usuário no metadata
    const checkout = await mpClient
      .checkout()
      .withAmount(batch.promotionalPrice, `Projeto 45 Graus - ${batch.name}`)
      .withPayer({ email })
      .withMetadata({
        // Dados do lote
        lote_id: batch.id,
        lote_name: batch.name,
        preco_total: batch.promotionalPrice,
        split_lumes: splitLumes,
        split_amauri: splitAmauri,
        split_seyune: splitSeyune,
        campanha: 'projeto45dias',
        // Dados do usuário (garantir disponibilidade no webhook)
        user_nome: nome,
        user_email: email,
        user_telefone: telefone,
        user_nascimento: nascimento,
      })
      .withSuccessUrl(`${process.env.NEXT_PUBLIC_URL}/projeto45dias/obrigado`)
      .withFailureUrl(`${process.env.NEXT_PUBLIC_URL}/projeto45dias/erro`)
      .withPendingUrl(`${process.env.NEXT_PUBLIC_URL}/projeto45dias/obrigado`)
      .withStatementDescriptor('PROJETO45')
      .build();

    console.log('[Checkout API] Checkout criado:', {
      preferenceId: checkout.id,
      email,
    });

    // Atualizar Google Sheets com Preference ID e Status Lead
    try {
      const sheetsClient = SheetsClient.create({
        privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY!,
        clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
        sheetId: process.env.GOOGLE_SHEETS_SHEET_ID!,
        sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1',
      });

      await sheetsClient.updateRowByColumn({
        searchColumn: 'Email',
        searchValue: email,
        updates: {
          'Preference ID': checkout.id,
          'Status Lead': 'Checkout criado',
        },
      });

      console.log('[Checkout API] Google Sheets atualizado com Preference ID');
    } catch (updateError) {
      // Não falhar o checkout se atualização do Sheets falhar
      console.error('[Checkout API] Erro ao atualizar Sheets (não crítico):', updateError);
    }

    return NextResponse.json({
      checkoutUrl: checkout.init_point,
      preferenceId: checkout.id,
      lote: batch.name,
      preco: batch.promotionalPrice,
    });
  } catch (error) {
    console.error('[Checkout API] Erro:', error);

    // Log detalhado do erro
    if (error instanceof Error) {
      console.error('[Checkout API] Message:', error.message);
      console.error('[Checkout API] Stack:', error.stack);

      // Se for erro do Mercado Pago, mostrar detalhes
      if ('originalError' in error) {
        console.error('[Checkout API] Original Error:', JSON.stringify((error as any).originalError, null, 2));
      }
    }

    return NextResponse.json(
      { error: 'Erro ao criar checkout. Tente novamente.' },
      { status: 500 }
    );
  }
}
