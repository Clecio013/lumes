"use client";

// Client Component - Seção Transformação Seyune com Scroll Reveal
import Image from "next/image";
import { ScrollReveal } from "@/components/animations";

export function TransformationSection() {
  return (
    <section data-section="transformacao" className="py-24 px-6 bg-linear-to-b from-background to-card overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Imagem/Visual */}
          <ScrollReveal delay={0.2}>
            <div className="relative order-2 lg:order-1 space-y-6">
            <div className="relative">
              {/* Quote estilo Excalidraw */}
              <div className="relative mb-12">
                <div className="p-6 relative">
                  <p className="font-quote text-2xl text-accent leading-relaxed">
                    &ldquo;Eu criei para mim o que nunca encontrei.&rdquo;
                  </p>
                </div>
              </div>

              {/* Seta desenhada à mão apontando das imagens para a citação */}
              <svg className="absolute w-12 h-20 text-accent/40 z-10 top-[106px] md:top-[75px] left-[15px]" viewBox="0 0 70 120" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M 50 100 Q 20 70, 25 35 Q 30 10, 25 5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 18 12 L 25 3 L 32 12" strokeLinecap="round" strokeLinejoin="miter" fill="none" />
              </svg>
              {/* Fotos antes/depois */}
              <div className="grid grid-cols-2 gap-4">
                {/* Antes */}
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden border border-border shadow-md">
                  <Image
                    src="/images/transformacao/before.jpg"
                    alt="Seyune antes - 45kg"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-background/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-1.5 sm:p-3 text-center">
                    <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-0.5 sm:mb-1">
                      Antes
                    </p>
                    <p className="font-heading text-lg sm:text-2xl font-bold text-primary">
                      45kg
                    </p>
                  </div>
                </div>

                {/* Depois */}
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden border-2 border-accent shadow-xl">
                  <Image
                    src="/images/transformacao/after.jpg"
                    alt="Seyune depois - +10kg massa magra"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-accent/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-1.5 sm:p-3 text-center">
                    <p className="text-xs sm:text-sm font-semibold text-accent-foreground/90 mb-0.5 sm:mb-1">
                      Depois
                    </p>
                    <p className="font-heading text-lg sm:text-2xl font-bold text-accent-foreground">
                      +10kg
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </ScrollReveal>

          {/* Conteúdo */}
          <ScrollReveal>
            <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
              Minha história
            </div>

            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground">
              Eu sei exatamente como você se sente
            </h2>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Há alguns anos, eu pesava <strong className="text-foreground">45kg</strong>. Parece pouco, né? Mas eu me sentia fraca. Insegura. Desmotivada. Olhava no espelho e não gostava do que via.
              </p>

              <p>
                Eu sabia que precisava mudar — mas nada que eu tentava funcionava de verdade. Dietas genéricas. Conselhos de internet. Nada se encaixava com quem EU era.
              </p>

              <p>
                Foi quando decidi virar nutricionista. E criar para mim mesma o que eu nunca tinha encontrado: um plano que respeitasse meu corpo, minha mente e minha vida.
              </p>

              <div className="bg-linear-to-r from-accent/10 to-transparent border-l-4 border-accent pl-6 py-4 my-6">
                <p className="font-heading text-2xl font-semibold text-accent">
                  Ganhei mais de 10kg de massa magra.
                </p>
                <p className="mt-2 text-foreground">
                  Mas ganhei muito mais do que isso: ganhei confiança, energia, liberdade e uma relação saudável com a comida.
                </p>
              </div>

              <p className="text-xl text-foreground font-semibold">
                E hoje? Minha missão é entregar essa mesma transformação para mulheres como você — mulheres que merecem mais do que dietas restritivas e promessas vazias.
              </p>
            </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
