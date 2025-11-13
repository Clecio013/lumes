/**
 * @lumes/logger - Base Provider Interface
 *
 * Defines the contract that all logger providers must implement.
 * Follows Adapter Pattern to allow swapping logging implementations.
 */

import type { Logger, ProviderConfig } from '../types';

/**
 * Logger provider interface
 *
 * All logger providers (Pino, Console, etc.) must implement this interface.
 * This allows the logger client to work with any provider implementation.
 *
 * @example
 * ```typescript
 * class PinoProvider implements ILoggerProvider {
 *   create(config: ProviderConfig): Logger {
 *     const pinoInstance = pino({ ... });
 *     return pinoInstance;
 *   }
 * }
 * ```
 */
export interface ILoggerProvider {
  /**
   * Create a logger instance with the given configuration
   *
   * @param config - Provider configuration
   * @returns Logger instance ready to use
   * @throws {LoggerProviderError} If provider fails to initialize
   */
  create(config: ProviderConfig): Logger;
}
