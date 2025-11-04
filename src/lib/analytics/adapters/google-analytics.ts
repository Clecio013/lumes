/**
 * Google Analytics 4 Adapter
 *
 * Funções puras para enviar eventos para o GA4
 */

import type { TrackedEvent, AdapterResult, AnalyticsAdapter } from "../core/types";
import { getEventConfig } from "../config/events";

// Tipos do Google Analytics
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

/**
 * Verifica se o GA4 está disponível
 */
export function isGA4Available(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/**
 * Envia evento para o Google Analytics 4
 */
export function sendToGA4(event: TrackedEvent): AdapterResult {
  const result: AdapterResult = {
    sent: false,
    platform: "ga4",
  };

  // Verifica se gtag está disponível
  if (!isGA4Available()) {
    result.error = "Google Analytics (gtag) não disponível";
    return result;
  }

  const config = getEventConfig(event.name);
  if (!config?.platforms.ga4?.enabled) {
    result.error = "Evento não configurado para GA4";
    return result;
  }

  try {
    const ga4Config = config.platforms.ga4;
    const eventName = ga4Config.eventName || event.name;

    // Preparar parâmetros GA4
    const params = {
      event_category: event.category,
      event_label: event.params.label || event.params.location,
      value: event.params.value,
      ...ga4Config.params,
      ...event.params,
    };

    // Enviar evento
    window.gtag!("event", eventName, params);

    result.sent = true;
  } catch (error) {
    result.error = error instanceof Error ? error.message : "Erro desconhecido";
  }

  return result;
}

/**
 * Adapter completo do Google Analytics 4
 */
export const googleAnalyticsAdapter: AnalyticsAdapter = {
  name: "ga4",
  send: sendToGA4,
  isAvailable: isGA4Available,
};
