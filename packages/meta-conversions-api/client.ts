/**
 * @lumes/meta-conversions-api - Client
 *
 * Main client for Meta Conversions API (server-side event tracking).
 * Follows @lumes architecture patterns.
 *
 * @see https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import type {
  ServerEvent,
  SendEventResult,
  UserData,
  CustomData,
} from './types';
import { validateConfig, type MetaConversionsConfig } from './config';
import {
  MetaConversionsAPIError,
  MetaConversionsConfigError,
  MetaConversionsValidationError,
} from './errors';
import {
  hashEmail,
  hashPhone,
  hashName,
  hashCity,
  hashState,
  hashZip,
  hashCountry,
} from './utils/hashing';

/**
 * Meta Conversions API Client
 *
 * Sends server-side events to Meta for attribution and optimization.
 * Automatically hashes PII data according to Meta requirements.
 *
 * @example
 * ```typescript
 * const client = MetaConversionsClient.create({
 *   pixelId: process.env.META_PIXEL_ID!,
 *   accessToken: process.env.META_CONVERSIONS_API_TOKEN!,
 * });
 *
 * await client.sendEvent({
 *   event_name: 'Purchase',
 *   event_time: Math.floor(Date.now() / 1000),
 *   event_source_url: 'https://seyune.com.br/projeto45dias',
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
export class MetaConversionsClient {
  private config: MetaConversionsConfig;
  private baseURL = 'https://graph.facebook.com/v18.0';

  private constructor(config: MetaConversionsConfig) {
    this.config = config;
  }

  /**
   * Create a new Meta Conversions API client
   *
   * @param config - Configuration object
   * @returns Configured client instance
   * @throws {MetaConversionsConfigError} If configuration is invalid
   */
  static create(config: MetaConversionsConfig): MetaConversionsClient {
    try {
      const validatedConfig = validateConfig(config);
      return new MetaConversionsClient(validatedConfig);
    } catch (error) {
      throw new MetaConversionsConfigError(
        `Falha ao criar cliente Meta Conversions API: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        error
      );
    }
  }

  /**
   * Hash user data according to Meta requirements
   *
   * @param userData - Raw user data
   * @returns Hashed user data
   * @private
   */
  private hashUserData(userData: UserData): Record<string, unknown> {
    const hashed: Record<string, unknown> = {};

    // Hashed fields (SHA-256)
    if (userData.email) hashed.em = hashEmail(userData.email);
    if (userData.phone) hashed.ph = hashPhone(userData.phone);
    if (userData.firstName) hashed.fn = hashName(userData.firstName);
    if (userData.lastName) hashed.ln = hashName(userData.lastName);
    if (userData.city) hashed.ct = hashCity(userData.city);
    if (userData.state) hashed.st = hashState(userData.state);
    if (userData.zip) hashed.zp = hashZip(userData.zip);
    if (userData.country) hashed.country = hashCountry(userData.country); // ✅ ATUALIZADO: country agora é hasheado

    // Fields that are NOT hashed
    if (userData.clientIpAddress) hashed.client_ip_address = userData.clientIpAddress;
    if (userData.clientUserAgent) hashed.client_user_agent = userData.clientUserAgent;
    if (userData.fbp) hashed.fbp = userData.fbp;
    if (userData.fbc) hashed.fbc = userData.fbc;
    if (userData.externalId) hashed.external_id = userData.externalId;

    return hashed;
  }

  /**
   * Validate and normalize server event
   *
   * @param event - Server event to validate
   * @throws {MetaConversionsValidationError} If event is invalid
   * @private
   */
  private validateEvent(event: ServerEvent): void {
    if (!event.event_name) {
      throw new MetaConversionsValidationError('event_name é obrigatório');
    }

    if (!event.event_time || event.event_time <= 0) {
      throw new MetaConversionsValidationError('event_time deve ser um timestamp Unix válido');
    }

    if (!event.event_source_url) {
      throw new MetaConversionsValidationError('event_source_url é obrigatório');
    }

    if (!event.user_data || Object.keys(event.user_data).length === 0) {
      throw new MetaConversionsValidationError(
        'user_data é obrigatório (pelo menos email, phone, ou fbp)'
      );
    }

    if (!event.action_source) {
      throw new MetaConversionsValidationError('action_source é obrigatório');
    }
  }

  /**
   * Send event to Meta Conversions API
   *
   * @param event - Server event to send
   * @returns Result of send operation
   * @throws {MetaConversionsValidationError} If event is invalid
   * @throws {MetaConversionsAPIError} If API request fails
   *
   * @example
   * ```typescript
   * const result = await client.sendEvent({
   *   event_name: 'Purchase',
   *   event_time: Math.floor(Date.now() / 1000),
   *   event_source_url: 'https://example.com/checkout',
   *   action_source: 'website',
   *   user_data: { email: 'user@example.com' },
   *   custom_data: { currency: 'BRL', value: 397 },
   * });
   * ```
   */
  async sendEvent(event: ServerEvent): Promise<SendEventResult> {
    try {
      // Validate event
      this.validateEvent(event);

      // Hash user data
      const hashedUserData = this.hashUserData(event.user_data);

      // Build payload
      const payload = {
        data: [
          {
            event_name: event.event_name,
            event_time: event.event_time,
            event_source_url: event.event_source_url,
            user_data: hashedUserData,
            custom_data: event.custom_data || {},
            action_source: event.action_source,
            ...(event.event_id && { event_id: event.event_id }),
            ...(event.opt_out !== undefined && { opt_out: event.opt_out }),
          },
        ],
        ...(this.config.testEventCode && { test_event_code: this.config.testEventCode }),
      };

      // Send to Meta API
      const url = `${this.baseURL}/${this.config.pixelId}/events?access_token=${this.config.accessToken}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new MetaConversionsAPIError(
          `Meta API retornou erro: ${responseData.error?.message || 'Erro desconhecido'}`,
          response.status,
          responseData.fbtrace_id,
          responseData
        );
      }

      return {
        success: true,
        response: responseData,
        fbtrace_id: responseData.fbtrace_id,
      };
    } catch (error) {
      if (error instanceof MetaConversionsValidationError || error instanceof MetaConversionsAPIError) {
        throw error;
      }

      throw new MetaConversionsAPIError(
        `Falha ao enviar evento para Meta: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        undefined,
        undefined,
        error
      );
    }
  }

  /**
   * Send multiple events in a single request (batch)
   *
   * @param events - Array of server events
   * @returns Result of send operation
   * @throws {MetaConversionsValidationError} If any event is invalid
   * @throws {MetaConversionsAPIError} If API request fails
   */
  async sendEvents(events: ServerEvent[]): Promise<SendEventResult> {
    if (events.length === 0) {
      throw new MetaConversionsValidationError('Pelo menos um evento é necessário');
    }

    if (events.length > 1000) {
      throw new MetaConversionsValidationError('Máximo de 1000 eventos por batch');
    }

    // Validate all events
    events.forEach((event, index) => {
      try {
        this.validateEvent(event);
      } catch (error) {
        throw new MetaConversionsValidationError(
          `Evento ${index} inválido: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
        );
      }
    });

    // Hash user data for all events
    const data = events.map((event) => ({
      event_name: event.event_name,
      event_time: event.event_time,
      event_source_url: event.event_source_url,
      user_data: this.hashUserData(event.user_data),
      custom_data: event.custom_data || {},
      action_source: event.action_source,
      ...(event.event_id && { event_id: event.event_id }),
      ...(event.opt_out !== undefined && { opt_out: event.opt_out }),
    }));

    // Build payload
    const payload = {
      data,
      ...(this.config.testEventCode && { test_event_code: this.config.testEventCode }),
    };

    // Send to Meta API
    const url = `${this.baseURL}/${this.config.pixelId}/events?access_token=${this.config.accessToken}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new MetaConversionsAPIError(
        `Meta API retornou erro: ${responseData.error?.message || 'Erro desconhecido'}`,
        response.status,
        responseData.fbtrace_id,
        responseData
      );
    }

    return {
      success: true,
      response: responseData,
      fbtrace_id: responseData.fbtrace_id,
    };
  }

  /**
   * Get current configuration (readonly)
   *
   * @returns Configuration object (frozen)
   */
  getConfig(): Readonly<MetaConversionsConfig> {
    return Object.freeze({ ...this.config });
  }
}
