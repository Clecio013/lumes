"use client";

import { useEffect, useRef } from "react";
import { useTracking } from "@/hooks/useTracking";

export function ScrollTracker() {
  const { trackScrollDepth, trackSectionView } = useTracking();
  const scrollDepthTracked = useRef<Set<number>>(new Set());
  const sectionsTracked = useRef<Set<string>>(new Set());
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Scroll depth tracking
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !scrollDepthTracked.current.has(milestone)) {
          scrollDepthTracked.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    // Throttled scroll handler - executa no máximo a cada 200ms
    const throttledHandleScroll = () => {
      if (throttleTimeout.current) return;

      throttleTimeout.current = setTimeout(() => {
        handleScroll();
        throttleTimeout.current = null;
      }, 200);
    };

    // Section view tracking using Intersection Observer
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute("data-section");
            if (sectionName && !sectionsTracked.current.has(sectionName)) {
              sectionsTracked.current.add(sectionName);
              trackSectionView(sectionName);
            }
          }
        });
      },
      {
        threshold: 0.5, // Section is considered "viewed" when 50% is visible
        rootMargin: "0px",
      }
    );

    // Observe all sections with data-section attribute
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => sectionObserver.observe(section));

    // Add throttled scroll listener
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      sectionObserver.disconnect();
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [trackScrollDepth, trackSectionView]);

  return null; // This component doesn't render anything
}
