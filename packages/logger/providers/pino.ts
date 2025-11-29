/**
 * @lumes/logger - Pino Provider
 *
 * Production-grade logger provider using Pino.
 * Supports both pretty printing (dev) and JSON structured logs (production).
 */

import pino from 'pino';
import type { ILoggerProvider } from './base';
import type { Logger, ProviderConfig } from '../types';
import { LoggerProviderError } from '../errors';
import { serializeError, isError } from '../utils/serializers';

/**
 * Pino logger provider implementation
 *
 * Creates Pino instances configured for:
 * - Development: Pretty printed, colored logs via pino-pretty
 * - Production: JSON structured logs (Vercel-friendly)
 *
 * Features:
 * - Automatic error serialization with stack traces
 * - Request ID injection
 * - Child logger support
 * - Environment-aware formatting
 */
export class PinoProvider implements ILoggerProvider {
  /**
   * Create a Pino logger instance
   *
   * @param config - Provider configuration
   * @returns Logger instance (Pino compatible)
   * @throws {LoggerProviderError} If Pino initialization fails
   */
  create(config: ProviderConfig): Logger {
    try {
      // Determine if we need pretty printing
      const usePretty = config.pretty;

      // Base Pino options
      const pinoOptions: pino.LoggerOptions = {
        level: config.level,

        // Base context (included in all logs)
        base: config.base,

        // Error key name
        errorKey: 'err',

        // Custom serializers
        serializers: {
          // Serialize Error objects properly
          err: (error: Error) => serializeError(error),
        },

        // Browser compatibility (works in Edge runtime)
        browser: {
          asObject: true,
        },
      };

      // Add request ID to base if provided
      if (config.requestId) {
        pinoOptions.base = {
          ...pinoOptions.base,
          requestId: config.requestId,
        };
      }

      // Always use standard Pino (no pretty printer to avoid worker thread issues)
      // Pretty printing can be added via external tools (pino-pretty CLI) if needed
      const logger = pino(pinoOptions);

      // Return logger (already matches Logger interface)
      return logger as Logger;
    } catch (error) {
      throw new LoggerProviderError('Failed to initialize Pino logger', error);
    }
  }
}

/**
 * Singleton instance of Pino provider
 */
export const pinoProvider = new PinoProvider();
