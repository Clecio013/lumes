/**
 * Exemplos de configuração de eventos para diferentes tipos de projeto
 *
 * Use como referência ao adaptar para seu projeto.
 * Copie o exemplo mais próximo do seu caso e adapte.
 */

import type { EventConfig } from "../core/types";

// ============================================================================
// EXEMPLO 1: LANDING PAGE (conversão via WhatsApp/formulário)
// ============================================================================

// Use para: Landing pages, páginas de captura, sites de serviço
export type LandingPageEvents =
  | "whatsapp_click"    // Click em botão WhatsApp
  | "form_submit"       // Envio de formulário
  | "cta_click"         // Click em CTA genérico
  | "faq_open"          // Abertura de FAQ
  | "scroll_depth"      // Profundidade de scroll
  | "section_view";     // Visualização de seção

export const LANDING_PAGE_CONFIG: Record<LandingPageEvents, EventConfig> = {
  whatsapp_click: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true, eventName: "whatsapp_click" },
      meta: { enabled: true, events: ["WhatsAppClick", "Lead"] },
    },
  },
  form_submit: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true, eventName: "form_submit" },
      meta: { enabled: true, events: ["Lead"] },
    },
  },
  cta_click: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true },
      meta: { enabled: true, events: ["ViewContent"] },
    },
  },
  faq_open: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true },
      meta: { enabled: true, events: ["ViewContent"] },
    },
  },
  scroll_depth: {
    category: "behavior",
    platforms: {
      ga4: { enabled: true },
      meta: { enabled: false }, // Não relevante para ads
    },
  },
  section_view: {
    category: "behavior",
    platforms: {
      ga4: { enabled: true },
      meta: { enabled: false }, // Pode habilitar para remarketing granular
    },
  },
};

// ============================================================================
// EXEMPLO 2: E-COMMERCE (loja online)
// ============================================================================

// Use para: Lojas virtuais, marketplaces
export type EcommerceEvents =
  | "view_item"         // Visualizar produto
  | "add_to_cart"       // Adicionar ao carrinho
  | "begin_checkout"    // Iniciar checkout
  | "purchase"          // Compra concluída
  | "search"            // Busca no site
  | "add_to_wishlist";  // Adicionar aos favoritos

export const ECOMMERCE_CONFIG: Record<EcommerceEvents, EventConfig> = {
  view_item: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true, eventName: "view_item" },
      meta: { enabled: true, events: ["ViewContent"] },
    },
  },
  add_to_cart: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true, eventName: "add_to_cart" },
      meta: { enabled: true, events: ["AddToCart"] },
    },
  },
  begin_checkout: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true, eventName: "begin_checkout" },
      meta: { enabled: true, events: ["InitiateCheckout"] },
    },
  },
  purchase: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true, eventName: "purchase" },
      meta: { enabled: true, events: ["Purchase"] },
    },
  },
  search: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true, eventName: "search" },
      meta: { enabled: true, events: ["Search"] },
    },
  },
  add_to_wishlist: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true, eventName: "add_to_wishlist" },
      meta: { enabled: true, events: ["AddToWishlist"] },
    },
  },
};

// ============================================================================
// EXEMPLO 3: SaaS (software como serviço)
// ============================================================================

// Use para: Apps web, plataformas SaaS, dashboards
export type SaaSEvents =
  | "signup"            // Cadastro completado
  | "trial_start"       // Início de trial
  | "upgrade"           // Upgrade de plano
  | "feature_use"       // Uso de feature
  | "invite_sent"       // Convite enviado
  | "onboarding_complete"; // Onboarding concluído

export const SAAS_CONFIG: Record<SaaSEvents, EventConfig> = {
  signup: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true, eventName: "sign_up" },
      meta: { enabled: true, events: ["CompleteRegistration"] },
    },
  },
  trial_start: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true, eventName: "trial_start" },
      meta: { enabled: true, events: ["StartTrial"] },
    },
  },
  upgrade: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true, eventName: "purchase" },
      meta: { enabled: true, events: ["Purchase"] },
    },
  },
  feature_use: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true, eventName: "feature_use" },
      meta: { enabled: false }, // Análise interna, não ads
    },
  },
  invite_sent: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true, eventName: "share" },
      meta: { enabled: false },
    },
  },
  onboarding_complete: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true, eventName: "tutorial_complete" },
      meta: { enabled: true, events: ["ViewContent"] },
    },
  },
};

// ============================================================================
// EXEMPLO 4: BLOG / CONTEÚDO
// ============================================================================

// Use para: Blogs, portais de notícias, sites de conteúdo
export type BlogEvents =
  | "article_read"      // Artigo lido (scroll 75%+)
  | "newsletter_signup" // Cadastro newsletter
  | "comment_post"      // Comentário publicado
  | "share"             // Compartilhamento
  | "download"          // Download de material
  | "video_watch";      // Vídeo assistido

export const BLOG_CONFIG: Record<BlogEvents, EventConfig> = {
  article_read: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true, eventName: "article_read" },
      meta: { enabled: true, events: ["ViewContent"] },
    },
  },
  newsletter_signup: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true, eventName: "sign_up" },
      meta: { enabled: true, events: ["Lead"] },
    },
  },
  comment_post: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true, eventName: "comment" },
      meta: { enabled: false },
    },
  },
  share: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true, eventName: "share" },
      meta: { enabled: false },
    },
  },
  download: {
    category: "conversion",
    platforms: {
      ga4: { enabled: true, eventName: "file_download" },
      meta: { enabled: true, events: ["Lead"] },
    },
  },
  video_watch: {
    category: "engagement",
    platforms: {
      ga4: { enabled: true, eventName: "video_complete" },
      meta: { enabled: true, events: ["ViewContent"] },
    },
  },
};

// ============================================================================
// DICAS DE CONFIGURAÇÃO
// ============================================================================

/**
 * Meta Pixel: Eventos Standard vs. Custom
 *
 * Standard (priorize, Meta otimiza melhor):
 * - Lead
 * - Purchase
 * - AddToCart
 * - ViewContent
 * - CompleteRegistration
 * - InitiateCheckout
 * - Search
 * - AddToWishlist
 * - StartTrial
 *
 * Custom (quando não tem equivalente standard):
 * - WhatsAppClick
 * - ScheduleClick
 * - FormSubmit (se não for signup)
 *
 * Regra: Se existe evento standard equivalente, USE ELE.
 */

/**
 * Categorias de eventos:
 *
 * - "conversion": Ações que geram valor direto (compra, cadastro, lead)
 * - "engagement": Ações de interesse/interação (view, click, share)
 * - "behavior": Análise de comportamento (scroll, tempo, navegação)
 *
 * Use para organizar relatórios no GA4.
 */

/**
 * Quando habilitar Meta Pixel:
 *
 * ✅ Sempre habilite:
 * - Conversões principais (Lead, Purchase, etc.)
 * - Engajamento que indica interesse (ViewContent em produto/serviço)
 *
 * ❌ Não habilite:
 * - Eventos muito frequentes (scroll, mouse_move)
 * - Eventos de análise interna (feature_use, error)
 * - Eventos não relacionados a ads (comment, like)
 *
 * Regra: Se não vai usar para otimizar/segmentar ads, não envie para Meta.
 */

/**
 * Parâmetros importantes:
 *
 * E-commerce:
 * - value: número (valor da transação)
 * - currency: "BRL" | "USD" | etc.
 * - content_ids: ["produto-123"]
 * - content_type: "product"
 *
 * SaaS:
 * - value: número (valor do plano)
 * - predicted_ltv: número (lifetime value estimado)
 * - trial_days: número
 *
 * Landing page:
 * - location: string (onde clicou)
 * - cta_text: string (texto do botão)
 *
 * Use parâmetros para segmentar audiências no Meta Ads Manager.
 */
