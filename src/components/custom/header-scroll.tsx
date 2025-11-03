"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalyticsButton } from "@/components/analytics";
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
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-card/20 backdrop-blur-xl border-b border-border shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/brand/logo-terracota.png"
                alt="Seyune"
                width={110}
                height={44}
                className="h-11 w-auto"
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
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer px-6 py-3 text-base font-semibold flex-shrink-0"
              trackingLocation="header"
              trackingLabel="Agende sua consulta"
              trackingType="schedule"
              onClick={() => window.open(whatsappUrl || siteConfig.whatsapp.url, "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Agende sua consulta
            </AnalyticsButton>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
