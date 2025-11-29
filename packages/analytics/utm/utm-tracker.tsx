/**
 * @lumes/analytics - UTM Tracker Component
 *
 * Componente que auto-captura UTMs ao montar
 */

'use client';

import { useEffect } from 'react';
import { captureAndSaveUTMs } from './utm-capture';
import type { UTMConfig } from './types';

export interface UTMTrackerProps {
  config?: UTMConfig;
  debug?: boolean;
}

/**
 * Componente auto-tracker de UTMs
 *
 * Adicionar no layout raiz para captura automática
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <UTMTracker />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function UTMTracker({ config, debug = false }: UTMTrackerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = captureAndSaveUTMs(config);

    if (debug) {
      if (saved) {
        console.log('[UTM Tracker] UTMs capturados e salvos');
      } else {
        console.log('[UTM Tracker] Nenhum UTM novo para salvar');
      }
    }
  }, [config, debug]);

  return null; // Componente invisible
}
