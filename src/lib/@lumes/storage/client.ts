import type { StorageConfig } from './config';
import { StorageConfigSchema } from './config';
import type { IStorageProvider } from './types';
import { VercelKVAdapter } from './providers/vercel-kv';
import { RedisAdapter } from './providers/redis';
import { StorageConfigError, StorageProviderError } from './errors';

/**
 * Cliente principal de storage
 *
 * Factory Pattern: Cria instância apropriada do provider
 * Adapter Pattern: Abstrai diferenças entre providers
 *
 * @example
 * ```typescript
 * const storage = StorageClient.create({
 *   provider: 'vercel-kv'
 * });
 *
 * await storage.set('counter', 0);
 * await storage.increment('counter');
 * const value = await storage.get<number>('counter'); // 1
 * ```
 */
export class StorageClient {
  private constructor(private readonly provider: IStorageProvider) {}

  /**
   * Cria uma nova instância do cliente de storage
   *
   * @param config - Configuração do cliente
   * @returns Instância configurada do cliente
   * @throws {StorageConfigError} Se configuração for inválida
   * @throws {StorageProviderError} Se provider não for suportado
   */
  static create(config: StorageConfig): StorageClient {
    try {
      const validated = StorageConfigSchema.parse(config);

      // Criar adapter apropriado baseado no provider
      const provider = StorageClient.createProvider(validated);

      return new StorageClient(provider);
    } catch (error) {
      throw new StorageConfigError('Configuração inválida do storage client', error);
    }
  }

  /**
   * Cria provider apropriado (Factory interno)
   */
  private static createProvider(config: StorageConfig): IStorageProvider {
    switch (config.provider) {
      case 'vercel-kv':
        // Detecta automaticamente se é Vercel KV ou Redis
        const kvUrl = process.env.KV_URL;
        const hasRestApi = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;

        if (kvUrl && !hasRestApi) {
          // Usando Redis Cloud (via KV_URL)
          return new RedisAdapter(kvUrl);
        } else {
          // Usando Vercel KV nativo (via REST API)
          return new VercelKVAdapter();
        }

      default:
        throw new StorageProviderError(
          `Provider ${config.provider} não é suportado`
        );
    }
  }

  /**
   * Busca valor por chave
   */
  async get<T>(key: string): Promise<T | null> {
    return this.provider.get<T>(key);
  }

  /**
   * Define valor para chave
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    return this.provider.set(key, value, ttl);
  }

  /**
   * Incrementa valor numérico
   */
  async increment(key: string, by?: number): Promise<number> {
    return this.provider.increment(key, by);
  }

  /**
   * Decrementa valor numérico
   */
  async decrement(key: string, by?: number): Promise<number> {
    return this.provider.decrement(key, by);
  }

  /**
   * Deleta chave
   */
  async delete(key: string): Promise<void> {
    return this.provider.delete(key);
  }

  /**
   * Verifica se chave existe
   */
  async exists(key: string): Promise<boolean> {
    return this.provider.exists(key);
  }
}
