/**
 * Erro customizado para operações do Google Sheets
 */
export class SheetsError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'SheetsError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SheetsError);
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
export class SheetsConfigError extends SheetsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'CONFIG_ERROR', originalError);
    this.name = 'SheetsConfigError';
  }
}

/**
 * Erro ao adicionar linha
 */
export class SheetsAddRowError extends SheetsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'ADD_ROW_ERROR', originalError);
    this.name = 'SheetsAddRowError';
  }
}

/**
 * Erro ao atualizar linha
 */
export class SheetsUpdateRowError extends SheetsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'UPDATE_ROW_ERROR', originalError);
    this.name = 'SheetsUpdateRowError';
  }
}

/**
 * Erro ao ler dados
 */
export class SheetsReadError extends SheetsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'READ_ERROR', originalError);
    this.name = 'SheetsReadError';
  }
}
