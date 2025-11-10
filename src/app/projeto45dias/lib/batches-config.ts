/**
 * Batch Pricing Configuration for Projeto 45 Graus
 * Black Friday Campaign: November 10-28, 2025
 * 4 batches with incremental pricing to create urgency
 */

export interface Batch {
  id: number;
  name: string;
  /** @deprecated Campo mantido para referência histórica. Sistema não controla mais vagas via Redis. */
  slots: number;
  originalPrice: number;
  promotionalPrice: number;
  startDate: string; // Format: YYYY-MM-DD
  endDate: string; // Format: YYYY-MM-DD
  active: boolean;
}

export const BATCHES: Batch[] = [
  {
    id: 1,
    name: '1° Lote',
    slots: 25,
    originalPrice: 697,
    promotionalPrice: 397, //397
    startDate: '2025-11-05',
    endDate: '2025-11-13',
    active: true,
  },
  {
    id: 2,
    name: 'Batch 2 - Black Friday Week',
    slots: 25,
    originalPrice: 697,
    promotionalPrice: 397,
    startDate: '2025-11-14',
    endDate: '2025-11-17',
    active: false,
  },
  {
    id: 3,
    name: 'Batch 3 - Last Chance',
    slots: 25,
    originalPrice: 697,
    promotionalPrice: 447,
    startDate: '2025-11-18',
    endDate: '2025-11-21',
    active: false,
  },
  {
    id: 4,
    name: 'Batch 4 - Final Call',
    slots: 25,
    originalPrice: 697,
    promotionalPrice: 497,
    startDate: '2025-11-22',
    endDate: '2025-11-28',
    active: false,
  },
];

/**
 * Get the current active batch based on today's date
 * @returns Current batch or null if campaign hasn't started/ended
 */
export function getCurrentBatch(): Batch | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  const currentBatch = BATCHES.find((batch) => {
    const startDate = new Date(batch.startDate);
    const endDate = new Date(batch.endDate);
    endDate.setHours(23, 59, 59, 999); // End of day

    return today >= startDate && today <= endDate;
  });

  return currentBatch || null;
}

/**
 * Get the next upcoming batch after the current one
 * @returns Next batch or null if this is the last batch
 */
export function getNextBatch(): Batch | null {
  const currentBatch = getCurrentBatch();
  if (!currentBatch) return null;

  const nextBatchIndex = BATCHES.findIndex((batch) => batch.id === currentBatch.id) + 1;

  if (nextBatchIndex < BATCHES.length) {
    return BATCHES[nextBatchIndex];
  }

  return null;
}

/**
 * Calculate how much the user saves by buying in the current batch vs the next one
 * @returns Savings amount in BRL or 0 if no next batch
 */
export function calculateSavings(): number {
  const currentBatch = getCurrentBatch();
  const nextBatch = getNextBatch();

  if (!currentBatch || !nextBatch) return 0;

  return nextBatch.promotionalPrice - currentBatch.promotionalPrice;
}

/**
 * Check if the entire campaign has ended
 * @returns true if campaign has ended, false otherwise
 */
export function isCampaignEnded(): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastBatch = BATCHES[BATCHES.length - 1];
  const campaignEndDate = new Date(lastBatch.endDate);
  campaignEndDate.setHours(23, 59, 59, 999);

  return today > campaignEndDate;
}

/**
 * Get total discount percentage for current batch
 * @returns Discount percentage (e.g., 50 for 50% off)
 */
export function getDiscountPercentage(): number {
  const currentBatch = getCurrentBatch();
  if (!currentBatch) return 0;

  const discount = ((currentBatch.originalPrice - currentBatch.promotionalPrice) / currentBatch.originalPrice) * 100;
  return Math.round(discount);
}

/**
 * Format price in Brazilian Real
 * @param price - Price in BRL
 * @returns Formatted price string (e.g., "R$ 347,00")
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
