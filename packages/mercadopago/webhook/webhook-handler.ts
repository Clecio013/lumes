import MercadoPago, { Payment as MPPayment } from 'mercadopago';
import crypto from 'crypto';
import type { MercadoPagoConfig } from '../config';
import type { Payment, PaymentStatus, WebhookBody } from '../types';
import { MercadoPagoWebhookError } from '../errors';

/**
 * Handlers estratégicos para diferentes status de pagamento
 */
export interface PaymentHandlers {
  /** Executado quando pagamento é aprovado */
  onApproved?: (payment: Payment) => Promise<void>;

  /** Executado quando pagamento está pendente */
  onPending?: (payment: Payment) => Promise<void>;

  /** Executado quando pagamento é rejeitado */
  onRejected?: (payment: Payment) => Promise<void>;

  /** Executado quando pagamento é cancelado */
  onCancelled?: (payment: Payment) => Promise<void>;

  /** Executado quando pagamento é reembolsado */
  onRefunded?: (payment: Payment) => Promise<void>;
}

/**
 * Handler para processar webhooks do Mercado Pago
 *
 * Implementa Strategy Pattern para lidar com diferentes status de pagamento
 *
 * @example
 * ```typescript
 * const handler = new WebhookHandler(config);
 *
 * await handler.handle(webhookBody, {
 *   onApproved: async (payment) => {
 *     console.log('Pagamento aprovado:', payment.id);
 *     // Lógica de negócio aqui
 *   }
 * });
 * ```
 */
export class WebhookHandler {
  constructor(private readonly config: MercadoPagoConfig) {}

  /**
   * Processa notificação do webhook do Mercado Pago
   *
   * @param body - Corpo da requisição do webhook
   * @param handlers - Handlers estratégicos para cada status
   * @param headers - Headers da requisição (para validação de assinatura)
   * @throws {MercadoPagoWebhookError} Se falhar ao processar webhook
   */
  async handle(
    body: unknown,
    handlers: PaymentHandlers,
    headers?: Record<string, string>
  ): Promise<void> {
    try {
      // Validar assinatura do webhook (se secret estiver configurado)
      // Apenas em produção, para facilitar testes locais
      if (headers && process.env.NODE_ENV === 'production') {
        this.validateSignature(body, headers);
      }

      // Parse e valida body do webhook
      const webhookData = this.parseWebhookBody(body);

      // Ignorar notificações que não são de pagamento
      if (webhookData.type !== 'payment') {
        console.log(`[MercadoPago Webhook] Ignorando tipo: ${webhookData.type}`);
        return;
      }

      // Buscar dados completos do pagamento via API
      const payment = await this.fetchPayment(webhookData.data.id);

      // Executar handler apropriado baseado no status
      await this.executeHandler(payment, handlers);
    } catch (error) {
      if (error instanceof MercadoPagoWebhookError) {
        throw error;
      }

      throw new MercadoPagoWebhookError(
        'Falha ao processar webhook do Mercado Pago',
        error
      );
    }
  }

  /**
   * Valida assinatura do webhook usando HMAC-SHA256
   */
  private validateSignature(body: unknown, headers: Record<string, string>): void {
    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;

    // Se não tem secret configurado, pular validação (apenas log warning)
    if (!secret) {
      console.warn('[MercadoPago Webhook] WEBHOOK_SECRET não configurado - pulando validação');
      return;
    }

    // Headers do Mercado Pago para validação
    const xSignature = headers['x-signature'];
    const xRequestId = headers['x-request-id'];

    if (!xSignature || !xRequestId) {
      throw new MercadoPagoWebhookError('Headers de validação ausentes (x-signature ou x-request-id)');
    }

    // Mercado Pago envia: ts=timestamp,v1=hash
    const parts = xSignature.split(',');
    const tsMatch = parts.find((p) => p.startsWith('ts='));
    const v1Match = parts.find((p) => p.startsWith('v1='));

    if (!tsMatch || !v1Match) {
      throw new MercadoPagoWebhookError('Formato de x-signature inválido');
    }

    const timestamp = tsMatch.split('=')[1];
    const receivedHash = v1Match.split('=')[1];

    // Construir string para validação: id + request-id + timestamp
    const webhookData = body as any;
    const dataId = webhookData?.data?.id || '';
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${timestamp};`;

    // Calcular HMAC
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(manifest);
    const calculatedHash = hmac.digest('hex');

    // Comparar hashes
    if (calculatedHash !== receivedHash) {
      throw new MercadoPagoWebhookError('Assinatura do webhook inválida - possível tentativa de fraude');
    }

    console.log('[MercadoPago Webhook] Assinatura validada com sucesso ✓');
  }

  /**
   * Parse e valida corpo do webhook
   */
  private parseWebhookBody(body: unknown): WebhookBody {
    if (!body || typeof body !== 'object') {
      throw new MercadoPagoWebhookError('Body do webhook inválido');
    }

    const data = body as Record<string, any>;

    if (!data.type || !data.data?.id) {
      throw new MercadoPagoWebhookError('Webhook sem type ou data.id');
    }

    return {
      type: data.type,
      date_created: data.date_created,
      data: {
        id: data.data.id.toString(),
      },
      action: data.action,
      user_id: data.user_id,
    };
  }

  /**
   * Busca dados completos do pagamento via API do Mercado Pago
   */
  private async fetchPayment(paymentId: string): Promise<Payment> {
    try {
      const client = new MercadoPago({
        accessToken: this.config.accessToken,
        options: {
          timeout: 30000,
        },
      });

      const paymentClient = new MPPayment(client);

      const response = await paymentClient.get({
        id: paymentId,
      });

      // Mapear para nossa interface interna
      return this.mapPayment(response);
    } catch (error) {
      throw new MercadoPagoWebhookError(
        `Falha ao buscar pagamento ${paymentId}`,
        error
      );
    }
  }

  /**
   * Mapeia resposta do Mercado Pago para nossa interface
   */
  private mapPayment(mpPayment: any): Payment {
    return {
      id: mpPayment.id?.toString() || '',
      status: mpPayment.status as PaymentStatus,
      transaction_amount: mpPayment.transaction_amount || 0,
      payer: {
        name: mpPayment.payer?.first_name + ' ' + mpPayment.payer?.last_name || '',
        email: mpPayment.payer?.email || '',
        identification: {
          type: mpPayment.payer?.identification?.type || '',
          number: mpPayment.payer?.identification?.number || '',
        },
        phone: {
          number: mpPayment.payer?.phone?.number || '',
        },
      },
      metadata: mpPayment.metadata || {},
      date_created: mpPayment.date_created,
      date_approved: mpPayment.date_approved,
      payment_method_id: mpPayment.payment_method_id,
      payment_type_id: mpPayment.payment_type_id,
    };
  }

  /**
   * Executa handler apropriado baseado no status do pagamento
   */
  private async executeHandler(
    payment: Payment,
    handlers: PaymentHandlers
  ): Promise<void> {
    console.log(
      `[MercadoPago Webhook] Pagamento ${payment.id} com status: ${payment.status}`
    );

    switch (payment.status) {
      case 'approved':
        if (handlers.onApproved) {
          await handlers.onApproved(payment);
        }
        break;

      case 'pending':
        if (handlers.onPending) {
          await handlers.onPending(payment);
        }
        break;

      case 'rejected':
        if (handlers.onRejected) {
          await handlers.onRejected(payment);
        }
        break;

      case 'cancelled':
        if (handlers.onCancelled) {
          await handlers.onCancelled(payment);
        }
        break;

      case 'refunded':
        if (handlers.onRefunded) {
          await handlers.onRefunded(payment);
        }
        break;

      default:
        console.warn(
          `[MercadoPago Webhook] Status desconhecido: ${payment.status}`
        );
    }
  }
}
