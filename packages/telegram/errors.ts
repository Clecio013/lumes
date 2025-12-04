/**
 * @lumes/telegram - Custom Errors
 *
 * Error classes for Telegram operations.
 */

/**
 * Base error for Telegram operations
 */
export class TelegramError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'TelegramError';
  }
}

/**
 * Error for configuration issues
 */
export class TelegramConfigError extends TelegramError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'CONFIG_ERROR', originalError);
    this.name = 'TelegramConfigError';
  }
}

/**
 * Error for API request failures
 */
export class TelegramApiError extends TelegramError {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly apiErrorCode?: number,
    originalError?: unknown
  ) {
    super(message, 'API_ERROR', originalError);
    this.name = 'TelegramApiError';
  }
}
