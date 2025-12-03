"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";

const problems = [
  {
    stat: "30%",
    text: "das clínicas fecham por ano no Brasil",
    description:
      "Não por falta de talento, mas por falta de visão estratégica e diferenciação.",
  },
  {
    stat: "Ctrl+C",
    text: "O mercado virou cópia",
    description:
      "Todo mundo faz o mesmo. Os mesmos equipamentos. As mesmas promessas. As mesmas receitas de bolo.",
  },
  {
    stat: "Zero",
    text: "Diferencial competitivo",
    description:
      "Você investe em cursos, mas continua sendo mais uma no meio da multidão.",
  },
];

const painQuotes = [
  "Qualquer padaria hoje aplica botox. O que me diferencia?",
  "Faço curso atrás de curso, mas minha clínica não cresce.",
  "Me sinto presa, dependente de técnicas que são receitas de bolo.",
  "Perco espaço para quem não tem nem registro.",
];

export function ProblemSection() {
  return (
    <section className="bg-[#043927] py-20 md:py-28">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
              A concorrência só aumenta...
            </h2>
            <p className="text-lg md:text-xl text-white/80">
              E oferecer somente os injetáveis já não traz os resultados
              esperados. Você se sente presa, sem saber como avançar e como
              colocar mais dinheiro no bolso.
            </p>
          </div>
        </ScrollReveal>

        {/* Pain points */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {problems.map((problem, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors duration-300 h-full flex flex-col">
                <div className="text-3xl md:text-4xl font-bold text-[#E85D04] mb-4">
                  {problem.stat}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {problem.text}
                </h3>
                <p className="text-white/60 text-sm flex-1">{problem.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Emotional statements */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#0D5C3D] rounded-2xl p-8 md:p-12">
              <h3 className="text-xl md:text-2xl font-serif text-white mb-8 text-center">
                Se você já pensou alguma dessas coisas...
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {painQuotes.map((quote, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white/5 rounded-xl p-4"
                  >
                    <span className="text-[#E85D04] text-xl">&ldquo;</span>
                    <p className="text-white/90 italic">{quote}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-[#E8998D] mt-8 text-lg">
                ...você não está sozinha.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
