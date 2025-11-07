import { z } from 'zod';

/**
 * Providers de storage suportados
 */
export const StorageProviderSchema = z.enum(['vercel-kv']);

export type StorageProvider = z.infer<typeof StorageProviderSchema>;

/**
 * Configuração do cliente de storage
 */
export const StorageConfigSchema = z.object({
  /**
   * Provider de storage a ser usado
   */
  provider: StorageProviderSchema,

  /**
   * URL da API REST (para Vercel KV)
   * Geralmente auto-configurado via variáveis de ambiente
   */
  url: z.string().url().optional(),

  /**
   * Token de autenticação (para Vercel KV)
   * Geralmente auto-configurado via variáveis de ambiente
   */
  token: z.string().optional(),
});

export type StorageConfig = z.infer<typeof StorageConfigSchema>;
