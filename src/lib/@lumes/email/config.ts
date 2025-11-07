import { z } from 'zod';

/**
 * Providers de email suportados
 */
export const EmailProviderSchema = z.enum(['resend']);

export type EmailProvider = z.infer<typeof EmailProviderSchema>;

/**
 * Configuração do cliente de email
 */
export const EmailConfigSchema = z.object({
  /**
   * Provider de email a ser usado
   */
  provider: EmailProviderSchema,

  /**
   * API Key do provider
   */
  apiKey: z.string().min(1, 'API key é obrigatória'),

  /**
   * Email padrão do remetente
   * @example "Projeto 45 Graus <noreply@seyune.com>"
   */
  from: z.string().email().optional(),
});

export type EmailConfig = z.infer<typeof EmailConfigSchema>;
