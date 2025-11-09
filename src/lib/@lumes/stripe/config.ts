import { z } from 'zod';

/**
 * Schema de validação para configuração do Stripe
 */
export const StripeConfigSchema = z.object({
  secretKey: z.string().min(1, 'Stripe Secret Key é obrigatória'),
  webhookSecret: z.string().optional(),
  apiVersion: z.string().default('2025-10-29.clover'),
});

export type StripeConfig = z.infer<typeof StripeConfigSchema>;

/**
 * Valida e retorna configuração do Stripe
 */
export function validateStripeConfig(config: Partial<StripeConfig>): StripeConfig {
  return StripeConfigSchema.parse(config);
}
