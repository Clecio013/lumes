import { StorageClient } from '@/lib/@lumes/storage';

/**
 * Gerenciador de vagas para lotes do Projeto 45 Graus
 *
 * Usa Vercel KV para armazenar contador de vagas por lote
 */

// Inicializar storage client (Vercel KV)
const storage = StorageClient.create({ provider: 'vercel-kv' });

/**
 * Chave do storage para um lote específico
 */
function getSlotKey(loteId: number): string {
  return `projeto45:lote${loteId}:slots`;
}

/**
 * Busca número de vagas disponíveis para um lote
 *
 * @param loteId - ID do lote (1, 2, 3, 4)
 * @returns Promise com número de vagas disponíveis
 *
 * @example
 * ```typescript
 * const slots = await getAvailableSlots(1); // 25
 * ```
 */
export async function getAvailableSlots(loteId: number): Promise<number> {
  const key = getSlotKey(loteId);
  const slots = await storage.get<number>(key);

  // Se não existe, inicializar com 25 vagas
  if (slots === null) {
    await storage.set(key, 25);
    return 25;
  }

  return slots;
}

/**
 * Decrementa uma vaga (quando alguém compra)
 *
 * @param loteId - ID do lote
 * @returns Promise com novo número de vagas
 *
 * @example
 * ```typescript
 * const newCount = await decrementSlot(1); // 24
 * ```
 */
export async function decrementSlot(loteId: number): Promise<number> {
  const key = getSlotKey(loteId);

  // Garantir que existe antes de decrementar
  const current = await getAvailableSlots(loteId);

  if (current <= 0) {
    return 0;
  }

  const newCount = await storage.decrement(key);

  // Evitar valores negativos
  if (newCount < 0) {
    await storage.set(key, 0);
    return 0;
  }

  return newCount;
}

/**
 * Reseta número de vagas para um lote (admin)
 *
 * @param loteId - ID do lote
 * @param value - Novo número de vagas (padrão: 25)
 *
 * @example
 * ```typescript
 * await resetSlots(1, 25); // Reseta lote 1 para 25 vagas
 * ```
 */
export async function resetSlots(loteId: number, value: number = 25): Promise<void> {
  const key = getSlotKey(loteId);
  await storage.set(key, value);
}

/**
 * Verifica se ainda há vagas disponíveis
 *
 * @param loteId - ID do lote
 * @returns Promise com boolean (true = tem vagas)
 *
 * @example
 * ```typescript
 * const hasSlots = await hasAvailableSlots(1); // true
 * ```
 */
export async function hasAvailableSlots(loteId: number): Promise<boolean> {
  const slots = await getAvailableSlots(loteId);
  return slots > 0;
}
