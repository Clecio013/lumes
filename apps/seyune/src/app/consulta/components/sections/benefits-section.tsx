"use client";

// Client Component - Seção de Benefícios com Scroll Reveal
import { Card } from "@lumes/ui";
import {
  Heart,
  Brain,
  Sparkles,
  Target,
  Smile,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations";

export function BenefitsSection() {
  const benefits = [
    {
      icon: Heart,
      title: "Bem-estar físico sem sacrifícios",
      description:
        "Ganhe o corpo que você deseja através de um plano personalizado que respeita sua rotina, suas preferências e seu momento de vida. Sem loucuras, sem restrições impossíveis.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Brain,
      title: "Equilíbrio mental e emocional",
      description:
        "Liberte-se da culpa, da ansiedade alimentar e da obsessão por \"comer certo\". Aprenda a ouvir seu corpo e tomar decisões conscientes, não impulsivas.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Sparkles,
      title: "Confiança e liberdade verdadeiras",
      description:
        "Vá ao restaurante sem medo. Curta o final de semana sem culpa. Viva sua vida sabendo que você tem controle — não a dieta.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Target,
      title: "Resultados que duram",
      description:
        "Não é sobre perder 5kg em 2 semanas. É sobre construir hábitos sustentáveis que transformam sua vida para sempre.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Smile,
      title: "Relação saudável com a comida",
      description:
        "A comida deixa de ser inimiga ou obsessão. Ela volta a ser o que sempre deveria ser: nutrição, prazer e conexão.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Zap,
      title: "Energia para viver plenamente",
      description:
        "Acorde com disposição. Tenha energia para treinar, trabalhar, se divertir. Sinta-se viva no seu corpo, não aprisionada nele.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <section data-section="beneficios" className="py-24 px-6 bg-linear-to-b from-card to-background">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <ScrollReveal>
          <div className="text-center mb-6">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Imagine se você pudesse ter...
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A nutrição comportamental não é mais uma dieta restritiva. É uma
              transformação completa — do corpo, da mente e da sua relação com a
              comida.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid de Benefícios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="h-full p-8 bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div
                  className={`w-14 h-14 rounded-2xl ${benefit.bgColor} flex items-center justify-center mb-6`}
                >
                  <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
