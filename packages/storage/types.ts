/**
 * Interface base para providers de storage (Adapter Pattern)
 */
export interface IStorageProvider {
  /**
   * Busca valor por chave
   *
   * @param key - Chave do valor
   * @returns Promise com valor ou null se não existir
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Define valor para chave
   *
   * @param key - Chave do valor
   * @param value - Valor a armazenar
   * @param ttl - Tempo de vida em segundos (opcional)
   */
  set<T>(key: string, value: T, ttl?: number): Promise<void>;

  /**
   * Incrementa valor numérico
   *
   * @param key - Chave do valor
   * @param by - Quanto incrementar (padrão: 1)
   * @returns Promise com novo valor
   */
  increment(key: string, by?: number): Promise<number>;

  /**
   * Decrementa valor numérico
   *
   * @param key - Chave do valor
   * @param by - Quanto decrementar (padrão: 1)
   * @returns Promise com novo valor
   */
  decrement(key: string, by?: number): Promise<number>;

  /**
   * Deleta chave
   *
   * @param key - Chave a deletar
   */
  delete(key: string): Promise<void>;

  /**
   * Verifica se chave existe
   *
   * @param key - Chave a verificar
   */
  exists(key: string): Promise<boolean>;
}
