/**
 * @lumes/telegram - Public API
 *
 * Telegram Bot API client for sending notifications.
 * Uses native fetch with no external dependencies.
 *
 * @example
 * ```typescript
 * import { TelegramClient } from '@lumes/telegram';
 *
 * // Create client
 * const client = TelegramClient.create({
 *   botToken: process.env.TELEGRAM_BOT_TOKEN!,
 *   defaultChatId: process.env.TELEGRAM_CHAT_ID,
 * });
 *
 * // Send purchase notification
 * await client.sendPurchaseNotification('-1001234567890', {
 *   nome: 'João Silva',
 *   valor: 'R$ 397,00',
 * });
 *
 * // Send custom message
 * await client.sendMessage({
 *   chatId: '-1001234567890',
 *   text: '*Bold* and _italic_ text',
 *   parseMode: 'Markdown',
 * });
 * ```
 *
 * @module @lumes/telegram
 */

// Main client
export { TelegramClient } from './client';

// Types
export type {
  ITelegramClient,
  SendMessageParams,
  SendMessageResponse,
  PurchaseNotification,
} from './types';

// Config
export type { TelegramConfig } from './config';

// Errors
export { TelegramError, TelegramConfigError, TelegramApiError } from './errors';
