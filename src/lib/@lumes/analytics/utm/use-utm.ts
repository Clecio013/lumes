/**
 * @lumes/analytics - useUTM Hook
 *
 * React hook para acessar UTMs
 */

'use client';

import { useState, useEffect } from 'react';
import type { UTMParams } from './types';
import { getUTMs } from './utm-capture';

export interface UseUTMResult {
  utms: UTMParams | null;
  hasUTMs: boolean;
  isLoading: boolean;
}

/**
 * Hook para acessar UTMs capturados
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { utms, hasUTMs } = useUTM();
 *
 *   if (hasUTMs) {
 *     console.log('Campaign:', utms.campaign);
 *   }
 * }
 * ```
 */
export function useUTM(): UseUTMResult {
  const [utms, setUTMs] = useState<UTMParams | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Client-side apenas
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    try {
      const capturedUTMs = getUTMs();
      setUTMs(capturedUTMs);
    } catch (error) {
      console.warn('[useUTM] Erro ao obter UTMs:', error);
      setUTMs(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    utms,
    hasUTMs: utms !== null && Object.values(utms).some((v) => v !== null),
    isLoading,
  };
}
