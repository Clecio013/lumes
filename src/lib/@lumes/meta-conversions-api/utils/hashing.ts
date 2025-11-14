/**
 * @lumes/meta-conversions-api - Hashing Utilities
 *
 * Utilities for hashing PII (Personally Identifiable Information)
 * as required by Meta Conversions API.
 *
 * @see https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters
 */

import crypto from 'crypto';

/**
 * Normalize and hash a string according to Meta requirements
 *
 * @param value - Value to hash
 * @returns SHA256 hash of normalized value
 */
function hashValue(value: string): string {
  // Normalize: lowercase, trim whitespace
  const normalized = value.toLowerCase().trim();

  // SHA256 hash
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normalize and hash email
 *
 * Meta requirements:
 * - Remove whitespace
 * - Convert to lowercase
 * - SHA256 hash
 *
 * @param email - Email address
 * @returns Hashed email
 *
 * @example
 * ```typescript
 * hashEmail(' Test@Example.com ');
 * // Returns: "973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b"
 * ```
 */
export function hashEmail(email: string): string {
  return hashValue(email);
}

/**
 * Normalize and hash phone number
 *
 * Meta requirements:
 * - Remove all non-numeric characters (spaces, dashes, parentheses)
 * - Keep country code (+ sign should be removed)
 * - SHA256 hash
 *
 * @param phone - Phone number
 * @returns Hashed phone
 *
 * @example
 * ```typescript
 * hashPhone('+55 (11) 99999-9999');
 * // Returns hash of "5511999999999"
 * ```
 */
export function hashPhone(phone: string): string {
  // Remove all non-numeric characters
  const normalized = phone.replace(/\D/g, '');
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normalize and hash name (first/last)
 *
 * Meta requirements:
 * - Remove whitespace
 * - Convert to lowercase
 * - SHA256 hash
 *
 * @param name - First or last name
 * @returns Hashed name
 */
export function hashName(name: string): string {
  return hashValue(name);
}

/**
 * Normalize and hash city
 *
 * Meta requirements:
 * - Remove whitespace
 * - Convert to lowercase
 * - Remove special characters
 * - SHA256 hash
 *
 * @param city - City name
 * @returns Hashed city
 */
export function hashCity(city: string): string {
  // Remove special characters, keep only letters and spaces
  const normalized = city.toLowerCase().trim().replace(/[^a-z\s]/g, '');
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normalize and hash state/region
 *
 * Meta requirements:
 * - Use 2-letter code if possible (e.g., "sp" for São Paulo)
 * - Convert to lowercase
 * - SHA256 hash
 *
 * @param state - State code or name
 * @returns Hashed state
 */
export function hashState(state: string): string {
  return hashValue(state);
}

/**
 * Normalize and hash zip/postal code
 *
 * Meta requirements:
 * - Remove whitespace
 * - Remove dashes
 * - Keep only first 5 digits (US) or full code (international)
 * - Convert to lowercase
 * - SHA256 hash
 *
 * @param zip - Zip/postal code
 * @returns Hashed zip
 */
export function hashZip(zip: string): string {
  // Remove whitespace and dashes
  const normalized = zip.toLowerCase().trim().replace(/[-\s]/g, '');
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normalize and hash country code
 *
 * Meta requirements (atualizado em 2024):
 * - Use ISO 3166-1 alpha-2 code (e.g., "br", "us")
 * - Convert to lowercase
 * - SHA256 hash
 *
 * @param country - Country code (2 letters)
 * @returns Hashed country
 *
 * @example
 * ```typescript
 * hashCountry('BR');
 * // Returns hash of "br"
 * ```
 */
export function hashCountry(country: string): string {
  return hashValue(country);
}
