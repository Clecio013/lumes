"use client";

// Client Component - Seção Depoimentos com Scroll Reveal
import { ScrollReveal } from "@/components/animations";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Eu tentei todas as dietas da moda...",
      story:
        "Jejum intermitente. Low carb. Detox. Dieta da blogueira fitness. Nada funcionava a longo prazo. O peso voltava sempre, e a frustração só aumentava.",
    },
    {
      quote: "A culpa estava me consumindo",
      story:
        'Cada vez que eu "furava" a dieta, eu me sentia um fracasso. Chorava, me punia, começava tudo de novo na segunda-feira. Eu estava exausta emocionalmente.',
    },
    {
      quote: "Minha vida girava em torno da comida",
      story:
        "Eu evitava sair com amigas porque tinha medo de comer algo errado. Ficava ansiosa em eventos. A comida controlava minha vida — eu não controlava a comida.",
    },
    {
      quote: "O efeito sanfona estava acabando comigo",
      story:
        "Perdia 5kg, ganhava 7kg. Perdia de novo, ganhava mais ainda. Meu corpo não aguentava mais, e minha autoestima estava no chão.",
    },
  ];

  return (
    <section data-section="depoimentos" className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <ScrollReveal>
          <div className="text-center mb-6">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Você não está sozinha
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Milhares de mulheres estão sentindo exatamente o que você sente
              agora.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid de "Depoimentos" */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {testimonials.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <div className="bg-background rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                <div className="flex flex-col flex-grow">
                  <p className="font-heading text-2xl font-semibold text-primary mb-4">
                    {item.quote}
                  </p>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {item.story}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
