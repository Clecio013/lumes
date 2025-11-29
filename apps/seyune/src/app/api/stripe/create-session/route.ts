import { NextRequest, NextResponse } from 'next/server';
import { StripeClient, CheckoutBuilder } from '@lumes/stripe';
import { getCurrentBatch } from '@/app/projeto45dias/lib/batches-config';

/**
 * Interface para requisição de criação de sessão
 */
interface CreateSessionRequest {
  email?: string;
}

/**
 * POST /api/stripe/create-session
 *
 * Cria uma sessão de checkout do Stripe para o Projeto 45 Graus
 *
 * @example
 * ```typescript
 * const response = await fetch('/api/stripe/create-session', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ email: 'customer@example.com' }),
 * });
 *
 * const { sessionId, url } = await response.json();
 * window.location.href = url; // Redirecionar para checkout
 * ```
 */
export async function POST(req: NextRequest) {
  try {
    const { email }: CreateSessionRequest = await req.json();

    console.log('[Stripe Create Session] Iniciando criação de sessão:', { email });

    // Validar variáveis de ambiente
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY não configurada');
    }

    if (!process.env.STRIPE_PRICE_ID) {
      throw new Error('STRIPE_PRICE_ID não configurada');
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    // Obter lote atual para metadata
    const currentBatch = getCurrentBatch();

    // Criar cliente Stripe
    const stripeClient = StripeClient.create({
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    });

    // Criar sessão de checkout
    const builder = CheckoutBuilder.create(stripeClient)
      .withPrice(process.env.STRIPE_PRICE_ID)
      .withQuantity(1)
      .withSuccessUrl(`${baseUrl}/projeto45dias/obrigado?session_id={CHECKOUT_SESSION_ID}`)
      .withCancelUrl(`${baseUrl}/projeto45dias/erro`)
      .withPaymentMethods(['card']) // Apenas Cartão (PIX será habilitado depois)
      .withMetadata({
        product: 'projeto_45_graus',
        lote: currentBatch?.name || 'unknown',
        preco_original: String(currentBatch?.originalPrice || 0),
        preco_promocional: String(currentBatch?.promotionalPrice || 0),
        split_lumes: '20',
        split_seyune: '40',
        split_amauri: '40',
      });

    // Adicionar email se fornecido
    if (email) {
      builder.withCustomerEmail(email);
    }

    const checkout = await builder.build();

    console.log('[Stripe Create Session] Sessão criada:', {
      sessionId: checkout.sessionId,
      expiresAt: new Date(checkout.expiresAt * 1000).toISOString(),
    });

    return NextResponse.json({
      success: true,
      sessionId: checkout.sessionId,
      url: checkout.url,
      expiresAt: checkout.expiresAt,
    });
  } catch (error) {
    console.error('[Stripe Create Session] Erro:', error);

    const errorMessage = error instanceof Error ? error.message : 'Erro ao criar sessão de checkout';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
