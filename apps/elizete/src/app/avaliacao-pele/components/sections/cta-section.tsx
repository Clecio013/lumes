"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { siteConfig, formatPrice } from "@/config/site";

export function CTASection() {
  return (
    <LazyMotion features={domAnimation}>
      <section data-section="cta" className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Copy */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[var(--tangerine)] font-medium mb-4 uppercase tracking-widest text-sm">
                Inscreva-se
              </p>
              <h2 className="font-display text-3xl lg:text-5xl text-foreground leading-tight mb-6">
                Pare de copiar.
                <span className="block text-[var(--tangerine)]">Comece a dominar.</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-8">
                Você está a um passo de dominar a avaliação de pele com raciocínio clínico.
                Entenda o porquê, crie o como.
              </p>

              {/* Benefits list */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--tangerine)]" />
                  <span className="text-foreground">Acesso vitalício ao conteúdo</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--tangerine)]" />
                  <span className="text-foreground">{siteConfig.course.guarantee} dias de garantia incondicional</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--tangerine)]" />
                  <span className="text-foreground">Certificado de conclusão</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--tangerine)]" />
                  <span className="text-foreground">Suporte para dúvidas</span>
                </li>
              </ul>
            </m.div>

            {/* Right - Price Card */}
            <m.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-[var(--sacramento)] p-8 lg:p-12">
                <p className="text-white/60 text-sm uppercase tracking-widest mb-4">
                  Investimento
                </p>

                {siteConfig.course.originalPrice && (
                  <p className="text-white/50 line-through text-xl mb-2">
                    De {formatPrice(siteConfig.course.originalPrice)}
                  </p>
                )}

                <div className="mb-6">
                  <span className="font-display text-6xl lg:text-7xl text-white">
                    {formatPrice(siteConfig.course.price)}
                  </span>
                  <p className="text-white/60 mt-2">
                    ou 12x de {formatPrice(siteConfig.course.price / 12)}
                  </p>
                </div>

                <button
                  onClick={() => window.open(siteConfig.course.checkoutUrl, "_blank")}
                  className="w-full bg-[var(--tangerine)] text-white py-5 px-8 text-lg font-medium hover:bg-[var(--tangerine)]/90 transition-colors group flex items-center justify-center gap-3"
                >
                  Quero Dominar a Avaliação de Pele
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--salmon)] flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Garantia de {siteConfig.course.guarantee} dias</p>
                      <p className="text-white/60 text-sm">
                        Se não gostar, devolvemos 100% do seu investimento.
                        Sem perguntas, sem burocracia.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
