/**
 * @lumes/meta-conversions-api - Custom Errors
 *
 * Custom error classes for Meta Conversions API operations.
 * Follows @lumes architecture patterns.
 */

/**
 * Base error for Meta Conversions API operations
 */
export class MetaConversionsError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'MetaConversionsError';
  }
}

/**
 * Error when configuration is invalid
 */
export class MetaConversionsConfigError extends MetaConversionsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'CONFIG_INVALID', originalError);
    this.name = 'MetaConversionsConfigError';
  }
}

/**
 * Error when API request fails
 */
export class MetaConversionsAPIError extends MetaConversionsError {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly fbtrace_id?: string,
    originalError?: unknown
  ) {
    super(message, 'API_ERROR', originalError);
    this.name = 'MetaConversionsAPIError';
  }
}

/**
 * Error when event data is invalid
 */
export class MetaConversionsValidationError extends MetaConversionsError {
  constructor(message: string, originalError?: unknown) {
    super(message, 'VALIDATION_ERROR', originalError);
    this.name = 'MetaConversionsValidationError';
  }
}
