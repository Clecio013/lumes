/**
 * Core Tracker
 *
 * Lógica central de tracking - orquestra adapters e logging
 */

import type {
  TrackEventParams,
  TrackedEvent,
  TrackingResult,
  AnalyticsAdapter,
} from "./types";
import { getEventConfig } from "../config/events";
import { metaPixelAdapter, googleAnalyticsAdapter } from "../adapters";
import { logEvent, logError, logWarning } from "../adapters/logger";

// ============================================================================
// REGISTRY DE ADAPTERS
// ============================================================================

const adapters: AnalyticsAdapter[] = [
  googleAnalyticsAdapter,
  metaPixelAdapter,
];

/**
 * Obtém todos os adapters ativos
 */
export function getActiveAdapters(): AnalyticsAdapter[] {
  return adapters.filter((adapter) => adapter.isAvailable());
}

/**
 * Obtém nomes das plataformas ativas
 */
export function getActivePlatforms(): string[] {
  return getActiveAdapters().map((adapter) => adapter.name);
}

// ============================================================================
// TRACK EVENT - Função principal
// ============================================================================

/**
 * Rastreia um evento
 *
 * Esta é a função central - orquestra todo o fluxo:
 * 1. Valida o evento
 * 2. Cria TrackedEvent
 * 3. Envia para cada adapter configurado
 * 4. Loga resultados (apenas em dev)
 */
export function trackEvent(params: TrackEventParams): TrackingResult {
  const { name, category: customCategory, ...eventParams } = params;

  // Validação: evento está configurado?
  const config = getEventConfig(name);
  if (!config) {
    const error = `Evento "${name}" não está configurado`;
    logError(name, error);
    throw new Error(error);
  }

  // Criar TrackedEvent
  const event: TrackedEvent = {
    name,
    category: customCategory || config.category,
    params: eventParams,
    timestamp: Date.now(),
  };

  // Enviar para cada adapter
  const results = adapters
    .map((adapter) => {
      try {
        // Só tenta enviar se o adapter está disponível
        if (!adapter.isAvailable()) {
          return {
            sent: false,
            platform: adapter.name,
            error: "Plataforma não disponível",
          };
        }

        return adapter.send(event);
      } catch (error) {
        return {
          sent: false,
          platform: adapter.name,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        };
      }
    })
    .filter((result) => {
      // Filtra plataformas que não deveriam receber este evento
      const platformConfig = config.platforms[result.platform as "ga4" | "meta"];
      return platformConfig?.enabled ?? false;
    });

  const trackingResult: TrackingResult = {
    event,
    results,
  };

  // Log (apenas em desenvolvimento)
  logEvent(trackingResult);

  // Warning se nenhum adapter enviou
  if (!results.some((r) => r.sent)) {
    logWarning(
      `Evento "${name}" não foi enviado para nenhuma plataforma`
    );
  }

  return trackingResult;
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Verifica se uma plataforma específica está ativa
 */
export function isPlatformActive(platform: string): boolean {
  return getActivePlatforms().includes(platform);
}

/**
 * Obtém estatísticas do tracker
 */
export function getTrackerStats() {
  return {
    totalAdapters: adapters.length,
    activeAdapters: getActiveAdapters().length,
    activePlatforms: getActivePlatforms(),
  };
}
