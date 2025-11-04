"use client";

// Client Component - CTA Final Section com Scroll Reveal
import { CheckCircle2, ArrowRight } from "lucide-react";
import { AnalyticsButton } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { ScrollReveal } from "@/components/animations";

export function CTASection() {
  return (
    <section data-section="cta_final" className="py-32 px-6 bg-linear-to-br from-accent/10 via-background to-primary/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <ScrollReveal>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="space-y-8">
          <h2 className="font-heading text-4xl lg:text-6xl font-bold text-foreground">
            Está pronta para começar?
          </h2>

          <div className="space-y-4 text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            <p>Mais um ano vai passar. Você pode continuar no mesmo ciclo de dietas, culpa e frustração...</p>

            <p className="text-2xl font-heading font-semibold text-accent">
              Ou pode escolher um caminho diferente hoje.
            </p>

            <div className="space-y-2 text-lg pt-4">
              <p className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                Conquista o corpo que deseja sem sacrificar sua sanidade
              </p>
              <p className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                Se liberta da culpa e da ansiedade alimentar
              </p>
              <p className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                Constrói uma relação saudável com a comida que dura para sempre
              </p>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <AnalyticsButton
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-full shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group cursor-pointer"
              trackingLocation="cta_final"
              trackingLabel="Agende sua consulta agora"
              trackingType="schedule"
              onClick={() => window.open(siteConfig.whatsapp.url, "_blank")}
            >
              <span className="font-semibold">Agende sua consulta agora</span>
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform shrink-0" />
            </AnalyticsButton>

            <p className="text-sm text-muted-foreground">
              Vagas limitadas. Agenda sujeita a disponibilidade.
            </p>
          </div>

          <div className="pt-8">
            <p className="text-muted-foreground italic">
              A escolha é sua. Mas saiba que eu estou aqui, pronta para te ajudar.
            </p>
          </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
