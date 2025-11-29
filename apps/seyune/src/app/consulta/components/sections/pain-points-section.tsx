"use client";

// Client Component - Seção de Dores com Scroll Reveal
import { ScrollReveal } from "@/components/animations/scroll-reveal";

export function PainPointsSection() {
  const painPoints = [
    {
      title: "O ciclo interminável",
      description:
        "Começa uma nova dieta cheia de esperança, segue rigorosamente por algumas semanas, até que... um deslize. E então vem a culpa, a frustração, e você recomeça tudo de novo. Quantas vezes você já viveu isso?",
    },
    {
      title: "O efeito sanfona que nunca para",
      description:
        "Perde peso, ganha de volta. Perde de novo, ganha mais ainda. Seu corpo não aguenta mais essa montanha-russa, e sua mente muito menos.",
    },
    {
      title: "A culpa depois de cada refeição",
      description:
        'Você sabe aquela sensação horrível de culpa toda vez que come algo "fora do plano"? Como se você tivesse falhado mais uma vez? Como se você não tivesse força de vontade suficiente?',
    },
    {
      title: "Vivendo para comer certo",
      description:
        "Sua vida gira em torno da dieta. Você evita eventos sociais. Fica ansiosa pensando no que vai comer. Passa mais tempo planejando refeições do que aproveitando a vida.",
    },
  ];

  return (
    <section data-section="dores" className="py-24 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Você já passou por isso?
            </h2>
          </div>
        </ScrollReveal>

        {/* Grid de Dores */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {painPoints.map((painPoint, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-background rounded-2xl p-8 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                <h3 className="font-heading text-2xl font-semibold text-accent mb-4">
                  {painPoint.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {painPoint.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Consequência */}
        <ScrollReveal delay={0.4}>
          <div className="bg-linear-to-r from-primary/10 to-accent/10 rounded-3xl p-10 border border-accent/20 text-center">
            <p className="font-heading text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              E o pior? Cada ano que passa assim, você se afasta mais do corpo e
              da mente que você deseja.
            </p>
            <p className="text-xl text-muted-foreground">
              Não é falta de informação. Não é falta de esforço.{" "}
              <span className="text-accent font-semibold">
                O problema está na abordagem.
              </span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
