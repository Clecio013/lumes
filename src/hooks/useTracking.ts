"use client";

import { useCallback } from "react";

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export interface TrackEventParams {
  category: string;
  action: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

export function useTracking() {
  const trackEvent = useCallback((params: TrackEventParams) => {
    const { category, action, label, value } = params;

    // Google Analytics 4
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    // Google Tag Manager (DataLayer)
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: action,
        category: category,
        label: label,
        value: value,
      });
    }

    // Meta Pixel
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_category: category,
        content_name: label,
      });
    }
  }, []);

  const trackWhatsAppClick = useCallback(
    (location: string) => {
      trackEvent({
        category: "engagement",
        action: "whatsapp_click",
        label: location,
        value: 1,
      });
    },
    [trackEvent]
  );

  const trackScheduleClick = useCallback(
    (location: string) => {
      trackEvent({
        category: "conversion",
        action: "schedule_consultation",
        label: location,
        value: 1,
      });
    },
    [trackEvent]
  );

  const trackAccordionOpen = useCallback(
    (question: string) => {
      trackEvent({
        category: "engagement",
        action: "faq_open",
        label: question,
      });
    },
    [trackEvent]
  );

  const trackCTAClick = useCallback(
    (location: string, ctaText: string, ctaType: "schedule" | "transformation" | "whatsapp") => {
      const category = ctaType === "schedule" ? "conversion" : "engagement";
      const action = "cta_click";

      trackEvent({
        category,
        action,
        label: `${location}_${ctaType}`,
        value: 1,
        cta_text: ctaText,
        cta_location: location,
        cta_type: ctaType,
      });

      // Meta Pixel - Lead event for conversion CTAs
      if (typeof window !== "undefined" && window.fbq && ctaType === "schedule") {
        window.fbq("track", "Lead", {
          content_name: ctaText,
          content_category: location,
        });
      }

      // Meta Pixel - Contact event for WhatsApp CTAs
      if (typeof window !== "undefined" && window.fbq && ctaType === "whatsapp") {
        window.fbq("trackCustom", "WhatsAppClick", {
          location: location,
          cta_text: ctaText,
        });
      }
    },
    [trackEvent]
  );

  const trackFAQInteraction = useCallback(
    (question: string, action: "open" | "close") => {
      trackEvent({
        category: "engagement",
        action: `faq_${action}`,
        label: question,
        question_text: question,
      });

      // Meta Pixel - ViewContent for FAQ opens
      if (typeof window !== "undefined" && window.fbq && action === "open") {
        window.fbq("track", "ViewContent", {
          content_name: question,
          content_category: "FAQ",
        });
      }
    },
    [trackEvent]
  );

  const trackSocialClick = useCallback(
    (platform: string, location: string) => {
      trackEvent({
        category: "engagement",
        action: "social_click",
        label: `${platform}_${location}`,
        platform,
        location,
      });
    },
    [trackEvent]
  );

  const trackScrollDepth = useCallback(
    (percentage: number) => {
      trackEvent({
        category: "behavior",
        action: "scroll_depth",
        label: `${percentage}_percent`,
        value: percentage,
        scroll_percentage: percentage,
      });
    },
    [trackEvent]
  );

  const trackSectionView = useCallback(
    (sectionName: string) => {
      trackEvent({
        category: "behavior",
        action: "section_view",
        label: sectionName,
        section_name: sectionName,
      });

      // Meta Pixel - ViewContent for important sections
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "ViewContent", {
          content_name: sectionName,
          content_category: "Section",
        });
      }
    },
    [trackEvent]
  );

  const trackHeaderVisible = useCallback(() => {
    trackEvent({
      category: "behavior",
      action: "header_visible",
      label: "sticky_header_shown",
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackWhatsAppClick,
    trackScheduleClick,
    trackAccordionOpen,
    trackCTAClick,
    trackFAQInteraction,
    trackSocialClick,
    trackScrollDepth,
    trackSectionView,
    trackHeaderVisible,
  };
}
