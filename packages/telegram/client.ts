/**
 * @lumes/telegram - Telegram Client (Factory)
 *
 * Main entry point for sending Telegram messages.
 * Uses the Bot API with native fetch (no external dependencies).
 */

import type {
  ITelegramClient,
  SendMessageParams,
  SendMessageResponse,
  PurchaseNotification,
} from './types';
import type { TelegramConfig } from './config';
import { validateConfig } from './config';
import { TelegramConfigError, TelegramApiError } from './errors';

const TELEGRAM_API_BASE = 'https://api.telegram.org/bot';

/**
 * Telegram client factory
 *
 * Creates configured Telegram client instances using Factory Pattern.
 *
 * @example
 * ```typescript
 * import { TelegramClient } from '@lumes/telegram';
 *
 * const client = TelegramClient.create({
 *   botToken: process.env.TELEGRAM_BOT_TOKEN!,
 *   defaultChatId: process.env.TELEGRAM_CHAT_ID,
 * });
 *
 * // Send a simple message
 * await client.sendMessage({
 *   chatId: '-1001234567890',
 *   text: 'Hello from bot!',
 * });
 *
 * // Send purchase notification
 * await client.sendPurchaseNotification('-1001234567890', {
 *   nome: 'João Silva',
 *   valor: 'R$ 397,00',
 * });
 * ```
 */
export class TelegramClient implements ITelegramClient {
  private readonly botToken: string;
  private readonly defaultChatId?: string;

  private constructor(config: TelegramConfig) {
    this.botToken = config.botToken;
    this.defaultChatId = config.defaultChatId;
  }

  /**
   * Create a new Telegram client instance
   *
   * @param config - Telegram configuration
   * @returns Configured Telegram client
   * @throws {TelegramConfigError} If configuration is invalid
   */
  static create(config: TelegramConfig): TelegramClient {
    try {
      const validatedConfig = validateConfig(config);
      return new TelegramClient(validatedConfig);
    } catch (error) {
      throw new TelegramConfigError('Invalid Telegram configuration', error);
    }
  }

  /**
   * Send a text message to a chat
   *
   * @param params - Message parameters
   * @returns Telegram API response
   * @throws {TelegramApiError} If API request fails
   */
  async sendMessage(params: SendMessageParams): Promise<SendMessageResponse> {
    const url = `${TELEGRAM_API_BASE}${this.botToken}/sendMessage`;

    const body = {
      chat_id: params.chatId,
      text: params.text,
      parse_mode: params.parseMode || 'Markdown',
      disable_web_page_preview: params.disableLinkPreview || false,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data: SendMessageResponse = await response.json();

      if (!response.ok || !data.ok) {
        throw new TelegramApiError(
          data.description || 'Telegram API request failed',
          response.status,
          data.error_code
        );
      }

      return data;
    } catch (error) {
      if (error instanceof TelegramApiError) {
        throw error;
      }
      throw new TelegramApiError('Failed to send Telegram message', undefined, undefined, error);
    }
  }

  /**
   * Send a purchase notification with formatted message
   *
   * @param chatId - Target chat ID
   * @param data - Purchase notification data
   * @returns Telegram API response
   */
  async sendPurchaseNotification(
    chatId: string,
    data: PurchaseNotification
  ): Promise<SendMessageResponse> {
    const message = this.formatPurchaseMessage(data);

    return this.sendMessage({
      chatId,
      text: message,
      parseMode: 'Markdown',
    });
  }

  /**
   * Format purchase notification message
   */
  private formatPurchaseMessage(data: PurchaseNotification): string {
    return `🎉 Nova venda!

👤 ${data.nome}
💰 ${data.valor}`;
  }

  /**
   * Get default chat ID
   */
  getDefaultChatId(): string | undefined {
    return this.defaultChatId;
  }
}
