/**
 * @lumes/mercadopago
 *
 * Biblioteca para integração com Mercado Pago
 * Abstrai criação de checkouts e processamento de webhooks
 *
 * @example
 * ```typescript
 * import { MercadoPagoClient } from '@/lib/@lumes/mercadopago';
 *
 * const client = MercadoPagoClient.create({
 *   accessToken: process.env.MP_TOKEN!,
 *   sandbox: true
 * });
 *
 * // Criar checkout
 * const checkout = await client.checkout()
 *   .withAmount(347)
 *   .withDescription('Projeto 45 Graus')
 *   .build();
 *
 * // Processar webhook
 * await client.webhook().handle(body, {
 *   onApproved: async (payment) => { ... }
 * });
 * ```
 */

// Client (Factory)
export { MercadoPagoClient } from './client';

// Config
export type { MercadoPagoConfig } from './config';

// Types
export type {
  Payment,
  PaymentStatus,
  Payer,
  CheckoutPreference,
  CheckoutItem,
  BackUrls,
  WebhookBody,
} from './types';

// Webhook handlers
export type { PaymentHandlers } from './webhook/webhook-handler';

// Errors (para tratamento customizado se necessário)
export {
  MercadoPagoError,
  MercadoPagoConfigError,
  MercadoPagoCheckoutError,
  MercadoPagoWebhookError,
} from './errors';
