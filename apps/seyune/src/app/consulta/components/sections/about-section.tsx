"use client";

// Client Component - Seção Quem é Seyune com Scroll Reveal
import Image from "next/image";
import {
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations";

export function AboutSection() {
  const highlights = [
    {
      title: "Nutrição comportamental",
      description:
        "Entendendo seus gatilhos emocionais e padrões alimentares",
    },
    {
      title: "Planos personalizados",
      description: "Feitos para SUA rotina, SUA vida, SEU corpo",
    },
    {
      title: "Acompanhamento humano",
      description:
        "Você não é um número, é uma pessoa com uma história",
    },
    {
      title: "Resultados sustentáveis",
      description:
        "Sem promessas milagrosas, sem restrições impossíveis",
    },
  ];

  return (
    <ScrollReveal>
      <section data-section="quem_e_seyune" className="py-24 px-6 bg-linear-to-b from-background to-card">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-stretch">
            {/* Foto */}

              <div className="lg:col-span-2">
                <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden border-4 border-accent/20 shadow-2xl">
                  <Image
                    src="/images/about/profile.jpg"
                    alt="Seyune"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>


            {/* Conteúdo */}

              <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Quem é Seyune
                </h2>
                <div className="flex items-center gap-2 text-accent">
                  <GraduationCap className="w-5 h-5" />
                  <p className="font-semibold">
                    Nutricionista com especialização em Nutrição Comportamental
                  </p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Não sou só mais uma profissional com diploma na parede. Sou
                alguém que viveu na pele a frustração de não conseguir resultados
                com abordagens genéricas e restritivas.
              </p>

              <div className="space-y-4">
                <p className="text-foreground font-semibold text-lg">
                  Por isso, meu trabalho vai além de montar cardápios:
                </p>

                {highlights.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <p className="text-xl font-heading font-semibold text-accent mb-6">
                  Minha missão? Te ajudar a conquistar o corpo que você deseja
                  enquanto constrói uma relação saudável e livre com a comida.
                </p>
              </div>
              </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
