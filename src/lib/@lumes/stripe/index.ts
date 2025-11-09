/**
 * @lumes/stripe - Biblioteca reutilizável para integração com Stripe
 *
 * @example
 * ```typescript
 * import { StripeClient, CheckoutBuilder, WebhookHandler } from '@/lib/@lumes/stripe';
 *
 * // Criar cliente
 * const client = StripeClient.create({
 *   secretKey: process.env.STRIPE_SECRET_KEY!,
 *   webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
 * });
 *
 * // Criar checkout
 * const checkout = await CheckoutBuilder.create(client)
 *   .withPrice('price_123')
 *   .withCustomerEmail('customer@example.com')
 *   .withSuccessUrl('https://example.com/success')
 *   .withCancelUrl('https://example.com/cancel')
 *   .build();
 *
 * // Processar webhook
 * const handler = WebhookHandler.create(client, {
 *   'checkout.session.completed': async (event) => {
 *     console.log('Checkout completo!', event.data);
 *   },
 * });
 * ```
 */

// Client
export { StripeClient } from './client';

// Config
export { validateStripeConfig, StripeConfigSchema } from './config';
export type { StripeConfig } from './config';

// Errors
export {
  StripeError,
  StripeConfigError,
  StripeWebhookError,
  StripeCheckoutError,
} from './errors';

// Types
export type {
  CheckoutSessionParams,
  CheckoutSessionResult,
  WebhookEvent,
  WebhookHandler as WebhookHandlerFn,
  WebhookHandlers,
} from './types';

// Checkout
export { CheckoutBuilder } from './checkout/checkout-builder';

// Webhook
export { WebhookHandler } from './webhook/webhook-handler';
