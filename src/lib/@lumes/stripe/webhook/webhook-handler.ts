import Stripe from 'stripe';
import { StripeClient } from '../client';
import { StripeWebhookError } from '../errors';
import type { WebhookHandlers } from '../types';

/**
 * Handler de webhooks do Stripe (Strategy Pattern)
 *
 * @example
 * ```typescript
 * const handler = WebhookHandler.create(stripeClient, {
 *   'checkout.session.completed': async (event) => {
 *     console.log('Checkout completo:', event.data);
 *   },
 *   'payment_intent.succeeded': async (event) => {
 *     console.log('Pagamento aprovado:', event.data);
 *   },
 * });
 *
 * await handler.handle(requestBody, signature);
 * ```
 */
export class WebhookHandler {
  private constructor(
    private client: StripeClient,
    private handlers: WebhookHandlers
  ) {}

  /**
   * Cria um novo handler de webhooks
   *
   * @param client - Cliente Stripe configurado
   * @param handlers - Mapa de handlers por tipo de evento
   */
  static create(client: StripeClient, handlers: WebhookHandlers): WebhookHandler {
    return new WebhookHandler(client, handlers);
  }

  /**
   * Processa um webhook do Stripe
   *
   * @param body - Body da requisição (string ou Buffer)
   * @param signature - Assinatura do webhook (header stripe-signature)
   * @returns Promise que resolve quando o evento for processado
   * @throws {StripeWebhookError} Se assinatura for inválida ou handler falhar
   */
  async handle(body: string | Buffer, signature: string): Promise<void> {
    const config = this.client.getConfig();

    if (!config.webhookSecret) {
      throw new StripeWebhookError(
        'Webhook secret não configurado. Configure STRIPE_WEBHOOK_SECRET.'
      );
    }

    let event: Stripe.Event;

    try {
      const stripe = this.client.getStripe();
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        config.webhookSecret
      );
    } catch (error) {
      throw new StripeWebhookError(
        'Falha ao validar assinatura do webhook',
        error
      );
    }

    // Buscar handler para o tipo de evento
    const handler = this.handlers[event.type];

    if (!handler) {
      // Evento não tratado - apenas log (não é erro)
      console.log(`[Stripe Webhook] Evento não tratado: ${event.type}`);
      return;
    }

    try {
      await handler({
        id: event.id,
        type: event.type,
        data: event.data.object,
        created: event.created,
      });
    } catch (error) {
      throw new StripeWebhookError(
        `Falha ao processar evento ${event.type}`,
        error
      );
    }
  }
}
