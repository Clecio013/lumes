/**
 * @lumes/telegram - Configuration
 *
 * Validates Telegram Bot configuration using Zod.
 */

import { z } from 'zod';

/**
 * Configuration schema for Telegram client
 */
export const TelegramConfigSchema = z.object({
  /**
   * Bot token from @BotFather
   * Format: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   */
  botToken: z.string().min(1, 'Bot token é obrigatório'),

  /**
   * Default chat ID to send messages to
   * Negative numbers for groups (e.g., -1001234567890)
   */
  defaultChatId: z.string().optional(),
});

export type TelegramConfig = z.infer<typeof TelegramConfigSchema>;

/**
 * Validates configuration and returns typed config
 *
 * @param config - Raw configuration object
 * @returns Validated configuration
 * @throws {z.ZodError} If configuration is invalid
 */
export function validateConfig(config: unknown): TelegramConfig {
  return TelegramConfigSchema.parse(config);
}
