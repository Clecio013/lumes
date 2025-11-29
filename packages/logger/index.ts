/**
 * @lumes/logger - Public API
 *
 * Structured logging library using Pino.
 * Provides production-grade logging with development-friendly output.
 *
 * @example
 * ```typescript
 * import { LoggerClient } from '@lumes/logger';
 *
 * // Basic usage
 * const logger = LoggerClient.create();
 * logger.info('Server started');
 * logger.error({ err: error }, 'Failed to process');
 *
 * // With configuration
 * const logger = LoggerClient.create({
 *   level: 'debug',
 *   pretty: true,
 *   base: { service: 'api' },
 * });
 *
 * // For webhooks (includes request ID)
 * const logger = LoggerClient.createForWebhook('stripe');
 * logger.info({ sessionId }, 'Checkout completed');
 *
 * // Child loggers with context
 * const paymentLogger = logger.child({ paymentId: 'pi_123' });
 * paymentLogger.info('Processing payment'); // Includes paymentId automatically
 * ```
 *
 * @module @lumes/logger
 */

// Main client
export { LoggerClient } from './client';

// Types
export type { Logger, LoggerConfig, LogLevel, LogFn } from './types';

// Errors (useful for error handling)
export { LoggerError, LoggerConfigError, LoggerProviderError } from './errors';

// Re-export for advanced usage
export type { ILoggerProvider } from './providers/base';
