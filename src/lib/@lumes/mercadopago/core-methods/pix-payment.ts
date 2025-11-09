/**
 * Gerador de Pagamentos PIX - Mercado Pago
 *
 * Cria pagamentos PIX via API e retorna QR Code + código copia-cola.
 */

import type { PixPaymentData, PixPaymentResponse } from './types';

export interface PixPaymentOptions {
  /**
   * Access Token do Mercado Pago (chave privada do backend)
   */
  accessToken: string;

  /**
   * Valor do pagamento em reais (ex: 347.00)
   */
  amount: number;

  /**
   * Descrição do produto/serviço
   */
  description: string;

  /**
   * Dados do pagador
   */
  payer: {
    fullName: string;
    email: string;
    cpf: string;
  };

  /**
   * URL do webhook para notificações
   */
  notificationUrl?: string;

  /**
   * Metadata adicional (opcional)
   */
  metadata?: Record<string, any>;

  /**
   * Tempo de expiração do PIX em minutos (padrão: 30)
   */
  expirationMinutes?: number;
}

export class PixPaymentGenerator {
  private accessToken: string;

  constructor(accessToken: string) {
    if (!accessToken) {
      throw new Error('[PixPaymentGenerator] Access Token é obrigatório');
    }
    this.accessToken = accessToken;
  }

  /**
   * Cria pagamento PIX via API do Mercado Pago
   *
   * @param options Opções do pagamento
   * @returns Resposta com ID e QR Code
   */
  async createPayment(options: PixPaymentOptions): Promise<PixPaymentResponse> {
    try {
      console.log('[PixPaymentGenerator] Criando pagamento PIX...');

      // Validar opções
      this.validateOptions(options);

      // Calcular data de expiração
      const expirationDate = this.calculateExpirationDate(options.expirationMinutes || 30);

      // Splitear nome
      const nameParts = options.payer.fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName;

      // Preparar payload da API
      const payload = {
        transaction_amount: options.amount,
        description: options.description,
        payment_method_id: 'pix',
        date_of_expiration: expirationDate,
        payer: {
          email: options.payer.email,
          first_name: firstName,
          last_name: lastName,
          identification: {
            type: 'CPF',
            number: options.payer.cpf.replace(/\D/g, ''),
          },
        },
        ...(options.notificationUrl && { notification_url: options.notificationUrl }),
        ...(options.metadata && { metadata: options.metadata }),
      };

      console.log('[PixPaymentGenerator] Payload:', JSON.stringify(payload, null, 2));

      // Fazer request para API do Mercado Pago
      const response = await fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API Error: ${errorData.message || 'Erro desconhecido'} (${response.status})`
        );
      }

      const data: any = await response.json();

      // Validar resposta
      if (!data.id || !data.point_of_interaction?.transaction_data) {
        throw new Error('Resposta da API inválida (QR Code não encontrado)');
      }

      console.log('[PixPaymentGenerator] ✅ PIX criado:', {
        id: data.id,
        status: data.status,
        expiresAt: data.date_of_expiration,
      });

      return {
        id: data.id,
        status: data.status,
        point_of_interaction: data.point_of_interaction,
        date_of_expiration: data.date_of_expiration,
      } as PixPaymentResponse;
    } catch (error) {
      console.error('[PixPaymentGenerator] Erro ao criar PIX:', error);
      throw error;
    }
  }

  /**
   * Valida opções antes de criar pagamento
   */
  private validateOptions(options: PixPaymentOptions): void {
    if (!options.amount || options.amount <= 0) {
      throw new Error('Valor do pagamento deve ser maior que zero');
    }

    if (!options.description || options.description.trim().length < 3) {
      throw new Error('Descrição deve ter pelo menos 3 caracteres');
    }

    if (!options.payer.fullName || options.payer.fullName.trim().length < 3) {
      throw new Error('Nome completo inválido');
    }

    if (!options.payer.email || !options.payer.email.includes('@')) {
      throw new Error('Email inválido');
    }

    const cleanCPF = options.payer.cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) {
      throw new Error('CPF inválido (deve ter 11 dígitos)');
    }
  }

  /**
   * Calcula data de expiração do PIX
   */
  private calculateExpirationDate(minutes: number): string {
    const now = new Date();
    const expiration = new Date(now.getTime() + minutes * 60000);

    // Formato ISO 8601 com timezone
    return expiration.toISOString();
  }
}

/**
 * Factory para criar PixPaymentGenerator com access token do ambiente
 */
export function createPixPaymentGenerator(accessToken?: string): PixPaymentGenerator {
  const token = accessToken || process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!token) {
    throw new Error(
      '[createPixPaymentGenerator] Access Token não encontrado. ' +
      'Defina MERCADO_PAGO_ACCESS_TOKEN no .env.local'
    );
  }

  return new PixPaymentGenerator(token);
}
