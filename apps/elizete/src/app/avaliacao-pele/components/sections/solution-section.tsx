"use client";

import { ScrollReveal } from "@/components/animations";

export function SolutionSection() {
  return (
    <section data-section="solution" className="py-24 lg:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-[var(--tangerine)] font-medium mb-4 uppercase tracking-widest text-sm">
              A solução
            </p>
            <h2 className="font-display text-3xl lg:text-5xl text-foreground leading-tight max-w-3xl mx-auto">
              Raciocínio Clínico:
              <span className="block text-[var(--tangerine)]">
                a diferença entre copiar e dominar
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Main content - split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Quote */}
          <ScrollReveal>
            <div className="relative">
              {/* Aspas decorativas */}
              <span className="absolute -top-10 -left-4 font-display text-[150px] text-[var(--tangerine)]/10 leading-none select-none">
                &ldquo;
              </span>

              <blockquote className="relative z-10">
                <p className="font-display text-2xl lg:text-3xl text-foreground leading-relaxed mb-6">
                  Não importa o curso ou treinamento que você faça, você precisa da metodologia
                  de raciocínio clínico por trás.
                </p>
                <p className="text-lg text-muted-foreground">
                  Assim, você vai pegar <em>um</em> conhecimento e gerar
                  <strong className="text-[var(--tangerine)]"> múltiplos resultados</strong> com o seu trabalho.
                </p>
              </blockquote>
            </div>
          </ScrollReveal>

          {/* Right - Benefits list */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-[var(--tangerine)] flex items-center justify-center shrink-0">
                  <span className="text-white font-display text-xl">1</span>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-1">Pensar, não decorar</h3>
                  <p className="text-muted-foreground">Entenda a causa por trás de cada disfunção da pele.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-[var(--salmon)] flex items-center justify-center shrink-0">
                  <span className="text-white font-display text-xl">2</span>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-1">Protocolos únicos</h3>
                  <p className="text-muted-foreground">Crie tratamentos personalizados com base em ciência.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-[var(--secondary)] flex items-center justify-center shrink-0">
                  <span className="text-white font-display text-xl">3</span>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-1">Segurança total</h3>
                  <p className="text-muted-foreground">Justifique cada escolha com embasamento técnico.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-foreground flex items-center justify-center shrink-0">
                  <span className="text-white font-display text-xl">4</span>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-1">Referência no mercado</h3>
                  <p className="text-muted-foreground">Destaque-se da concorrência de forma permanente.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom highlight */}
        <ScrollReveal delay={0.3}>
          <div className="bg-[var(--chiffon)] p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-muted-foreground mb-2">O resultado?</p>
                <p className="font-display text-2xl lg:text-3xl text-foreground">
                  Autonomia para dominar <span className="text-[var(--tangerine)]">qualquer pele</span>,
                  <span className="block">qualquer protocolo.</span>
                </p>
              </div>
              <div className="section-divider lg:hidden" />
              <div className="hidden lg:block w-px h-20 bg-border" />
              <div className="text-center lg:text-right">
                <p className="font-display text-5xl text-[var(--tangerine)]">49</p>
                <p className="text-muted-foreground">anos de experiência<br />condensados em método</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
