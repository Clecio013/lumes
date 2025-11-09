import Stripe from 'stripe';

/**
 * Parâmetros para criar uma sessão de checkout
 */
export interface CheckoutSessionParams {
  priceId: string;
  quantity?: number;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
  allowPromotionCodes?: boolean;
  paymentMethodTypes?: Stripe.Checkout.SessionCreateParams.PaymentMethodType[];
}

/**
 * Resultado da criação de uma sessão de checkout
 */
export interface CheckoutSessionResult {
  sessionId: string;
  url: string;
  expiresAt: number;
}

/**
 * Dados do evento de webhook
 */
export interface WebhookEvent<T = unknown> {
  id: string;
  type: string;
  data: T;
  created: number;
}

/**
 * Handler de webhook
 */
export type WebhookHandler<T = unknown> = (event: WebhookEvent<T>) => Promise<void> | void;

/**
 * Mapa de handlers de webhook por tipo de evento
 */
export type WebhookHandlers = {
  [eventType: string]: WebhookHandler;
};
