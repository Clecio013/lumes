"use client";

// Client Component - Seção Como Funciona com Scroll Reveal
import {
  MessageCircle,
  FileText,
  Users,
} from "lucide-react";
import { StructuredData } from "@/components/schema/structured-data";
import { ScrollReveal } from "@/components/animations";

export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      icon: MessageCircle,
      title: "Consulta inicial",
      description:
        "Vamos conversar — de verdade. Quero entender sua história, seus desafios, seus objetivos. Não é só sobre números numa balança. É sobre você como um todo: corpo, mente, emoções e estilo de vida.",
    },
    {
      number: "2",
      icon: FileText,
      title: "Plano alimentar personalizado",
      description:
        "Com base na nossa conversa, vou criar um plano alimentar feito para VOCÊ. Não é genérico. Não é copiado de influencer. É construído considerando suas preferências, sua rotina, seus desafios emocionais e comportamentais.",
    },
    {
      number: "3",
      icon: Users,
      title: "Acompanhamento contínuo",
      description:
        "Você não fica sozinha. Durante todo o processo, estarei ao seu lado para ajustes, suporte e motivação. Quando surgir um desafio (e vai surgir), estaremos juntas para superá-lo.",
    },
  ];

  return (
    <>
      {/* Schema.org Structured Data para SEO */}
      <StructuredData type="service" />
      <StructuredData type="howto" />

      <section data-section="como_funciona" className="py-24 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <ScrollReveal>
          <div className="text-center mb-6">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Como funciona a consultoria
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Um processo simples, humano e totalmente personalizado para você.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps Timeline */}
        <div className="mt-16 space-y-12">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 0.2}>
              <div className="relative">
                <div className="flex gap-8 items-start">
                  {/* Number & Icon */}
                  <div className="shrink-0 relative">
                    <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-accent to-secondary flex items-center justify-center text-white font-heading font-bold text-2xl shadow-lg">
                      {step.number}
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-xl bg-card border-2 border-accent flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-accent" />
                    </div>
                    {/* Connecting line */}
                    {index < 2 && (
                      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-linear-to-b from-accent/50 to-transparent" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
