/**
 * Meta Pixel Adapter
 *
 * Funções puras para enviar eventos para o Meta Pixel
 */

import type { TrackedEvent, AdapterResult, AnalyticsAdapter } from "../core/types";
import { getEventConfig } from "../config/events";
import { getUTMs } from "@lumes/analytics/utm";

// Tipos do Meta Pixel
declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
  }
}

/**
 * Verifica se o Meta Pixel está disponível
 */
export function isMetaPixelAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

/**
 * Envia evento para o Meta Pixel
 */
export function sendToMetaPixel(event: TrackedEvent): AdapterResult {
  const result: AdapterResult = {
    sent: false,
    platform: "meta",
  };

  // Verifica se fbq está disponível
  if (!isMetaPixelAvailable()) {
    result.error = "Meta Pixel (fbq) não disponível";
    return result;
  }

  const config = getEventConfig(event.name);
  if (!config?.platforms.meta?.enabled) {
    result.error = "Evento não configurado para Meta Pixel";
    return result;
  }

  try {
    const metaConfig = config.platforms.meta;
    const events = metaConfig.events || [];

    // Meta Pixel pode ter múltiplos eventos para um único track
    // Ex: whatsapp_click = WhatsAppClick (custom) + Lead (standard)
    if (events.length === 0) {
      result.error = "Nenhum evento Meta configurado";
      return result;
    }

    // Incluir UTMs automaticamente (se disponíveis)
    const utms = getUTMs();
    const utmParams = utms
      ? {
          utm_source: utms.source,
          utm_medium: utms.medium,
          utm_campaign: utms.campaign,
          utm_content: utms.content,
          utm_term: utms.term,
        }
      : {};

    // Preparar parâmetros (UTMs + config + event params)
    const params = {
      ...utmParams,
      ...metaConfig.params,
      ...event.params,
    };

    // Enviar para cada evento configurado
    events.forEach((metaEvent) => {
      if (metaEvent === "WhatsAppClick") {
        // Custom event
        window.fbq!("trackCustom", "WhatsAppClick", params);
      } else {
        // Standard events (Lead, ViewContent, etc)
        window.fbq!("track", metaEvent, params);
      }
    });

    result.sent = true;
  } catch (error) {
    result.error = error instanceof Error ? error.message : "Erro desconhecido";
  }

  return result;
}

/**
 * Adapter completo do Meta Pixel
 */
export const metaPixelAdapter: AnalyticsAdapter = {
  name: "meta",
  send: sendToMetaPixel,
  isAvailable: isMetaPixelAvailable,
};
