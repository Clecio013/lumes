import { NextRequest, NextResponse } from 'next/server';
import { StripeClient, CheckoutBuilder } from '@lumes/stripe';
import { getCurrentBatch } from '@/app/projeto45dias/lib/batches-config';
import { isCampaignEnded, getCurrentPrice, isBlackFriday } from '@/app/projeto45dias/lib/campaign-config';

/**
 * Interface for session creation request
 */
interface CreateSessionRequest {
  email?: string;
}

/**
 * POST /api/stripe/create-session
 *
 * Creates a Stripe checkout session for Projeto 45 Graus
 * Dynamically selects price based on campaign status (Black Friday vs Evergreen)
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
 * window.location.href = url; // Redirect to checkout
 * ```
 */
export async function POST(req: NextRequest) {
  try {
    const { email }: CreateSessionRequest = await req.json();

    console.log('[Stripe Create Session] Starting session creation:', { email });

    // Validate environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    // Select price ID based on campaign status
    const isPromo = isBlackFriday();
    const priceId = isPromo
      ? (process.env.STRIPE_PRICE_ID_PROMO || process.env.STRIPE_PRICE_ID)
      : process.env.STRIPE_PRICE_ID_REGULAR;

    if (!priceId) {
      throw new Error(
        isPromo
          ? 'STRIPE_PRICE_ID_PROMO or STRIPE_PRICE_ID not configured'
          : 'STRIPE_PRICE_ID_REGULAR not configured'
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    // Get current batch for metadata
    const currentBatch = getCurrentBatch();
    const currentPrice = getCurrentPrice();

    // Create Stripe client
    const stripeClient = StripeClient.create({
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    });

    // Create checkout session
    const builder = CheckoutBuilder.create(stripeClient)
      .withPrice(priceId)
      .withQuantity(1)
      .withSuccessUrl(`${baseUrl}/projeto45dias/obrigado?session_id={CHECKOUT_SESSION_ID}`)
      .withCancelUrl(`${baseUrl}/projeto45dias/erro`)
      .withPaymentMethods(['card']) // Card only (PIX will be enabled later)
      .withMetadata({
        product: 'projeto_45_graus',
        lote: currentBatch?.name || (isPromo ? 'black_friday' : 'evergreen'),
        preco_original: String(currentBatch?.originalPrice || 697),
        preco_promocional: String(currentPrice),
        is_promo: String(isPromo),
        split_lumes: '20',
        split_seyune: '40',
        split_amauri: '40',
      });

    // Add email if provided
    if (email) {
      builder.withCustomerEmail(email);
    }

    const checkout = await builder.build();

    console.log('[Stripe Create Session] Session created:', {
      sessionId: checkout.sessionId,
      priceId,
      isPromo,
      currentPrice,
      expiresAt: new Date(checkout.expiresAt * 1000).toISOString(),
    });

    return NextResponse.json({
      success: true,
      sessionId: checkout.sessionId,
      url: checkout.url,
      expiresAt: checkout.expiresAt,
    });
  } catch (error) {
    console.error('[Stripe Create Session] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Error creating checkout session';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
