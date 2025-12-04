/**
 * @lumes/telegram - Types
 *
 * TypeScript interfaces for Telegram Bot API interactions.
 */

/**
 * Parameters for sending a message
 */
export interface SendMessageParams {
  /**
   * Target chat ID (group or user)
   * For groups, use negative numbers (e.g., -1001234567890)
   */
  chatId: string;

  /**
   * Message text (supports Markdown or HTML)
   */
  text: string;

  /**
   * Parse mode for message formatting
   * @default 'Markdown'
   */
  parseMode?: 'Markdown' | 'MarkdownV2' | 'HTML';

  /**
   * Disable link previews in messages
   * @default false
   */
  disableLinkPreview?: boolean;
}

/**
 * Response from Telegram API sendMessage
 */
export interface SendMessageResponse {
  ok: boolean;
  result?: {
    message_id: number;
    chat: {
      id: number;
      title?: string;
      type: string;
    };
    date: number;
    text?: string;
  };
  description?: string;
  error_code?: number;
}

/**
 * Purchase notification data
 */
export interface PurchaseNotification {
  /**
   * Customer name
   */
  nome: string;

  /**
   * Purchase amount formatted (e.g., "R$ 397,00")
   */
  valor: string;
}

/**
 * Telegram client interface
 */
export interface ITelegramClient {
  /**
   * Send a text message to a chat
   */
  sendMessage(params: SendMessageParams): Promise<SendMessageResponse>;

  /**
   * Send a purchase notification (formatted message)
   */
  sendPurchaseNotification(
    chatId: string,
    data: PurchaseNotification
  ): Promise<SendMessageResponse>;
}
