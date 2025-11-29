/**
 * @lumes/analytics - UTM Capture
 *
 * Captura de UTMs da URL query string
 */

import type { UTMParams, UTMConfig } from './types';
import { saveUTMsToCookie, getUTMsFromCookie, hasUTMsCookie } from './utm-storage';

/**
 * Extrai UTMs da URL atual
 *
 * @returns UTM params encontrados (ou objeto vazio)
 */
export function extractUTMsFromURL(): UTMParams {
  if (typeof window === 'undefined') {
    return {}; // SSR
  }

  try {
    const params = new URLSearchParams(window.location.search);

    return {
      source: params.get('utm_source'),
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign'),
      content: params.get('utm_content'),
      term: params.get('utm_term'),
    };
  } catch (error) {
    console.warn('[UTM Capture] Erro ao extrair UTMs da URL:', error);
    return {};
  }
}

/**
 * Verifica se há UTMs presentes na URL
 */
export function hasUTMsInURL(): boolean {
  const utms = extractUTMsFromURL();
  return Object.values(utms).some((value) => value !== null && value !== '');
}

/**
 * Captura e salva UTMs automaticamente
 *
 * Lógica:
 * - Se firstTouch: true → só salva se cookie NÃO existe
 * - Se firstTouch: false → sempre sobrescreve (last-touch)
 *
 * @param config - Configuração
 * @returns true se salvou, false se não havia UTMs ou já existia (firstTouch)
 */
export function captureAndSaveUTMs(config: UTMConfig = {}): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR
  }

  try {
    const utmsInURL = extractUTMsFromURL();
    const hasUTMsParam = Object.values(utmsInURL).some((v) => v !== null);

    if (!hasUTMsParam) {
      return false; // Não há UTMs na URL, nada a fazer
    }

    // First-touch: não sobrescrever se já existe
    const finalConfig = { ...config };
    const isFirstTouch = finalConfig.firstTouch !== false; // default: true

    if (isFirstTouch && hasUTMsCookie(finalConfig.cookieName)) {
      return false; // Já existe, não sobrescrever
    }

    // Salvar
    saveUTMsToCookie(utmsInURL, finalConfig);
    return true;
  } catch (error) {
    console.warn('[UTM Capture] Erro ao capturar UTMs:', error);
    return false;
  }
}

/**
 * Retorna UTMs: cookie OU URL (prioridade: cookie)
 *
 * @returns UTM params (cookie > URL > null)
 */
export function getUTMs(cookieName?: string): UTMParams | null {
  // Tentar cookie primeiro
  const fromCookie = getUTMsFromCookie(cookieName);
  if (fromCookie) return fromCookie;

  // Fallback: UTMs na URL atual
  const fromURL = extractUTMsFromURL();
  const hasUTMs = Object.values(fromURL).some((v) => v !== null);

  return hasUTMs ? fromURL : null;
}
