import { z } from 'zod';

/**
 * Configuração do cliente Mercado Pago
 */
export const MercadoPagoConfigSchema = z.object({
  /**
   * Access Token obtido no painel do Mercado Pago
   * Formato: TEST-xxxx (sandbox) ou APP-xxxx (produção)
   */
  accessToken: z.string().min(1, 'Access token é obrigatório'),

  /**
   * Public Key para uso no frontend (opcional)
   */
  publicKey: z.string().optional(),

  /**
   * Se true, usa ambiente de testes (sandbox)
   * @default false
   */
  sandbox: z.boolean().default(false),
});

export type MercadoPagoConfig = z.infer<typeof MercadoPagoConfigSchema>;
