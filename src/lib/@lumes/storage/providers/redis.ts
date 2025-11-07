import { createClient } from 'redis';
import type { IStorageProvider } from './base';
import { StorageOperationError } from '../errors';

/**
 * Adapter para Redis (node-redis)
 *
 * Implementa IStorageProvider usando redis client direto
 */
export class RedisAdapter implements IStorageProvider {
  private client: ReturnType<typeof createClient> | null = null;
  private connecting: Promise<void> | null = null;

  constructor(private url: string) {}

  /**
   * Garante conexão com Redis
   */
  private async ensureConnection(): Promise<ReturnType<typeof createClient>> {
    if (this.client?.isOpen) {
      return this.client;
    }

    // Se já está conectando, aguarda
    if (this.connecting) {
      await this.connecting;
      return this.client!;
    }

    // Inicia conexão
    this.connecting = (async () => {
      try {
        this.client = createClient({ url: this.url });
        await this.client.connect();
      } catch (error) {
        this.connecting = null;
        throw new StorageOperationError('Falha ao conectar ao Redis', error);
      }
    })();

    await this.connecting;
    return this.client!;
  }

  /**
   * Busca valor por chave
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const client = await this.ensureConnection();
      const value = await client.get(key);

      if (value === null) {
        return null;
      }

      // Tentar parsear como JSON, se falhar retornar string
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    } catch (error) {
      throw new StorageOperationError(`Falha ao buscar chave "${key}"`, error);
    }
  }

  /**
   * Define valor para chave
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      const client = await this.ensureConnection();
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);

      if (ttl) {
        await client.setEx(key, ttl, serialized);
      } else {
        await client.set(key, serialized);
      }
    } catch (error) {
      throw new StorageOperationError(`Falha ao definir chave "${key}"`, error);
    }
  }

  /**
   * Incrementa valor numérico
   */
  async increment(key: string, by: number = 1): Promise<number> {
    try {
      const client = await this.ensureConnection();
      return await client.incrBy(key, by);
    } catch (error) {
      throw new StorageOperationError(`Falha ao incrementar chave "${key}"`, error);
    }
  }

  /**
   * Decrementa valor numérico
   */
  async decrement(key: string, by: number = 1): Promise<number> {
    try {
      const client = await this.ensureConnection();
      return await client.decrBy(key, by);
    } catch (error) {
      throw new StorageOperationError(`Falha ao decrementar chave "${key}"`, error);
    }
  }

  /**
   * Deleta chave
   */
  async delete(key: string): Promise<void> {
    try {
      const client = await this.ensureConnection();
      await client.del(key);
    } catch (error) {
      throw new StorageOperationError(`Falha ao deletar chave "${key}"`, error);
    }
  }

  /**
   * Verifica se chave existe
   */
  async exists(key: string): Promise<boolean> {
    try {
      const client = await this.ensureConnection();
      const result = await client.exists(key);
      return result === 1;
    } catch (error) {
      throw new StorageOperationError(`Falha ao verificar chave "${key}"`, error);
    }
  }

  /**
   * Fecha conexão (cleanup)
   */
  async disconnect(): Promise<void> {
    if (this.client?.isOpen) {
      await this.client.quit();
    }
  }
}
