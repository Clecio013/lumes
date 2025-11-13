/**
 * @lumes/analytics - UTM Storage
 *
 * Gerenciamento de cookies para UTMs (client-side apenas)
 */

import { UTMError } from '../errors';
import type { UTMParams, UTMConfig } from './types';
import { DEFAULT_UTM_CONFIG } from './types';

/**
 * Salva UTMs em cookie
 *
 * @param utms - Parâmetros UTM a salvar
 * @param config - Configuração do cookie
 */
export function saveUTMsToCookie(
  utms: UTMParams,
  config: UTMConfig = {}
): void {
  if (typeof window === 'undefined') {
    throw new UTMError('saveUTMsToCookie só funciona no browser (client-side)');
  }

  try {
    const finalConfig = { ...DEFAULT_UTM_CONFIG, ...config };

    // Serializar UTMs
    const data = JSON.stringify(utms);
    const encodedData = encodeURIComponent(data);

    // Construir cookie string
    const cookieParts = [
      `${finalConfig.cookieName}=${encodedData}`,
      `max-age=${finalConfig.maxAge}`,
      `path=${finalConfig.path}`,
      `SameSite=${finalConfig.sameSite}`,
    ];

    // Secure apenas em HTTPS (prod)
    if (finalConfig.secure && window.location.protocol === 'https:') {
      cookieParts.push('Secure');
    }

    document.cookie = cookieParts.join('; ');
  } catch (error) {
    console.warn('[UTM Storage] Erro ao salvar cookie:', error);
    throw new UTMError('Erro ao salvar UTMs em cookie', error);
  }
}

/**
 * Recupera UTMs do cookie
 *
 * @param config - Config ou nome do cookie (default: seyune_utms)
 * @returns UTM params ou null se não encontrado
 */
export function getUTMsFromCookie(
  config?: UTMConfig | string
): UTMParams | null {
  if (typeof window === 'undefined') {
    return null; // SSR graceful fallback
  }

  const cookieName = typeof config === 'string'
    ? config
    : (config?.cookieName || DEFAULT_UTM_CONFIG.cookieName);

  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${cookieName}=([^;]+)`)
    );

    if (!match) return null;

    const decodedData = decodeURIComponent(match[1]);
    const utms = JSON.parse(decodedData) as UTMParams;

    return utms;
  } catch (error) {
    console.warn('[UTM Storage] Erro ao ler cookie:', error);
    return null; // Falha silenciosa
  }
}

/**
 * Remove cookie de UTMs
 *
 * @param config - Config ou nome do cookie
 */
export function clearUTMsCookie(
  config?: UTMConfig | string
): void {
  if (typeof window === 'undefined') return;

  const cookieName = typeof config === 'string'
    ? config
    : (config?.cookieName || DEFAULT_UTM_CONFIG.cookieName);

  try {
    document.cookie = `${cookieName}=; max-age=0; path=/`;
  } catch (error) {
    console.warn('[UTM Storage] Erro ao limpar cookie:', error);
  }
}

/**
 * Verifica se UTMs existem no cookie
 */
export function hasUTMsCookie(
  config?: UTMConfig | string
): boolean {
  return getUTMsFromCookie(config) !== null;
}
