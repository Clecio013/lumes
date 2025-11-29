/**
 * @lumes/meta-conversions-api - Types
 *
 * TypeScript types for Meta Conversions API (server-side tracking)
 * Follows @lumes architecture patterns.
 *
 * @see https://developers.facebook.com/docs/marketing-api/conversions-api
 */

/**
 * User data for event attribution
 * Used for matching events to users in Meta
 */
export interface UserData {
  /** Email address (hashed automatically) */
  email?: string;

  /** Phone number (hashed automatically) */
  phone?: string;

  /** First name (hashed automatically) */
  firstName?: string;

  /** Last name (hashed automatically) */
  lastName?: string;

  /** City (hashed automatically) */
  city?: string;

  /** State/region (hashed automatically) */
  state?: string;

  /** Zip/postal code (hashed automatically) */
  zip?: string;

  /** Country code (ISO 3166-1 alpha-2, e.g., "BR") */
  country?: string;

  /** Client IP address */
  clientIpAddress?: string;

  /** Client User Agent */
  clientUserAgent?: string;

  /** Facebook Browser ID (fbp cookie) */
  fbp?: string;

  /** Facebook Click ID (fbc cookie) */
  fbc?: string;

  /** External ID (your system's user ID) */
  externalId?: string;
}

/**
 * Custom data for events
 * Additional parameters specific to event type
 */
export interface CustomData {
  /** Currency code (ISO 4217, e.g., "BRL") */
  currency?: string;

  /** Value of the conversion */
  value?: number;

  /** Content name (product/service name) */
  content_name?: string;

  /** Content category */
  content_category?: string;

  /** Content IDs */
  content_ids?: string[];

  /** Content type */
  content_type?: string;

  /** Number of items */
  num_items?: number;

  /** Order ID / Transaction ID */
  order_id?: string;

  /** Predicted LTV */
  predicted_ltv?: number;

  /** Search string */
  search_string?: string;

  /** Status (e.g., "completed", "pending") */
  status?: string;

  /** Custom properties */
  [key: string]: unknown;
}

/**
 * Server event to send to Meta
 */
export interface ServerEvent {
  /** Event name (e.g., "Purchase", "InitiateCheckout") */
  event_name: string;

  /** Event time (Unix timestamp in seconds) */
  event_time: number;

  /** Event source URL (where event occurred) */
  event_source_url: string;

  /** User data for attribution */
  user_data: UserData;

  /** Custom data */
  custom_data?: CustomData;

  /** Action source (where conversion happened: "website", "app", etc.) */
  action_source: 'website' | 'email' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';

  /** Event ID (for deduplication with pixel events) */
  event_id?: string;

  /** Opt out flag */
  opt_out?: boolean;
}

/**
 * Response from Meta Conversions API
 */
export interface ConversionsAPIResponse {
  /** Number of events received */
  events_received: number;

  /** Number of events processed */
  events_processed?: number;

  /** Facebook Trace ID (for debugging) */
  fbtrace_id: string;

  /** Messages (warnings, errors) */
  messages?: string[];
}

/**
 * Result of sending event
 */
export interface SendEventResult {
  /** If event was sent successfully */
  success: boolean;

  /** Response from Meta API */
  response?: ConversionsAPIResponse;

  /** Error if failed */
  error?: string;

  /** Facebook Trace ID (for support) */
  fbtrace_id?: string;
}
