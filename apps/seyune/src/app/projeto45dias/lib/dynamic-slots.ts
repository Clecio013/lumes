/**
 * Dynamic slots system for Black Friday Extended
 * Decreases progressively over the campaign days
 */

const CAMPAIGN_START_DATE = new Date('2025-12-04');
const CAMPAIGN_END_DATE = new Date('2025-12-14');

// Slots progression from day 1 to day 11
// Dec 4: 15, Dec 5: 12, Dec 6: 10, Dec 7: 8, Dec 8: 7
// Dec 9: 6, Dec 10: 5, Dec 11: 4, Dec 12: 3, Dec 13: 2, Dec 14: 2
const SLOTS_PER_DAY = [15, 12, 10, 8, 7, 6, 5, 4, 3, 2, 2];

/**
 * Get remaining slots based on current date
 */
export function getRemainingSlots(): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Before campaign: show initial slots
  if (today < CAMPAIGN_START_DATE) {
    return SLOTS_PER_DAY[0];
  }

  // After campaign: show minimum slots (evergreen mode)
  if (today > CAMPAIGN_END_DATE) {
    return 5; // Evergreen: always show "poucas vagas"
  }

  // During campaign: decrease progressively
  const daysDiff = Math.floor(
    (today.getTime() - CAMPAIGN_START_DATE.getTime()) / (1000 * 60 * 60 * 24)
  );

  return SLOTS_PER_DAY[Math.min(daysDiff, SLOTS_PER_DAY.length - 1)];
}

/**
 * Get formatted slots text
 */
export function getSlotsText(): string {
  const slots = getRemainingSlots();

  if (slots === 0) {
    return 'Vagas esgotadas';
  }

  if (slots === 1) {
    return 'Resta apenas 1 vaga';
  }

  return `Restam apenas ${slots} vagas`;
}
