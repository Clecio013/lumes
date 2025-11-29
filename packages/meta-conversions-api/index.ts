/**
 * @lumes/meta-conversions-api
 *
 * Meta Conversions API client for server-side event tracking.
 * Follows @lumes architecture patterns.
 *
 * @example
 * ```typescript
 * import { MetaConversionsClient } from '@lumes/meta-conversions-api';
 *
 * const client = MetaConversionsClient.create({
 *   pixelId: process.env.META_PIXEL_ID!,
 *   accessToken: process.env.META_CONVERSIONS_API_TOKEN!,
 * });
 *
 * await client.sendEvent({
 *   event_name: 'Purchase',
 *   event_time: Math.floor(Date.now() / 1000),
 *   event_source_url: 'https://example.com',
 *   action_source: 'website',
 *   user_data: {
 *     email: 'user@example.com',
 *     phone: '+5511999999999',
 *   },
 *   custom_data: {
 *     currency: 'BRL',
 *     value: 397,
 *   },
 * });
 * ```
 */

// Client
export { MetaConversionsClient } from './client';

// Types
export type {
  UserData,
  CustomData,
  ServerEvent,
  ConversionsAPIResponse,
  SendEventResult,
} from './types';

// Config
export type { MetaConversionsConfig } from './config';

// Errors
export {
  MetaConversionsError,
  MetaConversionsConfigError,
  MetaConversionsAPIError,
  MetaConversionsValidationError,
} from './errors';
