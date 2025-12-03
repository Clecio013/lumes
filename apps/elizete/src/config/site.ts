/**
 * Configurações centralizadas do site Elizete Garcia
 * Todas as variáveis de ambiente e dados do curso são acessados aqui
 */

export const siteConfig = {
  // Informações do site
  name: "Elizete Garcia - Estética Inteligente",
  description: "Curso de Avaliação de Pele e Consulta Estética Profissional. Aprenda o método de Raciocínio Clínico com 49 anos de experiência em estética.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://elizetegarcia.com.br",

  // Dados dos Cursos
  courses: {
    avaliacaoPele: {
      name: "Avaliação de Pele e Consulta Estética Profissional",
      slug: "avaliacao-pele",
      price: 97,
      originalPrice: 197,
      currency: "BRL",
      checkoutUrl: "https://pay.hotmart.com/S93861162D?off=zg4m3br3&hotfeature=51&_hi=eyJjaWQiOiIxNzQ2Mzc0MDg0MjA3MjQwMjIxODM2NTExNTg2OTAwIiwiYmlkIjoiMTc0NjM3NDA4NDIwNzI0MDIyMTgzNjUxMTU4NjkwMCIsInNpZCI6ImRhNDk3NmFlMTdkYzQyMmRiZTZjOTk5NmZmYjQ3Y2NhIn0=.1764682992438&bid=1764682993126",
      guarantee: 7,
      access: "infinite",
    },
    clareamentoIntimo: {
      name: "Clareamento Íntimo com Raciocínio Clínico",
      slug: "clareamento-intimo",
      price: 97,
      originalPrice: 397,
      currency: "BRL",
      checkoutUrl: "https://pay.hotmart.com/X101182641X?off=a2fwo7ms&hotfeature=51",
      guarantee: 7,
      access: "1year",
    },
  },

  // Alias para manter compatibilidade
  course: {
    name: "Avaliação de Pele e Consulta Estética Profissional",
    price: 97,
    originalPrice: 197,
    currency: "BRL",
    checkoutUrl: "https://pay.hotmart.com/S93861162D?off=zg4m3br3&hotfeature=51&_hi=eyJjaWQiOiIxNzQ2Mzc0MDg0MjA3MjQwMjIxODM2NTExNTg2OTAwIiwiYmlkIjoiMTc0NjM3NDA4NDIwNzI0MDIyMTgzNjUxMTU4NjkwMCIsInNpZCI6ImRhNDk3NmFlMTdkYzQyMmRiZTZjOTk5NmZmYjQ3Y2NhIn0=.1764682992438&bid=1764682993126",
    guarantee: 7,
  },

  // Redes Sociais
  social: {
    instagram: "https://www.instagram.com/eli.zetegarcia/",
    youtube: "https://www.youtube.com/@eli.zetegarcia",
  },

  // Analytics & Tracking
  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },

  // Links úteis
  links: {
    avaliacaoPele: "/avaliacao-pele",
    clareamentoIntimo: "/clareamento-intimo",
    homepage: "/",
  },
} as const;

// Helper para verificar se analytics está configurado
export const hasAnalytics = {
  ga4: !!siteConfig.analytics.ga4Id,
  gtm: !!siteConfig.analytics.gtmId,
  metaPixel: !!siteConfig.analytics.metaPixelId,
};

// Helper para formatar preço
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}
