/**
 * Configurações centralizadas do site
 * Todas as variáveis de ambiente são acessadas aqui
 */

export const siteConfig = {
  // Informações do site
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Seyune - Nutrição Comportamental",
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Transforme sua relação com a comida através da nutrição comportamental. Resultados sustentáveis sem restrições severas.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://seyune.com.br",

  // WhatsApp
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511975171391",
    message: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Olá! Vi o site e me identifiquei muito com a proposta da nutrição comportamental. Gostaria de agendar uma consulta!",
    // URL formatada pronta para usar
    get url() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.message)}`;
    },
  },

  // Analytics & Tracking
  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },

  // Redes Sociais
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/seyune",
  },

  // Links úteis
  links: {
    consultaPage: "/consulta",
    homepage: "/",
  },
} as const;

// Helper para verificar se analytics está configurado
export const hasAnalytics = {
  ga4: !!siteConfig.analytics.ga4Id,
  gtm: !!siteConfig.analytics.gtmId,
  metaPixel: !!siteConfig.analytics.metaPixelId,
};
