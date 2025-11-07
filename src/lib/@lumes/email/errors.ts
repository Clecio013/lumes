/**
 * Erro customizado para operações de email
 */
export class EmailError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'EmailError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EmailError);
    }
  }

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
export class EmailConfigError extends EmailError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'CONFIG_ERROR', originalError);
    this.name = 'EmailConfigError';
  }
}

/**
 * Erro ao enviar email
 */
export class EmailSendError extends EmailError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'SEND_ERROR', originalError);
    this.name = 'EmailSendError';
  }
}

/**
 * Erro de provider não suportado
 */
export class EmailProviderError extends EmailError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'PROVIDER_ERROR', originalError);
    this.name = 'EmailProviderError';
  }
}
