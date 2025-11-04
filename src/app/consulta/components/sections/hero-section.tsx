"use client";

// Client Component - Hero Section com LazyMotion (micro-interações otimizadas)
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnalyticsButton } from "@/lib/analytics";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section data-section="hero" className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-linear-to-b from-background to-card">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Logo */}
            <div className="mb-8">
              <Image
                src="/brand/logotipo-terracota.png"
                alt="Seyune"
                width={240}
                height={96}
                className="h-24 w-auto"
                style={{ width: 'auto' }}
                priority
                sizes="240px"
              />
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-heading text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Você está cansada de viver para comer certo?
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground font-body leading-relaxed">
                É hora de parar o ciclo de dietas que começam com esperança e
                terminam em culpa. Descubra como transformar sua relação com a
                comida através da nutrição comportamental. <strong> Sem restrições
                severas, sem promessas vazias.</strong>
              </p>
            </div>

            {/* CTA */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <AnalyticsButton
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                trackingLocation="hero"
                trackingLabel="Agende sua consulta"
                trackingType="schedule"
                onClick={() => window.open(siteConfig.whatsapp.url, "_blank")}
              >
                Agende sua consulta
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </AnalyticsButton>
            </m.div>

            {/* Social Proof Micro */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Sparkles className="h-5 w-5 text-accent" />
              <span>Junte-se a dezenas de mulheres transformando suas vidas</span>
            </m.div>

            {/* Mobile Image - Compacta */}
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative lg:hidden mt-8 max-w-[280px] mx-auto"
            >
              <div className="relative w-full aspect-3/4 rounded-2xl overflow-visible">
                <Image
                  src="/images/hero/seyune-gradient.png"
                  alt="Seyune - Nutricionista Comportamental"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="280px"
                />
              </div>

              {/* Badge Mobile 1 - Bottom */}
              <m.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -left-3 bg-card rounded-xl p-3 shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-heading font-semibold text-sm">
                    +10kg
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-xs">Massa Magra</p>
                    <p className="text-[10px] text-muted-foreground">Transformação</p>
                  </div>
                </div>
              </m.div>

              {/* Badge Mobile 2 - Bottom Right */}
              <m.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-16 -right-3 bg-card rounded-xl p-3 shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading font-semibold text-sm">
                    0%
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-xs">Sem Restrição</p>
                    <p className="text-[10px] text-muted-foreground">Liberdade</p>
                  </div>
                </div>
              </m.div>

              {/* Badge Mobile 3 - Middle Left */}
              <m.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -translate-y-1/2 -left-4 bg-card rounded-xl p-3 shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-heading font-semibold text-sm">
                    100%
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-xs">Sem Culpa</p>
                    <p className="text-[10px] text-muted-foreground">Relação saudável</p>
                  </div>
                </div>
              </m.div>
            </m.div>
          </m.div>

          {/* Image/Visual Desktop */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative hidden lg:flex justify-end items-end"
          >
            <div className="relative aspect-3/4 h-screen max-h-[650px] w-auto">
              <Image
                src="/images/hero/seyune-gradient.png"
                alt="Seyune - Nutricionista Comportamental"
                width={560}
                height={750}
                className="w-full h-full object-contain object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>

            {/* Floating element 1 - Bottom Left */}
            <m.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-card rounded-xl p-4 shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-heading font-semibold text-base">
                  +10kg
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Massa Magra</p>
                  <p className="text-xs text-muted-foreground">Transformação real</p>
                </div>
              </div>
            </m.div>

            {/* Floating element 2 - Top Right */}
            <m.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-16 -right-4 bg-card rounded-xl p-4 shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-heading font-semibold text-base">
                  0%
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Sem Restrição</p>
                  <p className="text-xs text-muted-foreground">Liberdade alimentar</p>
                </div>
              </div>
            </m.div>

            {/* Floating element 3 - Middle Left */}
            <m.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -translate-y-1/2 -left-6 bg-card rounded-xl p-4 shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-heading font-semibold text-base">
                  100%
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Sem Culpa</p>
                  <p className="text-xs text-muted-foreground">Relação saudável</p>
                </div>
              </div>
            </m.div>
          </m.div>
        </div>

        {/* Scroll indicator */}
        <m.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full p-1">
            <m.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-muted-foreground rounded-full mx-auto"
            />
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
