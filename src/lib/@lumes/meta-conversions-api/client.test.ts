/**
 * @lumes/meta-conversions-api - Client Tests
 *
 * Unit tests for Meta Conversions API client
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { MetaConversionsClient } from './client';
import type { ServerEvent } from './types';
import {
  MetaConversionsConfigError,
  MetaConversionsValidationError,
  MetaConversionsAPIError,
} from './errors';

// Mock global fetch
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('MetaConversionsClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Client Creation', () => {
    it('should create client with valid config', () => {
      const client = MetaConversionsClient.create({
        pixelId: '1372596174316647',
        accessToken: 'EAAtest123',
      });

      expect(client).toBeDefined();
      expect(client.getConfig()).toEqual({
        pixelId: '1372596174316647',
        accessToken: 'EAAtest123',
      });
    });

    it('should create client with test event code', () => {
      const client = MetaConversionsClient.create({
        pixelId: '1372596174316647',
        accessToken: 'EAAtest123',
        testEventCode: 'TEST12345',
      });

      expect(client.getConfig()).toEqual({
        pixelId: '1372596174316647',
        accessToken: 'EAAtest123',
        testEventCode: 'TEST12345',
      });
    });

    it('should throw error with invalid config - missing pixelId', () => {
      expect(() =>
        MetaConversionsClient.create({
          pixelId: '',
          accessToken: 'EAAtest123',
        })
      ).toThrow(MetaConversionsConfigError);
    });

    it('should throw error with invalid config - missing accessToken', () => {
      expect(() =>
        MetaConversionsClient.create({
          pixelId: '1372596174316647',
          accessToken: '',
        })
      ).toThrow(MetaConversionsConfigError);
    });

    it('should return frozen config object', () => {
      const client = MetaConversionsClient.create({
        pixelId: '1372596174316647',
        accessToken: 'EAAtest123',
      });

      const config = client.getConfig();
      expect(Object.isFrozen(config)).toBe(true);
    });
  });

  describe('Event Validation', () => {
    let client: MetaConversionsClient;

    beforeEach(() => {
      client = MetaConversionsClient.create({
        pixelId: '1372596174316647',
        accessToken: 'EAAtest123',
      });
    });

    it('should throw error if event_name is missing', async () => {
      const event = {
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'https://seyune.com.br',
        action_source: 'website',
        user_data: { email: 'test@example.com' },
      } as ServerEvent;

      await expect(client.sendEvent(event)).rejects.toThrow(
        MetaConversionsValidationError
      );
    });

    it('should throw error if event_time is invalid', async () => {
      const event = {
        event_name: 'Purchase',
        event_time: 0,
        event_source_url: 'https://seyune.com.br',
        action_source: 'website',
        user_data: { email: 'test@example.com' },
      } as ServerEvent;

      await expect(client.sendEvent(event)).rejects.toThrow(
        MetaConversionsValidationError
      );
    });

    it('should throw error if event_source_url is missing', async () => {
      const event = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: { email: 'test@example.com' },
      } as ServerEvent;

      await expect(client.sendEvent(event)).rejects.toThrow(
        MetaConversionsValidationError
      );
    });

    it('should throw error if user_data is empty', async () => {
      const event = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'https://seyune.com.br',
        action_source: 'website',
        user_data: {},
      } as ServerEvent;

      await expect(client.sendEvent(event)).rejects.toThrow(
        MetaConversionsValidationError
      );
    });

    it('should throw error if action_source is missing', async () => {
      const event = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'https://seyune.com.br',
        user_data: { email: 'test@example.com' },
      } as ServerEvent;

      await expect(client.sendEvent(event)).rejects.toThrow(
        MetaConversionsValidationError
      );
    });
  });

  describe('Send Event', () => {
    let client: MetaConversionsClient;

    beforeEach(() => {
      client = MetaConversionsClient.create({
        pixelId: '1372596174316647',
        accessToken: 'EAAtest123',
      });
    });

    it('should send event successfully', async () => {
      const mockResponse = {
        events_received: 1,
        fbtrace_id: 'trace123',
      };

      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const event: ServerEvent = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'https://seyune.com.br/projeto45dias',
        action_source: 'website',
        user_data: {
          email: 'test@example.com',
          phone: '+5511999999999',
        },
        custom_data: {
          currency: 'BRL',
          value: 397,
        },
      };

      const result = await client.sendEvent(event);

      expect(result.success).toBe(true);
      expect(result.response?.events_received).toBe(1);
      expect(result.fbtrace_id).toBe('trace123');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should send event with test_event_code when configured', async () => {
      const clientWithTest = MetaConversionsClient.create({
        pixelId: '1372596174316647',
        accessToken: 'EAAtest123',
        testEventCode: 'TEST12345',
      });

      const mockResponse = {
        events_received: 1,
        fbtrace_id: 'trace123',
      };

      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const event: ServerEvent = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'https://seyune.com.br',
        action_source: 'website',
        user_data: { email: 'test@example.com' },
      };

      await clientWithTest.sendEvent(event);

      const fetchCall = (global.fetch as jest.MockedFunction<typeof fetch>).mock.calls[0];
      const payload = JSON.parse(fetchCall[1]?.body as string);

      expect(payload.test_event_code).toBe('TEST12345');
    });

    it('should hash user data correctly', async () => {
      const mockResponse = {
        events_received: 1,
        fbtrace_id: 'trace123',
      };

      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const event: ServerEvent = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'https://seyune.com.br',
        action_source: 'website',
        user_data: {
          email: 'test@example.com',
          phone: '+5511999999999',
          firstName: 'John',
          lastName: 'Doe',
          city: 'São Paulo',
          state: 'SP',
          zip: '01310-100',
          country: 'BR',
        },
      };

      await client.sendEvent(event);

      const fetchCall = (global.fetch as jest.MockedFunction<typeof fetch>).mock.calls[0];
      const payload = JSON.parse(fetchCall[1]?.body as string);
      const userData = payload.data[0].user_data;

      // Should have hashed fields
      expect(userData.em).toBeDefined(); // hashed email
      expect(userData.ph).toBeDefined(); // hashed phone
      expect(userData.fn).toBeDefined(); // hashed first name
      expect(userData.ln).toBeDefined(); // hashed last name
      expect(userData.ct).toBeDefined(); // hashed city
      expect(userData.st).toBeDefined(); // hashed state
      expect(userData.zp).toBeDefined(); // hashed zip
      expect(userData.country).toBeDefined(); // hashed country (ATUALIZADO: agora é hasheado)

      // Country should be hashed, not plaintext (mudança Meta 2024)
      expect(typeof userData.country).toBe('string');
      expect(userData.country.length).toBe(64); // SHA-256 hex = 64 chars
      expect(userData.country).not.toBe('br'); // Not plaintext anymore

      // Original values should not appear
      expect(userData.email).toBeUndefined();
      expect(userData.phone).toBeUndefined();
      expect(userData.firstName).toBeUndefined();
    });

    it('should include event_id for deduplication', async () => {
      const mockResponse = {
        events_received: 1,
        fbtrace_id: 'trace123',
      };

      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const event: ServerEvent = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'https://seyune.com.br',
        action_source: 'website',
        event_id: 'payment_12345',
        user_data: { email: 'test@example.com' },
      };

      await client.sendEvent(event);

      const fetchCall = (global.fetch as jest.MockedFunction<typeof fetch>).mock.calls[0];
      const payload = JSON.parse(fetchCall[1]?.body as string);

      expect(payload.data[0].event_id).toBe('payment_12345');
    });

    it('should throw MetaConversionsAPIError on API error', async () => {
      const mockErrorResponse = {
        error: {
          message: 'Invalid access token',
          type: 'OAuthException',
          code: 190,
        },
        fbtrace_id: 'error_trace_123',
      };

      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => mockErrorResponse,
      } as Response);

      const event: ServerEvent = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'https://seyune.com.br',
        action_source: 'website',
        user_data: { email: 'test@example.com' },
      };

      await expect(client.sendEvent(event)).rejects.toThrow(
        MetaConversionsAPIError
      );
    });

    it('should handle network errors gracefully', async () => {
      (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
        new Error('Network error')
      );

      const event: ServerEvent = {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'https://seyune.com.br',
        action_source: 'website',
        user_data: { email: 'test@example.com' },
      };

      await expect(client.sendEvent(event)).rejects.toThrow(
        MetaConversionsAPIError
      );
    });
  });

  describe('Send Events (Batch)', () => {
    let client: MetaConversionsClient;

    beforeEach(() => {
      client = MetaConversionsClient.create({
        pixelId: '1372596174316647',
        accessToken: 'EAAtest123',
      });
    });

    it('should send multiple events successfully', async () => {
      const mockResponse = {
        events_received: 2,
        fbtrace_id: 'trace123',
      };

      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const events: ServerEvent[] = [
        {
          event_name: 'InitiateCheckout',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: 'https://seyune.com.br',
          action_source: 'website',
          user_data: { email: 'test1@example.com' },
        },
        {
          event_name: 'Purchase',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: 'https://seyune.com.br',
          action_source: 'website',
          user_data: { email: 'test2@example.com' },
        },
      ];

      const result = await client.sendEvents(events);

      expect(result.success).toBe(true);
      expect(result.response?.events_received).toBe(2);
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw error if events array is empty', async () => {
      await expect(client.sendEvents([])).rejects.toThrow(
        MetaConversionsValidationError
      );
    });

    it('should throw error if events exceed max batch size', async () => {
      const events = Array(1001).fill({
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: 'https://seyune.com.br',
        action_source: 'website',
        user_data: { email: 'test@example.com' },
      });

      await expect(client.sendEvents(events)).rejects.toThrow(
        MetaConversionsValidationError
      );
    });

    it('should validate all events in batch', async () => {
      const events: ServerEvent[] = [
        {
          event_name: 'Purchase',
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: 'https://seyune.com.br',
          action_source: 'website',
          user_data: { email: 'test1@example.com' },
        },
        {
          event_name: '', // Invalid
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: 'https://seyune.com.br',
          action_source: 'website',
          user_data: { email: 'test2@example.com' },
        },
      ];

      await expect(client.sendEvents(events)).rejects.toThrow(
        MetaConversionsValidationError
      );
    });
  });
});
