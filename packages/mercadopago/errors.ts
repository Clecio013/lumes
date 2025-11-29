/**
 * Erro customizado para operações do Mercado Pago
 */
export class MercadoPagoError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'MercadoPagoError';

    // Mantém stack trace correto
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MercadoPagoError);
    }
  }

  /**
   * Converte erro para objeto JSON
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      originalError: this.originalError,
    };
  }
}

/**
 * Erro de validação de configuração
 */
export class MercadoPagoConfigError extends MercadoPagoError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'CONFIG_ERROR', originalError);
    this.name = 'MercadoPagoConfigError';
  }
}

/**
 * Erro ao criar checkout
 */
export class MercadoPagoCheckoutError extends MercadoPagoError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'CHECKOUT_ERROR', originalError);
    this.name = 'MercadoPagoCheckoutError';
  }
}

/**
 * Erro ao processar webhook
 */
export class MercadoPagoWebhookError extends MercadoPagoError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'WEBHOOK_ERROR', originalError);
    this.name = 'MercadoPagoWebhookError';
  }
}
