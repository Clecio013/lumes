/**
 * @lumes/analytics - Config
 *
 * Validação de configuração com Zod
 */

import { z } from 'zod';
import { ConfigError } from './errors';

export const AnalyticsConfigSchema = z.object({
  adapter: z.enum(['csv', 'meta-api', 'ga4-api']).describe('Tipo de adapter'),

  csvData: z.string().optional(),

  accessToken: z.string().optional(),

  targets: z.object({
    cpl: z.number().positive().optional(),
    ctr: z.number().positive().max(100).optional(),
    cpc: z.number().positive().optional(),
  }).optional().default({
    cpl: 70,      // R$70 por lead
    ctr: 1,       // 1% CTR
    cpc: 5,       // R$5 por clique
  }),
}).refine(
  (data) => {
    // CSV adapter precisa de csvData
    if (data.adapter === 'csv' && !data.csvData) {
      return false;
    }

    // API adapters precisam de accessToken
    if ((data.adapter === 'meta-api' || data.adapter === 'ga4-api') && !data.accessToken) {
      return false;
    }

    return true;
  },
  {
    message: 'CSV adapter requer csvData. API adapters requerem accessToken.',
  }
);

export type ValidatedConfig = z.infer<typeof AnalyticsConfigSchema>;

export function validateConfig(config: unknown): ValidatedConfig {
  try {
    return AnalyticsConfigSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError;
      const messages = zodError.issues.map((err) => `${err.path.join('.')}: ${err.message}`);
      throw new ConfigError(
        `Configuração inválida:\n${messages.join('\n')}`,
        error
      );
    }
    throw new ConfigError('Erro ao validar configuração', error);
  }
}
