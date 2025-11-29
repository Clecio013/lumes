/**
 * Tokenizador de Cartões - Mercado Pago Core Methods
 *
 * Cria token seguro de cartão a partir dos card fields (iframes).
 * Token é enviado ao backend, dados do cartão nunca passam pelo servidor.
 */

import type { CardTokenData, CardToken, CardTokenError, MercadoPagoSDK } from './types';

export class CardTokenizer {
  private sdk: MercadoPagoSDK;

  constructor(sdk: MercadoPagoSDK) {
    if (!sdk) {
      throw new Error('[CardTokenizer] SDK do Mercado Pago é obrigatório');
    }
    this.sdk = sdk;
  }

  /**
   * Cria token de cartão a partir dos dados do formulário
   *
   * @param data Dados do titular (nome, CPF)
   * @returns Token de cartão (id + metadados)
   * @throws CardTokenError se dados inválidos
   */
  async createToken(data: CardTokenData): Promise<CardToken> {
    try {
      console.log('[CardTokenizer] Criando token de cartão...');

      // Validar dados antes de enviar
      this.validateTokenData(data);

      // Criar token via SDK (fields já montados no DOM)
      const token = await this.sdk.fields.createCardToken({
        cardholderName: data.cardholderName.trim(),
        identificationType: data.identificationType,
        identificationNumber: data.identificationNumber.replace(/\D/g, ''), // Remove máscaras
      });

      if (!token || !token.id) {
        throw new Error('Token não foi gerado (resposta vazia do SDK)');
      }

      console.log('[CardTokenizer] ✅ Token criado:', {
        id: token.id,
        payment_method_id: token.payment_method_id,
        first_six: token.first_six_digits,
        last_four: token.last_four_digits,
      });

      return token;
    } catch (error: any) {
      console.error('[CardTokenizer] Erro ao criar token:', error);

      // Extrair mensagem de erro amigável
      const errorMessage = this.extractErrorMessage(error);

      throw {
        code: error.code || 'TOKEN_CREATION_FAILED',
        message: errorMessage,
        cause: error.cause,
      } as CardTokenError;
    }
  }

  /**
   * Valida dados antes de criar token
   */
  private validateTokenData(data: CardTokenData): void {
    // Nome do titular
    if (!data.cardholderName || data.cardholderName.trim().length < 3) {
      throw {
        code: 'INVALID_CARDHOLDER_NAME',
        message: 'Nome do titular inválido (mínimo 3 caracteres)',
      } as CardTokenError;
    }

    // Tipo de identificação
    if (!['CPF', 'CNPJ'].includes(data.identificationType)) {
      throw {
        code: 'INVALID_IDENTIFICATION_TYPE',
        message: 'Tipo de identificação deve ser CPF ou CNPJ',
      } as CardTokenError;
    }

    // Número de identificação
    const cleanedNumber = data.identificationNumber.replace(/\D/g, '');

    if (data.identificationType === 'CPF' && cleanedNumber.length !== 11) {
      throw {
        code: 'INVALID_CPF',
        message: 'CPF deve ter 11 dígitos',
      } as CardTokenError;
    }

    if (data.identificationType === 'CNPJ' && cleanedNumber.length !== 14) {
      throw {
        code: 'INVALID_CNPJ',
        message: 'CNPJ deve ter 14 dígitos',
      } as CardTokenError;
    }
  }

  /**
   * Extrai mensagem de erro amigável do SDK
   */
  private extractErrorMessage(error: any): string {
    // Erros comuns do MP SDK
    const errorMessages: Record<string, string> = {
      '205': 'Número do cartão inválido',
      '208': 'Mês de validade inválido',
      '209': 'Ano de validade inválido',
      '212': 'Tipo de documento inválido',
      '213': 'Número de documento inválido',
      '214': 'Código de segurança (CVV) inválido',
      '220': 'Banco emissor não disponível',
      '221': 'Digite o código de segurança (CVV)',
      '224': 'Código de segurança (CVV) inválido',
      'E301': 'Número do cartão inválido',
      'E302': 'Código de segurança (CVV) inválido',
      '316': 'Nome do titular inválido',
      '322': 'Tipo de documento inválido',
      '323': 'Número de documento (CPF/CNPJ) inválido',
      '324': 'Número de documento (CPF/CNPJ) inválido',
      '325': 'Data de validade inválida',
      '326': 'Data de validade inválida',
    };

    // Tentar extrair código do erro
    const code = error.code || error.cause?.[0]?.code;

    if (code && errorMessages[code]) {
      return errorMessages[code];
    }

    // Mensagem do erro original ou genérica
    return error.message || 'Erro ao processar dados do cartão. Verifique as informações e tente novamente.';
  }
}

/**
 * Helper para criar tokenizer a partir de um SDK
 */
export function createCardTokenizer(sdk: MercadoPagoSDK): CardTokenizer {
  return new CardTokenizer(sdk);
}
