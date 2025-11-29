/**
 * useTracking Hook
 *
 * Wrapper React sobre o sistema de analytics
 * Apenas delega para as funções do core tracker
 */

"use client";

import { useCallback } from "react";
import { trackEvent as trackEventCore } from "../core/tracker";
import type { TrackEventParams } from "../core/types";

export function useTracking() {
  /**
   * Função principal de tracking
   */
  const trackEvent = useCallback((params: TrackEventParams) => {
    return trackEventCore(params);
  }, []);

  // ==========================================================================
  // HELPERS - Wrappers para facilitar uso
  // ==========================================================================

  const trackWhatsAppClick = useCallback(
    (location: string) => {
      return trackEvent({
        name: "whatsapp_click",
        location,
        value: 1,
      });
    },
    [trackEvent]
  );

  const trackScheduleClick = useCallback(
    (location: string) => {
      return trackEvent({
        name: "schedule_click",
        location,
        value: 1,
      });
    },
    [trackEvent]
  );

  const trackInitiateCheckout = useCallback(
    (location: string, value?: number) => {
      return trackEvent({
        name: "initiate_checkout",
        location,
        value: value || 397, // Preço padrão Black 45 Graus
      });
    },
    [trackEvent]
  );

  const trackPurchase = useCallback(
    (params: {
      location?: string;
      value: number;
      transaction_id: string;
      email?: string;
    }) => {
      return trackEvent({
        name: "purchase",
        location: params.location || "checkout",
        value: params.value,
        transaction_id: params.transaction_id,
        email: params.email,
      });
    },
    [trackEvent]
  );

  const trackCTAClick = useCallback(
    (
      location: string,
      ctaText: string,
      ctaType: "schedule" | "transformation" | "whatsapp"
    ) => {
      // Detecta se é WhatsApp
      // schedule e whatsapp ambos abrem WhatsApp na Seyune
      if (ctaType === "whatsapp" || ctaType === "schedule") {
        return trackEvent({
          name: "whatsapp_click",
          location,
          cta_text: ctaText,
          cta_type: ctaType,
          value: 1,
        });
      }

      // Outros tipos de CTA
      return trackEvent({
        name: "cta_click",
        location,
        cta_text: ctaText,
        cta_type: ctaType,
        value: 1,
      });
    },
    [trackEvent]
  );

  const trackFAQInteraction = useCallback(
    (question: string, action: "open" | "close") => {
      return trackEvent({
        name: action === "open" ? "faq_open" : "faq_close",
        label: question,
        question_text: question,
      });
    },
    [trackEvent]
  );

  const trackSocialClick = useCallback(
    (platform: string, location: string) => {
      return trackEvent({
        name: "social_click",
        platform,
        location,
        label: `${platform}_${location}`,
      });
    },
    [trackEvent]
  );

  const trackScrollDepth = useCallback(
    (percentage: number) => {
      return trackEvent({
        name: "scroll_depth",
        label: `${percentage}_percent`,
        value: percentage,
        scroll_percentage: percentage,
      });
    },
    [trackEvent]
  );

  const trackSectionView = useCallback(
    (sectionName: string) => {
      return trackEvent({
        name: "section_view",
        label: sectionName,
        section_name: sectionName,
        location: sectionName,
      });
    },
    [trackEvent]
  );

  const trackHeaderVisible = useCallback(() => {
    return trackEvent({
      name: "header_visible",
      label: "sticky_header_shown",
    });
  }, [trackEvent]);

  // Backward compatibility - old function
  const trackAccordionOpen = useCallback(
    (question: string) => {
      return trackFAQInteraction(question, "open");
    },
    [trackFAQInteraction]
  );

  return {
    // Função principal (use esta!)
    trackEvent,

    // Helpers (wrappers para facilitar)
    trackWhatsAppClick,
    trackScheduleClick,
    trackInitiateCheckout,
    trackPurchase,
    trackCTAClick,
    trackFAQInteraction,
    trackSocialClick,
    trackScrollDepth,
    trackSectionView,
    trackHeaderVisible,

    // Backward compatibility
    trackAccordionOpen,
  };
}

// Types são exportados via ../core/types (não re-exportar aqui para evitar conflito)
