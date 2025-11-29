/**
 * Analytics Provider
 *
 * ✅ Portável - Copie para qualquer projeto
 *
 * Wrapper que inicializa todos os componentes de analytics:
 * - Google Analytics 4
 * - Meta Pixel
 * - Scroll/Section tracking
 *
 * Componentes internos já verificam se IDs estão configurados,
 * então é seguro usar em qualquer ambiente.
 */

"use client";

import { GoogleAnalytics } from "./GoogleAnalytics";
import { MetaPixel } from "./MetaPixel";
import { ScrollTracker } from "./ScrollTracker";

export function AnalyticsProvider() {
  return (
    <>
      <GoogleAnalytics />
      <MetaPixel />
      <ScrollTracker />
    </>
  );
}
