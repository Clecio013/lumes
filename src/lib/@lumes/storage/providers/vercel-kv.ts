import { kv } from '@vercel/kv';
import type { IStorageProvider } from './base';
import { StorageOperationError } from '../errors';

/**
 * Adapter para Vercel KV
 *
 * Implementa IStorageProvider usando @vercel/kv
 */
export class VercelKVAdapter implements IStorageProvider {
  /**
   * Busca valor por chave
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      return await kv.get<T>(key);
    } catch (error) {
      throw new StorageOperationError(`Falha ao buscar chave "${key}"`, error);
    }
  }

  /**
   * Define valor para chave
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      if (ttl) {
        await kv.set(key, value, { ex: ttl });
      } else {
        await kv.set(key, value);
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
      return await kv.incrby(key, by);
    } catch (error) {
      throw new StorageOperationError(`Falha ao incrementar chave "${key}"`, error);
    }
  }

  /**
   * Decrementa valor numérico
   */
  async decrement(key: string, by: number = 1): Promise<number> {
    try {
      return await kv.decrby(key, by);
    } catch (error) {
      throw new StorageOperationError(`Falha ao decrementar chave "${key}"`, error);
    }
  }

  /**
   * Deleta chave
   */
  async delete(key: string): Promise<void> {
    try {
      await kv.del(key);
    } catch (error) {
      throw new StorageOperationError(`Falha ao deletar chave "${key}"`, error);
    }
  }

  /**
   * Verifica se chave existe
   */
  async exists(key: string): Promise<boolean> {
    try {
      const result = await kv.exists(key);
      return result === 1;
    } catch (error) {
      throw new StorageOperationError(`Falha ao verificar chave "${key}"`, error);
    }
  }
}
