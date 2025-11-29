/**
 * @lumes/meta-conversions-api - Configuration
 *
 * Zod schemas for validating Meta Conversions API configuration.
 * Follows @lumes architecture patterns.
 */

import { z } from 'zod';

/**
 * Meta Conversions API configuration schema
 */
export const MetaConversionsConfigSchema = z.object({
  /**
   * Meta Pixel ID
   * @example "1372596174316647"
   */
  pixelId: z.string().min(1, 'Pixel ID é obrigatório'),

  /**
   * Conversions API Access Token
   * Get from: Meta Events Manager → Settings → Conversions API → Generate Access Token
   * @example "EAAxxxxx"
   */
  accessToken: z.string().min(1, 'Access Token é obrigatório'),

  /**
   * Test Event Code (optional, for testing in Events Manager)
   * Get from: Meta Events Manager → Test Events → Get Test Event Code
   * @example "TEST12345"
   */
  testEventCode: z.string().optional(),
});

export type MetaConversionsConfig = z.infer<typeof MetaConversionsConfigSchema>;

/**
 * Validate Meta Conversions API configuration
 *
 * @param config - User-provided configuration
 * @returns Validated configuration
 * @throws {Error} If configuration is invalid
 */
export function validateConfig(config: MetaConversionsConfig): MetaConversionsConfig {
  const result = MetaConversionsConfigSchema.safeParse(config);

  if (!result.success) {
    const message = result.error.issues
      .map((issue: z.ZodIssue) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');
    throw new Error(`Configuração inválida do Meta Conversions API: ${message}`);
  }

  return result.data;
}
