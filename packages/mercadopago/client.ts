import type { MercadoPagoConfig } from './config';
import { MercadoPagoConfigSchema } from './config';
import { CheckoutBuilder } from './checkout/checkout-builder';
import { WebhookHandler } from './webhook/webhook-handler';
import { MercadoPagoConfigError } from './errors';

/**
 * Cliente principal do Mercado Pago
 *
 * Factory Pattern: Ponto de entrada único para todas as funcionalidades
 *
 * @example
 * ```typescript
 * const mpClient = MercadoPagoClient.create({
 *   accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
 *   sandbox: true
 * });
 *
 * // Criar checkout
 * const checkout = await mpClient.checkout()
 *   .withAmount(347)
 *   .withDescription('Projeto 45 Graus')
 *   .build();
 *
 * // Processar webhook
 * await mpClient.webhook().handle(body, {
 *   onApproved: async (payment) => { ... }
 * });
 * ```
 */
export class MercadoPagoClient {
  private constructor(private readonly config: MercadoPagoConfig) {}

  /**
   * Cria uma nova instância do cliente Mercado Pago
   *
   * @param config - Configuração do cliente
   * @returns Instância configurada do cliente
   * @throws {MercadoPagoConfigError} Se configuração for inválida
   *
   * @example
   * ```typescript
   * const client = MercadoPagoClient.create({
   *   accessToken: process.env.MP_TOKEN!,
   *   sandbox: process.env.NODE_ENV !== 'production'
   * });
   * ```
   */
  static create(config: MercadoPagoConfig): MercadoPagoClient {
    try {
      const validated = MercadoPagoConfigSchema.parse(config);
      return new MercadoPagoClient(validated);
    } catch (error) {
      throw new MercadoPagoConfigError(
        'Configuração inválida do Mercado Pago',
        error
      );
    }
  }

  /**
   * Cria um novo builder de checkout
   *
   * @returns Builder para configurar checkout de forma fluente
   *
   * @example
   * ```typescript
   * const checkout = await client.checkout()
   *   .withAmount(347)
   *   .withDescription('Produto X')
   *   .withMetadata({ lote: 1 })
   *   .withSuccessUrl('/obrigado')
   *   .build();
   * ```
   */
  checkout(): CheckoutBuilder {
    return new CheckoutBuilder(this.config);
  }

  /**
   * Cria um novo handler de webhook
   *
   * @returns Handler para processar notificações
   *
   * @example
   * ```typescript
   * await client.webhook().handle(req.body, {
   *   onApproved: async (payment) => {
   *     console.log('Pagamento aprovado:', payment.id);
   *   }
   * });
   * ```
   */
  webhook(): WebhookHandler {
    return new WebhookHandler(this.config);
  }

  /**
   * Retorna configuração imutável do cliente
   *
   * @returns Cópia congelada da configuração
   */
  getConfig(): Readonly<MercadoPagoConfig> {
    return Object.freeze({ ...this.config });
  }
}
