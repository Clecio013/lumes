"use client";

import { siteConfig, formatPrice } from "@/config/site";

interface CTABannerProps {
  variant?: "minimal" | "with-price" | "urgent";
  headline?: string;
  subheadline?: string;
}

export function CTABanner({
  variant = "minimal",
  headline,
  subheadline
}: CTABannerProps) {
  if (variant === "minimal") {
    return (
      <div className="py-12 px-6 bg-[var(--chiffon)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-[var(--sacramento)]/80 mb-6">
            {headline || "Pronta para dominar a avaliação de pele?"}
          </p>
          <button
            onClick={() => window.open(siteConfig.course.checkoutUrl, "_blank")}
            className="group inline-flex items-center gap-2 bg-[var(--tangerine)] text-white px-8 py-4 text-lg font-medium hover:bg-[var(--tangerine)]/90 transition-colors"
          >
            Quero me inscrever
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (variant === "with-price") {
    return (
      <div className="py-16 px-6 bg-[var(--sacramento)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <p className="text-[var(--tangerine)] font-medium mb-2 uppercase tracking-widest text-sm">
                Oferta especial
              </p>
              <h3 className="font-display text-2xl lg:text-3xl text-white mb-2">
                {headline || "Comece sua transformação hoje"}
              </h3>
              <p className="text-white/60">
                {subheadline || "Acesso imediato + garantia de 7 dias"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center">
                <span className="text-white/50 line-through text-sm block">
                  De {formatPrice(siteConfig.course.originalPrice || 197)}
                </span>
                <span className="font-display text-4xl text-white">
                  {formatPrice(siteConfig.course.price)}
                </span>
              </div>

              <button
                onClick={() => window.open(siteConfig.course.checkoutUrl, "_blank")}
                className="group flex items-center gap-2 bg-[var(--tangerine)] text-white px-8 py-4 text-lg font-medium hover:bg-[var(--tangerine)]/90 transition-colors whitespace-nowrap"
              >
                Inscreva-se agora
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // variant === "urgent"
  return (
    <div className="py-16 px-6 bg-[var(--tangerine)]">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="font-display text-2xl lg:text-3xl text-white mb-4">
          {headline || "Não espere mais para se diferenciar"}
        </h3>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          {subheadline || "Cada dia sem raciocínio clínico é um dia perdido aplicando receitas de bolo."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => window.open(siteConfig.course.checkoutUrl, "_blank")}
            className="group flex items-center gap-2 bg-white text-[var(--tangerine)] px-8 py-4 text-lg font-medium hover:bg-white/90 transition-colors"
          >
            Quero aprender agora
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <span className="text-white/80 text-sm">
            {formatPrice(siteConfig.course.price)} • Garantia de {siteConfig.course.guarantee} dias
          </span>
        </div>
      </div>
    </div>
  );
}
