import MercadoPago, { Preference } from 'mercadopago';
import type { MercadoPagoConfig } from '../config';
import type { CheckoutPreference, CheckoutItem, BackUrls } from '../types';
import { MercadoPagoCheckoutError } from '../errors';

/**
 * Builder para criar checkouts do Mercado Pago de forma fluente
 *
 * @example
 * ```typescript
 * const checkout = new CheckoutBuilder(config)
 *   .withAmount(347)
 *   .withDescription('Projeto 45 Graus - Lote 1')
 *   .withMetadata({ lote_id: 1 })
 *   .withSuccessUrl('/obrigado')
 *   .build();
 * ```
 */
export class CheckoutBuilder {
  private items: CheckoutItem[] = [];
  private metadata: Record<string, any> = {};
  private payer: { email?: string } = {};
  private backUrls: Partial<BackUrls> = {};
  private autoReturn: 'approved' | 'all' | undefined = 'approved';
  private statementDescriptor?: string;
  private externalReference?: string;

  constructor(private readonly config: MercadoPagoConfig) {}

  /**
   * Define o valor e descrição do pagamento (cria um item automaticamente)
   *
   * @param amount - Valor em reais (ex: 347.00)
   * @param description - Descrição do produto/serviço
   */
  withAmount(amount: number, description: string = 'Produto'): this {
    if (amount <= 0) {
      throw new MercadoPagoCheckoutError('Amount deve ser maior que 0');
    }

    this.items = [
      {
        title: description,
        unit_price: amount,
        quantity: 1,
      },
    ];

    return this;
  }

  /**
   * Define os itens do checkout manualmente (uso avançado)
   *
   * @param items - Array de itens
   */
  withItems(items: CheckoutItem[]): this {
    if (items.length === 0) {
      throw new MercadoPagoCheckoutError('Items não pode ser vazio');
    }

    this.items = items;
    return this;
  }

  /**
   * Adiciona metadata customizado ao pagamento
   * Útil para rastrear informações como lote, splits, etc.
   *
   * @param metadata - Objeto com dados customizados
   */
  withMetadata(metadata: Record<string, any>): this {
    this.metadata = { ...this.metadata, ...metadata };
    return this;
  }

  /**
   * Define dados do pagador (opcional)
   *
   * @param payer - Dados do pagador (email, nome, etc)
   */
  withPayer(payer: { email?: string }): this {
    this.payer = payer;
    return this;
  }

  /**
   * Define URL de retorno para pagamento aprovado
   *
   * @param url - URL completa ou relativa
   */
  withSuccessUrl(url: string): this {
    this.backUrls.success = url;
    return this;
  }

  /**
   * Define URL de retorno para pagamento rejeitado/cancelado
   *
   * @param url - URL completa ou relativa
   */
  withFailureUrl(url: string): this {
    this.backUrls.failure = url;
    return this;
  }

  /**
   * Define URL de retorno para pagamento pendente
   *
   * @param url - URL completa ou relativa
   */
  withPendingUrl(url: string): this {
    this.backUrls.pending = url;
    return this;
  }

  /**
   * Define descrição que aparece na fatura do cartão
   *
   * @param descriptor - Descrição (máx 10 caracteres)
   */
  withStatementDescriptor(descriptor: string): this {
    this.statementDescriptor = descriptor;
    return this;
  }

  /**
   * Define referência externa para rastreamento
   *
   * @param reference - ID externo (seu sistema)
   */
  withExternalReference(reference: string): this {
    this.externalReference = reference;
    return this;
  }

  /**
   * Constrói e cria a preferência de checkout no Mercado Pago
   *
   * @returns Promise com URL do checkout e ID da preferência
   * @throws {MercadoPagoCheckoutError} Se falhar ao criar checkout
   */
  async build(): Promise<CheckoutPreference> {
    // Validações
    if (this.items.length === 0) {
      throw new MercadoPagoCheckoutError(
        'Items é obrigatório. Use withAmount() ou withItems()'
      );
    }

    try {
      // Log de debug
      console.log('[MercadoPago Checkout] Config:', {
        sandbox: this.config.sandbox,
        accessTokenPrefix: this.config.accessToken.substring(0, 8),
      });

      // Inicializar SDK
      const client = new MercadoPago({
        accessToken: this.config.accessToken,
        options: {
          timeout: 30000,
          ...(this.config.sandbox && { platform: 'test' }),
        },
      });

      // Criar preferência
      const preferenceClient = new Preference(client);

      const requestBody = {
        body: {
          items: this.items.map(item => ({
            title: item.title,
            unit_price: item.unit_price,
            quantity: item.quantity,
            description: item.description,
            id: item.id || 'default',
          })),
          metadata: this.metadata,
          payer: Object.keys(this.payer).length > 0 ? this.payer : undefined,
          back_urls: {
            success: this.backUrls.success,
            failure: this.backUrls.failure,
            pending: this.backUrls.pending,
          },
          auto_return: this.autoReturn,
          statement_descriptor: this.statementDescriptor,
          external_reference: this.externalReference,
          binary_mode: false, // Aceita todos os estados de pagamento (não força aprovação/rejeição)
          // IMPORTANTE: NÃO incluir 'purpose' para permitir guest checkout
          // purpose: 'wallet_purchase' força login obrigatório
          payment_methods: {
            excluded_payment_methods: [],
            excluded_payment_types: [],
            installments: 12, // Permitir até 12x parcelamento
          },
        },
      };

      console.log('[MercadoPago Checkout] Request:', JSON.stringify(requestBody, null, 2));

      const preference = await preferenceClient.create(requestBody);

      console.log('[MercadoPago Checkout] Response:', {
        init_point: preference.init_point,
        sandbox_init_point: preference.sandbox_init_point,
        id: preference.id,
      });

      if (!preference.init_point || !preference.id) {
        throw new MercadoPagoCheckoutError(
          'Resposta inválida do Mercado Pago (sem init_point ou id)'
        );
      }

      return {
        init_point: preference.init_point,
        id: preference.id.toString(),
        sandbox_init_point: preference.sandbox_init_point,
      };
    } catch (error) {
      if (error instanceof MercadoPagoCheckoutError) {
        throw error;
      }

      throw new MercadoPagoCheckoutError(
        'Falha ao criar checkout no Mercado Pago',
        error
      );
    }
  }
}
