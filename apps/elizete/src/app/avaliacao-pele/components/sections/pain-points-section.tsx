"use client";

import { ScrollReveal } from "@/components/animations";

export function PainPointsSection() {
  const painPoints = [
    {
      number: "01",
      title: "Você segue receitas de bolo",
      description: "Aplica protocolos genéricos sem entender o porquê. Se torna uma executora de passos, não uma especialista.",
    },
    {
      number: "02",
      title: "A concorrência te engole",
      description: "Qualquer um aplica botox hoje. Sem diferenciação, você compete por preço — e sempre perde.",
    },
    {
      number: "03",
      title: "Medo de errar",
      description: "Insegurança ao criar protocolos. Medo de causar manchas. Dificuldade em justificar escolhas.",
    },
    {
      number: "04",
      title: "Estagnação invisível",
      description: "Você estuda, se dedica, compra cursos... mas os resultados não vêm. Parece estar andando em círculos.",
    },
  ];

  return (
    <section data-section="pain-points" className="py-24 lg:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="max-w-3xl mb-16">
            <p className="text-[var(--tangerine)] font-medium mb-4 uppercase tracking-widest text-sm">
              O problema
            </p>
            <h2 className="font-display text-3xl lg:text-5xl text-[var(--sacramento)] leading-tight mb-6">
              Por que tantas profissionais de estética se sentem
              <span className="text-[var(--tangerine)]"> perdidas</span>?
            </h2>
            <div className="w-16 h-0.5 bg-[var(--tangerine)]" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12">
          {painPoints.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="group relative">
                {/* Número grande de fundo */}
                <span className="absolute -top-8 -left-4 font-display text-8xl text-[var(--sacramento)]/5 select-none">
                  {item.number}
                </span>

                <div className="relative">
                  <div className="flex items-start gap-6">
                    {/* Linha vertical */}
                    <div className="hidden sm:block w-px h-full bg-gradient-to-b from-[var(--tangerine)] to-transparent min-h-[100px]" />

                    <div>
                      <h3 className="font-display text-xl lg:text-2xl text-[var(--sacramento)] mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-20 pt-12 border-t border-[var(--sacramento)]/10">
            <p className="text-center text-xl text-[var(--sacramento)]/80 max-w-2xl mx-auto">
              A verdade é que <span className="text-[var(--tangerine)] font-medium">a culpa não é sua</span>.
              O mercado te ensinou a copiar, não a pensar.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
