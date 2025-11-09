/**
 * Erro customizado para operações do Stripe
 */
export class StripeError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'StripeError';
  }
}

/**
 * Erro de configuração inválida
 */
export class StripeConfigError extends StripeError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'CONFIG_ERROR', originalError);
    this.name = 'StripeConfigError';
  }
}

/**
 * Erro de webhook inválido
 */
export class StripeWebhookError extends StripeError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'WEBHOOK_ERROR', originalError);
    this.name = 'StripeWebhookError';
  }
}

/**
 * Erro ao criar checkout
 */
export class StripeCheckoutError extends StripeError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'CHECKOUT_ERROR', originalError);
    this.name = 'StripeCheckoutError';
  }
}
