/**
 * Event Configuration - Projeto Seyune (Landing Page)
 *
 * ⚠️ ARQUIVO PROJETO-ESPECÍFICO ⚠️
 * Este arquivo precisa ser adaptado para cada projeto.
 *
 * Define:
 * 1. Quais eventos existem no projeto (EventName type)
 * 2. Para quais plataformas cada evento é enviado (EVENT_CONFIG)
 * 3. Parâmetros padrão de cada evento (opcional)
 *
 * 📘 Veja exemplos de outros tipos de projeto em: events.examples.ts
 *    - Landing Page (este arquivo)
 *    - E-commerce
 *    - SaaS
 *    - Blog/Conteúdo
 *
 * 🔧 Como adaptar para novo projeto:
 * 1. Defina seus eventos no type EventName (em core/types.ts)
 * 2. Configure cada evento abaixo no EVENT_CONFIG
 * 3. Decida para quais plataformas enviar (ga4: análise, meta: ads)
 * 4. Rode os testes: pnpm test
 */

import type { EventName, EventConfig } from "../core/types";

export const EVENT_CONFIG: Record<EventName, EventConfig> = {
  // ==========================================================================
  // CONVERSÃO - Eventos críticos para Meta Ads
  // ==========================================================================

  whatsapp_click: {
    category: "conversion",
    platforms: {
      // GA4 - Rastreia tudo
      ga4: {
        enabled: true,
        eventName: "whatsapp_click",
      },
      // Meta - Conversão principal (custom + standard)
      meta: {
        enabled: true,
        events: ["WhatsAppClick", "Lead"], // Custom + Standard
        params: {
          currency: "BRL",
          value: 1,
        },
      },
    },
  },

  schedule_click: {
    category: "conversion",
    platforms: {
      ga4: {
        enabled: true,
        eventName: "schedule_click",
      },
      meta: {
        enabled: true,
        events: ["Lead"], // Standard event
        params: {
          currency: "BRL",
          value: 1,
        },
      },
    },
  },

  // ==========================================================================
  // ENGAJAMENTO - Interesse do usuário
  // ==========================================================================

  cta_click: {
    category: "engagement",
    platforms: {
      ga4: {
        enabled: true,
        eventName: "cta_click",
      },
      // Meta - Não rastreamos CTAs genéricos (evita poluir dados)
      meta: {
        enabled: false,
      },
    },
  },

  faq_open: {
    category: "engagement",
    platforms: {
      ga4: {
        enabled: true,
        eventName: "faq_open",
      },
      // Meta - ViewContent (mostra interesse/objeções)
      meta: {
        enabled: true,
        events: ["ViewContent"],
      },
    },
  },

  faq_close: {
    category: "engagement",
    platforms: {
      ga4: {
        enabled: true,
        eventName: "faq_close",
      },
      // Meta - Não rastreamos close (só open importa)
      meta: {
        enabled: false,
      },
    },
  },

  social_click: {
    category: "engagement",
    platforms: {
      ga4: {
        enabled: true,
        eventName: "social_click",
      },
      meta: {
        enabled: false, // Não relevante para ads
      },
    },
  },

  // ==========================================================================
  // COMPORTAMENTO - Análise de engajamento
  // ==========================================================================

  scroll_depth: {
    category: "behavior",
    platforms: {
      ga4: {
        enabled: true,
        eventName: "scroll_depth",
      },
      meta: {
        enabled: false, // Não relevante para Meta
      },
    },
  },

  section_view: {
    category: "behavior",
    platforms: {
      ga4: {
        enabled: true,
        eventName: "section_view",
      },
      // Meta - Desabilitado (foco em conversões e FAQ apenas)
      meta: {
        enabled: false,
      },
    },
  },

  header_visible: {
    category: "behavior",
    platforms: {
      ga4: {
        enabled: true,
        eventName: "header_visible",
      },
      meta: {
        enabled: false, // Não relevante
      },
    },
  },
};

/**
 * Helper: Obter configuração de um evento
 */
export function getEventConfig(eventName: EventName): EventConfig | null {
  return EVENT_CONFIG[eventName] || null;
}

/**
 * Helper: Verificar se evento deve ser enviado para uma plataforma
 */
export function shouldSendTo(
  eventName: EventName,
  platform: "ga4" | "meta"
): boolean {
  const config = getEventConfig(eventName);
  return config?.platforms[platform]?.enabled ?? false;
}
