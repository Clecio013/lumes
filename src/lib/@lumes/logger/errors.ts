/**
 * @lumes/logger - Custom Errors
 *
 * Error classes specific to logger operations.
 * Follows @lumes error handling patterns.
 */

/**
 * Base error class for all logger-related errors
 */
export class LoggerError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'LoggerError';

    // Maintains proper stack trace for where error was thrown (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Error thrown when logger configuration is invalid
 *
 * @example
 * ```typescript
 * throw new LoggerConfigError(
 *   'Invalid log level',
 *   'INVALID_LOG_LEVEL'
 * );
 * ```
 */
export class LoggerConfigError extends LoggerError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'LOGGER_CONFIG_ERROR', originalError);
    this.name = 'LoggerConfigError';
  }
}

/**
 * Error thrown when logger provider fails to initialize
 *
 * @example
 * ```typescript
 * throw new LoggerProviderError(
 *   'Failed to initialize Pino',
 *   error
 * );
 * ```
 */
export class LoggerProviderError extends LoggerError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'LOGGER_PROVIDER_ERROR', originalError);
    this.name = 'LoggerProviderError';
  }
}
