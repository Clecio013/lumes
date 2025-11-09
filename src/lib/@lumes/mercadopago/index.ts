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

// Bricks (Checkout Transparente)
export { PaymentBrickBuilder, createProjeto45DiasCheckout } from './brick/brick-builder';
export { PaymentBrickController, createPaymentBrickController } from './brick/brick-controller';
export type {
  PaymentBrickFormData,
  PaymentBrickSettings,
  PaymentBrickInitialization,
  PaymentBrickCustomization,
  PaymentBrickCallbacks,
  BrickController,
  BrickError,
} from './brick/types';

// Core Methods (Checkout Transparente Customizado)
export { CardFieldsManager, createCardFieldsManager } from './core-methods/card-fields';
export { CardTokenizer, createCardTokenizer } from './core-methods/card-tokenizer';
export { PixPaymentGenerator, createPixPaymentGenerator } from './core-methods/pix-payment';
export { InstallmentsManager, createInstallmentsManager } from './core-methods/installments';
export type {
  CardFieldType,
  CardFieldOptions,
  CardField,
  CardTokenData,
  CardToken,
  CardTokenError,
  InstallmentOption,
  InstallmentsResponse,
  PayerData,
  CardPaymentData,
  PixPaymentData,
  PaymentData,
  PixQRCodeData,
  PixPaymentResponse,
  MPFields,
  MercadoPagoSDK,
} from './core-methods/types';
export type { PixPaymentOptions } from './core-methods/pix-payment';
