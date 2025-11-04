"use client";

// Footer Client Component
import Image from "next/image";
import { Instagram } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useTracking } from "@/hooks/useTracking";

export function Footer() {
  const { trackSocialClick } = useTracking();

  return (
    <footer className="bg-foreground text-background py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
          {/* Logo + Copyright Seyune */}
          <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4">
            <Image
              src="/brand/logo-terracota.png"
              alt="Seyune"
              width={100}
              height={40}
              className="h-8 md:h-10 w-auto brightness-0 invert"
              style={{ width: 'auto' }}
              sizes="100px"
            />
            <p className="text-xs md:text-sm text-background/60">
              © {new Date().getFullYear()} Seyune
            </p>
          </div>

          {/* Copyright Lumes Digital - Centro */}
          <p className="text-xs text-background/50 text-center">
            Desenvolvido por{" "}
            <a
              href="https://www.instagram.com/lumesdigital_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-background transition-colors font-semibold"
            >
              Lumes Digital
            </a>
          </p>

          {/* Instagram Seyune - Direita */}
          <div className="flex justify-center md:justify-end">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
              onClick={() => trackSocialClick("instagram", "footer")}
            >
              <Instagram className="w-5 h-5" />
              @seyune
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
