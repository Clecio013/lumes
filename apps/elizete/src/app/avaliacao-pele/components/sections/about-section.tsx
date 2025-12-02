"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations";

export function AboutSection() {
  return (
    <section data-section="about" className="py-24 lg:py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Foto com overlay decorativo */}
          <ScrollReveal>
            <div className="relative">
              {/* Elemento decorativo atrás */}
              <div className="absolute -top-8 -left-8 w-full h-full bg-[var(--tangerine)]/10" />

              {/* Imagem principal */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/about/profile.jpg"
                  alt="Elizete Garcia"
                  fill
                  className="object-cover object-top"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Badge sobreposto */}
              <div className="absolute -bottom-6 -right-6 bg-[var(--tangerine)] text-white p-6">
                <p className="font-display text-5xl mb-1">49</p>
                <p className="text-sm uppercase tracking-wide">anos de<br />experiência</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Conteúdo */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-8">
              <div>
                <p className="text-[var(--tangerine)] font-medium mb-4 uppercase tracking-widest text-sm">
                  Sua professora
                </p>
                <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-2">
                  Elizete Garcia
                </h2>
                <p className="text-lg text-muted-foreground">
                  Bióloga • Especialista em Cosmetologia Clínica • Visagismo
                </p>
              </div>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Comecei na estética quando tudo era muito novo. Me formei em Biologia,
                  me especializei em Cosmetologia, e com toda essa bagagem fui
                  <strong className="text-foreground"> pioneira no primeiro curso técnico
                  de estética no Brasil pelo Senac</strong>.
                </p>

                <p>
                  Formei milhares de alunos. Trabalhei 15 anos em clínica de cirurgia plástica.
                  Hoje sou consultora de fábricas de cosméticos, palestrante e mentora.
                </p>

                <p>
                  Eu ensino <strong className="text-[var(--tangerine)]">raciocínio clínico</strong> —
                  como você pode dominar qualquer pele e qualquer protocolo, sem depender de
                  receitas prontas ou modismos do mercado.
                </p>
              </div>

              {/* Credenciais em linha */}
              <div className="pt-8 border-t border-border">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <p className="font-display text-3xl text-[var(--tangerine)]">15</p>
                    <p className="text-sm text-muted-foreground">anos no Senac</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-[var(--tangerine)]">1000+</p>
                    <p className="text-sm text-muted-foreground">alunos formados</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-[var(--tangerine)]">15</p>
                    <p className="text-sm text-muted-foreground">anos em clínica</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-[var(--tangerine)]">2</p>
                    <p className="text-sm text-muted-foreground">pós-graduações</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
