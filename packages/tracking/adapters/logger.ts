/**
 * Console Logger Adapter
 *
 * Log de eventos para debug em desenvolvimento
 */

import type { AdapterResult, TrackingResult } from "../core/types";

/**
 * Verifica se deve fazer log (apenas em desenvolvimento)
 */
export function shouldLog(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * Formata resultado do adapter para exibição
 */
function formatAdapterResult(result: AdapterResult): string {
  if (result.sent) {
    return `✅ ${result.platform}`;
  }
  return `❌ ${result.platform}: ${result.error}`;
}

/**
 * Formata parâmetros do evento para exibição
 */
function formatParams(params: Record<string, unknown>): string {
  const entries = Object.entries(params);
  if (entries.length === 0) return "";

  return entries
    .map(([key, value]) => `  ${key}: ${JSON.stringify(value)}`)
    .join("\n");
}

/**
 * Loga evento no console (apenas em desenvolvimento)
 */
export function logEvent(result: TrackingResult): void {
  if (!shouldLog()) return;

  const { event, results } = result;

  // Header do log
  console.groupCollapsed(
    `[Analytics] ${event.name}`,
    new Date(event.timestamp).toLocaleTimeString()
  );

  // Resultados de cada plataforma
  console.log("Plataformas:");
  results.forEach((adapterResult) => {
    console.log(`  ${formatAdapterResult(adapterResult)}`);
  });

  // Parâmetros do evento
  if (Object.keys(event.params).length > 0) {
    console.log("\nParâmetros:");
    console.log(formatParams(event.params));
  }

  // Categoria
  console.log(`\nCategoria: ${event.category}`);

  // Objeto completo (para debug avançado)
  console.log("\nDetalhes completos:", { event, results });

  console.groupEnd();
}

/**
 * Loga erro crítico
 */
export function logError(eventName: string, error: string): void {
  if (!shouldLog()) return;

  console.error(`[Analytics Error] ${eventName}:`, error);
}

/**
 * Loga warning
 */
export function logWarning(message: string): void {
  if (!shouldLog()) return;

  console.warn(`[Analytics Warning] ${message}`);
}

/**
 * Loga que o tracking está inicializado
 */
export function logInitialized(availablePlatforms: string[]): void {
  if (!shouldLog()) return;

  console.log(
    `[Analytics] Inicializado com plataformas:`,
    availablePlatforms.join(", ")
  );
}
