import Stripe from 'stripe';
import { validateStripeConfig, type StripeConfig } from './config';
import { StripeConfigError } from './errors';

/**
 * Cliente Stripe (Factory Pattern)
 *
 * @example
 * ```typescript
 * const stripeClient = StripeClient.create({
 *   secretKey: process.env.STRIPE_SECRET_KEY!,
 *   webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
 * });
 * ```
 */
export class StripeClient {
  private stripe: Stripe;
  private config: Readonly<StripeConfig>;

  private constructor(config: StripeConfig) {
    this.config = Object.freeze(config);
    this.stripe = new Stripe(config.secretKey, {
      apiVersion: config.apiVersion as Stripe.LatestApiVersion,
      typescript: true,
    });
  }

  /**
   * Cria uma nova instância do cliente Stripe
   *
   * @param config - Configuração do Stripe
   * @returns Instância configurada do StripeClient
   * @throws {StripeConfigError} Se configuração for inválida
   */
  static create(config: Partial<StripeConfig>): StripeClient {
    try {
      const validatedConfig = validateStripeConfig(config);
      return new StripeClient(validatedConfig);
    } catch (error) {
      throw new StripeConfigError(
        'Falha ao validar configuração do Stripe',
        error
      );
    }
  }

  /**
   * Retorna a instância do Stripe SDK
   */
  getStripe(): Stripe {
    return this.stripe;
  }

  /**
   * Retorna a configuração (readonly)
   */
  getConfig(): Readonly<StripeConfig> {
    return this.config;
  }
}
