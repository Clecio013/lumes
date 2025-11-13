/**
 * @lumes/logger - Logger Client (Factory)
 *
 * Main entry point for creating logger instances.
 * Follows Factory Pattern consistent with other @lumes libraries.
 */

import type { Logger, LoggerConfig } from './types';
import { validateConfig, createProviderConfig } from './config';
import { pinoProvider } from './providers/pino';
import { generateRequestId } from './utils/serializers';
import { LoggerConfigError } from './errors';

/**
 * Logger client factory
 *
 * Creates configured logger instances using Factory Pattern.
 * Validates configuration and delegates to provider implementation.
 *
 * @example
 * ```typescript
 * // Basic usage
 * const logger = LoggerClient.create();
 * logger.info('Hello world');
 *
 * // With configuration
 * const logger = LoggerClient.create({
 *   level: 'debug',
 *   pretty: true,
 *   generateRequestId: true,
 * });
 *
 * // With base context
 * const logger = LoggerClient.create({
 *   base: { service: 'api', version: '1.0.0' },
 * });
 *
 * // Create child logger with additional context
 * const requestLogger = logger.child({ requestId: '123' });
 * requestLogger.info('Processing request'); // Includes requestId
 * ```
 */
export class LoggerClient {
  /**
   * Create a new logger instance
   *
   * @param config - Logger configuration (optional)
   * @returns Configured logger instance
   * @throws {LoggerConfigError} If configuration is invalid
   *
   * @example
   * ```typescript
   * const logger = LoggerClient.create({ level: 'debug' });
   * logger.debug('Debug message');
   * logger.info({ userId: '123' }, 'User action');
   * logger.error({ err: error }, 'Operation failed');
   * ```
   */
  static create(config: LoggerConfig = {}): Logger {
    try {
      // Validate configuration
      const validatedConfig = validateConfig(config);

      // Generate request ID if requested
      const requestId = validatedConfig.generateRequestId
        ? generateRequestId()
        : undefined;

      // Create provider configuration
      const providerConfig = createProviderConfig(validatedConfig, requestId);

      // Create logger using Pino provider
      const logger = pinoProvider.create(providerConfig);

      return logger;
    } catch (error) {
      if (error instanceof LoggerConfigError) {
        throw error;
      }
      throw new LoggerConfigError('Failed to create logger', error);
    }
  }

  /**
   * Create a logger with automatic request ID generation
   *
   * Convenience method that creates a logger with a unique request ID
   * included in all logs.
   *
   * @param config - Logger configuration (optional)
   * @returns Logger with request ID in base context
   *
   * @example
   * ```typescript
   * const logger = LoggerClient.createWithRequestId();
   * logger.info('Processing webhook'); // Includes auto-generated requestId
   * ```
   */
  static createWithRequestId(config: LoggerConfig = {}): Logger {
    return LoggerClient.create({
      ...config,
      generateRequestId: true,
    });
  }

  /**
   * Create a logger configured for webhook handlers
   *
   * Convenience method that creates a logger optimized for webhook processing:
   * - Includes request ID for tracing
   * - Adds 'webhook' context
   * - Can specify webhook source (e.g., 'stripe', 'mercadopago')
   *
   * @param source - Webhook source identifier
   * @param config - Additional logger configuration
   * @returns Logger configured for webhooks
   *
   * @example
   * ```typescript
   * const logger = LoggerClient.createForWebhook('stripe');
   * logger.info('Webhook received');
   * // Output includes: { requestId: '...', webhook: 'stripe', msg: 'Webhook received' }
   * ```
   */
  static createForWebhook(source: string, config: LoggerConfig = {}): Logger {
    const baseLogger = LoggerClient.createWithRequestId(config);
    return baseLogger.child({ webhook: source });
  }
}
