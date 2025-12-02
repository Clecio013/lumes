"use client";

import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { siteConfig, formatPrice } from "@/config/site";

export function HeroSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section data-section="hero" className="relative min-h-screen bg-[var(--sacramento)]">
        {/* Layout grid para desktop */}
        <div className="min-h-screen lg:grid lg:grid-cols-2">
          {/* Coluna esquerda - Conteúdo */}
          <div className="relative z-10 flex flex-col min-h-screen lg:min-h-0">
            {/* Header */}
            <header className="px-6 lg:px-12 py-6">
              <m.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/brand/logo.png"
                  alt="Elizete Garcia"
                  width={140}
                  height={56}
                  className="h-14 w-auto"
                  style={{ width: 'auto' }}
                  priority
                />
              </m.div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex items-center px-6 lg:px-12 pb-24 lg:pb-12">
              <div className="max-w-xl">
                {/* Tag */}
                <m.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-6"
                >
                  <span className="inline-block px-4 py-2 bg-[var(--tangerine)] text-white text-sm font-medium tracking-wide uppercase">
                    Curso Online
                  </span>
                </m.div>

                {/* Headline */}
                <m.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white leading-[1.1] mb-6"
                >
                  Avaliação de Pele
                  <span className="block text-[var(--salmon)]">
                    com Raciocínio Clínico
                  </span>
                </m.h1>

                {/* Descrição */}
                <m.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg lg:text-xl text-white/80 leading-relaxed mb-8"
                >
                  O método que transforma profissionais de estética em especialistas
                  capazes de criar protocolos personalizados com autonomia e segurança.
                </m.p>

                {/* Stats */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-6 lg:gap-8 mb-10"
                >
                  <div className="border-l-2 border-[var(--tangerine)] pl-4">
                    <p className="font-display text-3xl lg:text-4xl text-white">49</p>
                    <p className="text-white/60 text-sm">anos de experiência</p>
                  </div>
                  <div className="border-l-2 border-[var(--salmon)] pl-4">
                    <p className="font-display text-3xl lg:text-4xl text-white">4</p>
                    <p className="text-white/60 text-sm">módulos completos</p>
                  </div>
                  <div className="border-l-2 border-white/30 pl-4">
                    <p className="font-display text-3xl lg:text-4xl text-white">15</p>
                    <p className="text-white/60 text-sm">aulas práticas</p>
                  </div>
                </m.div>

                {/* CTA */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                  <button
                    onClick={() => window.open(siteConfig.course.checkoutUrl, "_blank")}
                    className="group relative overflow-hidden bg-[var(--tangerine)] text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-[var(--tangerine)]/90"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Inscreva-se agora
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>

                  <div className="text-white/80">
                    <span className="text-sm line-through text-white/50 block">De R$ 197</span>
                    <span className="text-2xl font-display">{formatPrice(siteConfig.course.price)}</span>
                  </div>
                </m.div>
              </div>
            </div>

            {/* Scroll indicator - mobile only */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:hidden"
            >
              <m.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 text-white/60"
              >
                <span className="text-xs uppercase tracking-widest">Saiba mais</span>
                <ArrowDown className="w-4 h-4" />
              </m.div>
            </m.div>
          </div>

          {/* Coluna direita - Imagem (desktop) */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0">
              <Image
                src="/images/hero/elizete.jpg"
                alt="Elizete Garcia"
                fill
                className="object-cover object-top"
                priority
                sizes="50vw"
              />
            </div>
          </m.div>
        </div>

        {/* Background mobile com imagem */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/images/hero/elizete.jpg"
            alt="Elizete Garcia"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          {/* Gradiente apenas na área do texto para legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
      </section>
    </LazyMotion>
  );
}
