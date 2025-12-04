/**
 * Campaign configuration
 * Controls Black Friday vs Evergreen mode
 */

const BLACK_FRIDAY_END_DATE = new Date('2025-12-14T23:59:59');

/**
 * Check if we're still in Black Friday period
 */
export function isBlackFriday(): boolean {
  const now = new Date();
  return now <= BLACK_FRIDAY_END_DATE;
}

/**
 * Check if the promotional campaign has ended
 */
export function isCampaignEnded(): boolean {
  return !isBlackFriday();
}

// Pricing configuration
export const PRICES = {
  promotional: 397,
  regular: 697,
} as const;

/**
 * Get current price based on campaign status
 */
export function getCurrentPrice(): number {
  return isBlackFriday() ? PRICES.promotional : PRICES.regular;
}

/**
 * Get discount percentage
 */
export function getDiscountPercentage(): number {
  if (!isBlackFriday()) return 0;
  return Math.round(((PRICES.regular - PRICES.promotional) / PRICES.regular) * 100);
}

// Copy variations for Black Friday vs Evergreen
export const COPY = {
  blackFriday: {
    heroBadge: 'Vagas Limitadas • Black Friday',
    countdownTitle: 'BLACK FRIDAY TERMINA EM:',
    countdownSubtitle: (discount: number) =>
      `Garanta sua vaga com ${discount}% OFF antes que acabe`,
    urgencyBadge: (slots: number) =>
      `Black Friday • Restam ${slots} vagas • Termina 14/12`,
    urgencyText: '⏰ Black Friday termina 14 de dezembro • Depois volta pra R$ 697',
    ctaPrice: (price: number) => `✅ GARANTIR VAGA POR R$ ${price}`,
    metaDescription:
      'O único programa que une nutrição comportamental + treino personalizado para resultados que duram. Black Friday - Vagas Limitadas.',
  },
  evergreen: {
    heroBadge: 'Últimas Vagas Disponíveis',
    countdownTitle: null, // Hide countdown in evergreen
    countdownSubtitle: null,
    urgencyBadge: () => 'Poucas vagas disponíveis',
    urgencyText: '⏰ Vagas limitadas • Garanta seu lugar na próxima turma',
    ctaPrice: () => '✅ GARANTIR MINHA VAGA',
    metaDescription:
      'O único programa que une nutrição comportamental + treino personalizado para resultados que duram. Vagas Limitadas.',
  },
} as const;

/**
 * Get copy based on current campaign status
 */
export function getCopy() {
  return isBlackFriday() ? COPY.blackFriday : COPY.evergreen;
}

/**
 * Get metadata description based on campaign status
 */
export function getMetaDescription(): string {
  return isBlackFriday()
    ? COPY.blackFriday.metaDescription
    : COPY.evergreen.metaDescription;
}
