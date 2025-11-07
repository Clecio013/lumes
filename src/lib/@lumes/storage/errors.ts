/**
 * Erro customizado para operações de storage
 */
export class StorageError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'StorageError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, StorageError);
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
export class StorageConfigError extends StorageError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'CONFIG_ERROR', originalError);
    this.name = 'StorageConfigError';
  }
}

/**
 * Erro ao ler/escrever dados
 */
export class StorageOperationError extends StorageError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'OPERATION_ERROR', originalError);
    this.name = 'StorageOperationError';
  }
}

/**
 * Erro de provider não suportado
 */
export class StorageProviderError extends StorageError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'PROVIDER_ERROR', originalError);
    this.name = 'StorageProviderError';
  }
}
