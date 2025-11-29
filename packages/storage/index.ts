/**
 * @lumes/storage
 *
 * Biblioteca para storage key-value
 * Suporta múltiplos providers via Adapter Pattern
 *
 * @example
 * ```typescript
 * import { StorageClient } from '@lumes/storage';
 *
 * const storage = StorageClient.create({
 *   provider: 'vercel-kv'
 * });
 *
 * // Armazenar valor
 * await storage.set('counter', 0);
 *
 * // Incrementar
 * await storage.increment('counter');
 *
 * // Buscar
 * const value = await storage.get<number>('counter'); // 1
 * ```
 */

// Client (Factory)
export { StorageClient } from './client';

// Config
export type { StorageConfig, StorageProvider } from './config';

// Types
export type { IStorageProvider } from './types';

// Errors
export {
  StorageError,
  StorageConfigError,
  StorageOperationError,
  StorageProviderError,
} from './errors';
