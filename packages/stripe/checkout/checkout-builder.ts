import Stripe from 'stripe';
import { StripeClient } from '../client';
import { StripeCheckoutError } from '../errors';
import type { CheckoutSessionParams, CheckoutSessionResult } from '../types';

/**
 * Builder para criar sessões de checkout do Stripe
 *
 * @example
 * ```typescript
 * const checkout = await CheckoutBuilder.create(stripeClient)
 *   .withPrice('price_123')
 *   .withCustomerEmail('customer@example.com')
 *   .withSuccessUrl('https://example.com/success')
 *   .withCancelUrl('https://example.com/cancel')
 *   .withMetadata({ orderId: '123' })
 *   .build();
 * ```
 */
export class CheckoutBuilder {
  private params: Partial<CheckoutSessionParams> = {
    quantity: 1,
    allowPromotionCodes: false,
    paymentMethodTypes: ['card'],
  };

  private constructor(private client: StripeClient) {}

  /**
   * Cria um novo builder de checkout
   */
  static create(client: StripeClient): CheckoutBuilder {
    return new CheckoutBuilder(client);
  }

  /**
   * Define o ID do preço
   */
  withPrice(priceId: string): this {
    this.params.priceId = priceId;
    return this;
  }

  /**
   * Define a quantidade
   */
  withQuantity(quantity: number): this {
    this.params.quantity = quantity;
    return this;
  }

  /**
   * Define o email do cliente
   */
  withCustomerEmail(email: string): this {
    this.params.customerEmail = email;
    return this;
  }

  /**
   * Define a URL de sucesso
   */
  withSuccessUrl(url: string): this {
    this.params.successUrl = url;
    return this;
  }

  /**
   * Define a URL de cancelamento
   */
  withCancelUrl(url: string): this {
    this.params.cancelUrl = url;
    return this;
  }

  /**
   * Define metadata customizada
   */
  withMetadata(metadata: Record<string, string>): this {
    this.params.metadata = metadata;
    return this;
  }

  /**
   * Permite códigos promocionais
   */
  withPromotionCodes(allow: boolean = true): this {
    this.params.allowPromotionCodes = allow;
    return this;
  }

  /**
   * Define métodos de pagamento aceitos
   */
  withPaymentMethods(
    methods: Stripe.Checkout.SessionCreateParams.PaymentMethodType[]
  ): this {
    this.params.paymentMethodTypes = methods;
    return this;
  }

  /**
   * Cria a sessão de checkout no Stripe
   *
   * @returns Promise com dados da sessão criada
   * @throws {StripeCheckoutError} Se falhar ao criar checkout
   */
  async build(): Promise<CheckoutSessionResult> {
    // Validar parâmetros obrigatórios
    if (!this.params.priceId) {
      throw new StripeCheckoutError('Price ID é obrigatório');
    }
    if (!this.params.successUrl) {
      throw new StripeCheckoutError('Success URL é obrigatória');
    }
    if (!this.params.cancelUrl) {
      throw new StripeCheckoutError('Cancel URL é obrigatória');
    }

    try {
      const stripe = this.client.getStripe();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: this.params.paymentMethodTypes,
        line_items: [
          {
            price: this.params.priceId,
            quantity: this.params.quantity || 1,
          },
        ],
        mode: 'payment',
        customer_email: this.params.customerEmail,
        success_url: this.params.successUrl,
        cancel_url: this.params.cancelUrl,
        metadata: this.params.metadata,
        allow_promotion_codes: this.params.allowPromotionCodes,
        billing_address_collection: 'required', // Forçar coleta de endereço e email
        phone_number_collection: {
          enabled: true, // Coletar telefone também
        },
      });

      return {
        sessionId: session.id,
        url: session.url!,
        expiresAt: session.expires_at,
      };
    } catch (error) {
      throw new StripeCheckoutError(
        'Falha ao criar sessão de checkout',
        error
      );
    }
  }
}
