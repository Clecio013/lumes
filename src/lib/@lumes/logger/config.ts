/**
 * @lumes/logger - Configuration Validation
 *
 * Zod schemas for validating logger configuration.
 * Follows @lumes architecture patterns.
 */

import { z } from 'zod';
import type { LoggerConfig, ProviderConfig } from './types';

/**
 * Log level enum schema
 */
export const LogLevelSchema = z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']);

/**
 * Logger configuration schema
 * Validates user-provided config with sensible defaults
 */
export const LoggerConfigSchema = z.object({
  /**
   * Minimum log level
   * @default 'info'
   */
  level: LogLevelSchema.default('info'),

  /**
   * Enable pretty printing
   * @default true in development, false in production
   */
  pretty: z.boolean().optional(),

  /**
   * Base context for all logs
   * @default { env: process.env.NODE_ENV }
   */
  base: z.record(z.string(), z.unknown()).optional(),

  /**
   * Auto-generate request ID
   * @default false
   */
  generateRequestId: z.boolean().default(false),
}) satisfies z.ZodType<LoggerConfig>;

/**
 * Validated and normalized configuration
 */
export type ValidatedLoggerConfig = z.infer<typeof LoggerConfigSchema>;

/**
 * Validate and normalize logger configuration
 *
 * @param config - User-provided configuration
 * @returns Validated configuration with defaults applied
 * @throws {LoggerConfigError} If configuration is invalid
 *
 * @example
 * ```typescript
 * const config = validateConfig({ level: 'debug' });
 * // Returns: { level: 'debug', pretty: true, base: {...}, generateRequestId: false }
 * ```
 */
export function validateConfig(config: LoggerConfig = {}): ValidatedLoggerConfig {
  const result = LoggerConfigSchema.safeParse(config);

  if (!result.success) {
    const message = result.error.issues
      .map((issue: z.ZodIssue) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');
    throw new Error(`Invalid logger configuration: ${message}`);
  }

  return result.data;
}

/**
 * Create provider configuration from validated logger config
 *
 * Applies environment-based defaults and transforms config
 * into format expected by provider implementations.
 *
 * @param config - Validated logger configuration
 * @param requestId - Optional request ID to inject
 * @returns Provider-ready configuration
 *
 * @example
 * ```typescript
 * const providerConfig = createProviderConfig(config, 'req-123');
 * // Returns: { level: 'info', pretty: true, base: {...}, requestId: 'req-123' }
 * ```
 */
export function createProviderConfig(
  config: ValidatedLoggerConfig,
  requestId?: string
): ProviderConfig {
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Check if we're in Edge Runtime (Vercel/Next.js)
  const isEdgeRuntime = (typeof globalThis !== 'undefined' && 'EdgeRuntime' in globalThis) ||
                        process.env.NEXT_RUNTIME === 'edge' ||
                        process.env.VERCEL === '1';

  // Default base context
  const defaultBase = {
    env: process.env.NODE_ENV || 'development',
  };

  // Merge base context
  const base = {
    ...defaultBase,
    ...(config.base || {}),
  };

  // Auto-detect pretty mode if not explicitly set
  // Disable pretty in Edge Runtime (no worker threads support)
  const pretty = config.pretty ?? (isDevelopment && !isEdgeRuntime);

  return {
    level: config.level,
    pretty,
    base,
    ...(requestId && { requestId }),
  };
}
