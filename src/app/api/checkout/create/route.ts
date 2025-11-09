import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { MercadoPagoClient } from '@/lib/@lumes/mercadopago';
import { getCurrentBatch } from '@/app/projeto45dias/lib/batches-config';

/**
 * POST /api/checkout/create
 *
 * Cria checkout do Mercado Pago para Projeto 45 Graus
 * Versão simplificada: não coleta dados antes, MP coleta tudo
 */
export async function POST() {
  try {
    // Validar lote atual
    const batch = getCurrentBatch();

    if (!batch) {
      return NextResponse.json(
        { error: 'Campanha encerrada ou não iniciada' },
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

    // Gerar identificador único para este checkout
    const uniqueRef = randomUUID();

    // Criar checkout (metadata simplificado - sem user data, sem lote)
    const checkout = await mpClient
      .checkout()
      .withAmount(batch.promotionalPrice, 'Projeto 45 Graus')
      .withMetadata({
        preco_total: batch.promotionalPrice,
        split_lumes: splitLumes,
        split_amauri: splitAmauri,
        split_seyune: splitSeyune,
        campanha: 'projeto45dias',
        reference: uniqueRef,
      })
      .withSuccessUrl(`${process.env.NEXT_PUBLIC_URL}/projeto45dias/obrigado`)
      .withFailureUrl(`${process.env.NEXT_PUBLIC_URL}/projeto45dias/erro`)
      .withPendingUrl(`${process.env.NEXT_PUBLIC_URL}/projeto45dias/obrigado`)
      .withStatementDescriptor('PROJETO45')
      .withExternalReference(uniqueRef)
      .build();

    console.log('[Checkout API] Checkout criado:', {
      preferenceId: checkout.id,
      reference: uniqueRef,
    });

    return NextResponse.json({
      checkoutUrl: checkout.init_point,
      preferenceId: checkout.id,
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
