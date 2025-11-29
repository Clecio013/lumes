/**
 * @lumes/logger - Serializers
 *
 * Utilities for safely serializing errors and objects for logging.
 * Ensures Error objects are properly converted to JSON with stack traces.
 */

/**
 * Serialized error object structure
 */
export interface SerializedError {
  type: string;
  message: string;
  stack?: string;
  code?: string;
  [key: string]: unknown;
}

/**
 * Serialize an Error object for logging
 *
 * Extracts relevant error information including:
 * - Type (constructor name)
 * - Message
 * - Stack trace
 * - Error code (if present)
 * - Custom properties
 *
 * @param error - Error instance to serialize
 * @returns Serialized error object
 *
 * @example
 * ```typescript
 * try {
 *   throw new Error('Something went wrong');
 * } catch (err) {
 *   const serialized = serializeError(err);
 *   // { type: 'Error', message: 'Something went wrong', stack: '...' }
 * }
 * ```
 */
export function serializeError(error: Error): SerializedError {
  const serialized: SerializedError = {
    type: error.constructor.name,
    message: error.message,
    stack: error.stack,
  };

  // Add error code if present (common in custom errors)
  if ('code' in error && typeof error.code === 'string') {
    serialized.code = error.code;
  }

  // Add any other enumerable properties
  // This catches custom error properties like `statusCode`, `details`, etc.
  for (const key of Object.keys(error)) {
    if (key !== 'message' && key !== 'stack') {
      serialized[key] = (error as any)[key];
    }
  }

  return serialized;
}

/**
 * Check if a value is an Error instance
 *
 * @param value - Value to check
 * @returns True if value is an Error
 *
 * @example
 * ```typescript
 * isError(new Error('test')); // true
 * isError({ message: 'test' }); // false
 * ```
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Safely serialize any value for logging
 *
 * - Error objects → serialized with stack trace
 * - Regular objects → passed through
 * - Primitives → wrapped in object
 *
 * @param value - Value to serialize
 * @returns Serialized value safe for JSON logging
 *
 * @example
 * ```typescript
 * safeSerialize(new Error('test')); // { type: 'Error', message: 'test', ... }
 * safeSerialize({ foo: 'bar' }); // { foo: 'bar' }
 * safeSerialize('hello'); // { value: 'hello' }
 * ```
 */
export function safeSerialize(value: unknown): Record<string, unknown> {
  if (isError(value)) {
    return serializeError(value);
  }

  if (typeof value === 'object' && value !== null) {
    return value as Record<string, unknown>;
  }

  // Wrap primitives
  return { value };
}

/**
 * Generate a unique request ID
 *
 * Uses crypto.randomUUID() if available (Node 16.7+, modern browsers),
 * falls back to timestamp-based ID otherwise.
 *
 * @returns Unique request identifier
 *
 * @example
 * ```typescript
 * generateRequestId(); // '550e8400-e29b-41d4-a716-446655440000'
 * ```
 */
export function generateRequestId(): string {
  // Use crypto.randomUUID if available (Node 16.7+, modern browsers)
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  // Fallback: timestamp-based UUID v4-like format
  // Not cryptographically secure, but sufficient for request tracking
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
