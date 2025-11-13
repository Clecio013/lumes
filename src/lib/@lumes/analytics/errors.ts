/**
 * @lumes/analytics - Errors
 *
 * Custom error classes para handling consistente
 */

export class AnalyticsError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'AnalyticsError';

    // Maintain stack trace (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AnalyticsError);
    }
  }
}

export class AdapterError extends AnalyticsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'ADAPTER_ERROR', originalError);
    this.name = 'AdapterError';
  }
}

export class ParserError extends AnalyticsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'PARSER_ERROR', originalError);
    this.name = 'ParserError';
  }
}

export class ConfigError extends AnalyticsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'CONFIG_ERROR', originalError);
    this.name = 'ConfigError';
  }
}

export class UTMError extends AnalyticsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'UTM_ERROR', originalError);
    this.name = 'UTMError';
  }
}
