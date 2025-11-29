/**
 * @lumes/logger - Type Definitions
 *
 * Public interfaces and types for the logger library.
 * Follows Pino's API structure for familiarity.
 */

/**
 * Log level type
 */
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Log function overloads matching Pino's API
 */
export interface LogFn {
  /**
   * Log with object and message
   * @example logger.info({ userId: '123' }, 'User logged in')
   */
  <T extends object>(obj: T, msg?: string, ...args: unknown[]): void;

  /**
   * Log with message only
   * @example logger.info('Server started')
   */
  (msg: string, ...args: unknown[]): void;

  /**
   * Log with object only
   * @example logger.info({ event: 'startup', port: 3000 })
   */
  <T extends object>(obj: T): void;
}

/**
 * Main logger interface
 * Compatible with Pino's API
 */
export interface Logger {
  /**
   * Trace level (most verbose)
   */
  trace: LogFn;

  /**
   * Debug level (for development)
   */
  debug: LogFn;

  /**
   * Info level (general information)
   */
  info: LogFn;

  /**
   * Warn level (warnings that don't prevent execution)
   */
  warn: LogFn;

  /**
   * Error level (errors that need attention)
   */
  error: LogFn;

  /**
   * Fatal level (critical errors)
   */
  fatal: LogFn;

  /**
   * Create a child logger with additional context
   *
   * @param bindings - Context to add to all logs from this child
   * @returns New logger instance with merged context
   *
   * @example
   * ```typescript
   * const requestLogger = logger.child({ requestId: '123' });
   * requestLogger.info('Processing'); // Includes requestId in log
   *
   * const paymentLogger = requestLogger.child({ paymentId: 'pi_456' });
   * paymentLogger.info('Payment received'); // Includes both requestId and paymentId
   * ```
   */
  child(bindings: Record<string, unknown>): Logger;
}

/**
 * Logger configuration options
 */
export interface LoggerConfig {
  /**
   * Minimum log level to output
   * @default 'info'
   */
  level?: LogLevel;

  /**
   * Enable pretty printing (colored, human-readable output)
   * When false, outputs structured JSON (better for production)
   * @default true in development, false in production
   */
  pretty?: boolean;

  /**
   * Base context to include in all logs
   * @example { env: 'production', service: 'api' }
   */
  base?: Record<string, unknown>;

  /**
   * Enable/disable request ID generation
   * When true, automatically generates unique ID for each logger instance
   * @default false
   */
  generateRequestId?: boolean;
}

/**
 * Internal provider configuration (passed to providers)
 */
export interface ProviderConfig extends Required<Omit<LoggerConfig, 'generateRequestId'>> {
  /**
   * Request ID to include in all logs (if provided)
   */
  requestId?: string;
}
