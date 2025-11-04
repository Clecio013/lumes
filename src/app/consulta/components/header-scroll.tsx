"use client";

import { useState, useEffect, useRef } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { AnalyticsButton } from "@/lib/analytics";
import { useTracking } from "@/hooks/useTracking";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

interface HeaderScrollProps {
  whatsappUrl?: string;
}

export function HeaderScroll({ whatsappUrl }: HeaderScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { trackHeaderVisible } = useTracking();
  const hasTrackedVisibility = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar header após scroll de 300px
      if (window.scrollY > 300) {
        if (!isVisible) {
          setIsVisible(true);
          // Track header visibility only once
          if (!hasTrackedVisibility.current) {
            trackHeaderVisible();
            hasTrackedVisibility.current = true;
          }
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, trackHeaderVisible]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isVisible && (
          <m.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-card/20 backdrop-blur-xl border-b border-border shadow-lg"
          >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/brand/logo-terracota.png"
                alt="Seyune"
                width={110}
                height={44}
                className="h-8 sm:h-10 md:h-11 w-auto"
                style={{ width: 'auto' }}
              />
            </div>

            {/* Frase no meio */}
            <div className="hidden md:block flex-grow text-center">
              <p className="font-heading font-bold text-foreground" style={{ fontSize: "18px" }}>
                Corpo saudável. Mente livre.
              </p>
            </div>

            {/* CTA Button */}
            <AnalyticsButton
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold flex-shrink-0"
              trackingLocation="header"
              trackingLabel="Agende sua consulta"
              trackingType="schedule"
              onClick={() => window.open(whatsappUrl || siteConfig.whatsapp.url, "_blank")}
            >
              <MessageCircle className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="whitespace-nowrap">Agende sua consulta</span>
            </AnalyticsButton>
          </div>
          </m.header>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
