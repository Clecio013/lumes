"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { siteConfig } from "@/config/site";

const options = [
  {
    number: "1",
    title: "Não fazer nada",
    description:
      "Permanecer exatamente onde está até que tudo comece a dar errado. Continuar na fila invisível do fracasso.",
    type: "negative",
  },
  {
    number: "2",
    title: "Tentar sozinha",
    description:
      "Gastar anos tentando descobrir por conta própria. Continuar fazendo o que todos fazem e esperar resultados diferentes.",
    type: "negative",
  },
  {
    number: "3",
    title: "Deixar eu te entregar",
    description:
      "Um pacote bem embalado com todos os meus 49 anos de experiência e estudos, pronto para você aplicar.",
    type: "positive",
  },
];

export function FinalCTA() {
  const course = siteConfig.courses.clareamentoIntimo;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#FFF8F0] to-white relative overflow-hidden">
      {/* Decorative butterfly */}
      <div className="absolute right-10 top-20 opacity-10 pointer-events-none">
        <svg
          width="150"
          height="150"
          viewBox="0 0 100 100"
          fill="#043927"
          className="transform -rotate-12"
        >
          <path d="M50 45 C30 30, 10 35, 5 50 C10 65, 30 70, 50 55 C70 70, 90 65, 95 50 C90 35, 70 30, 50 45 Z" />
          <ellipse cx="50" cy="50" rx="2" ry="15" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#043927] mb-6">
              Você tem <span className="text-[#E85D04]">3 opções</span> agora
            </h2>

            <p className="text-lg text-[#043927]/70">
              A decisão é sua. Mas lembre-se: não decidir também é uma decisão.
            </p>
          </div>
        </ScrollReveal>

        {/* Options */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {options.map((option, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <div
                className={`rounded-3xl p-8 h-full ${
                  option.type === "positive"
                    ? "bg-[#043927] text-white ring-4 ring-[#E85D04] ring-offset-4"
                    : "bg-white border border-gray-200 text-[#043927]"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6 ${
                    option.type === "positive"
                      ? "bg-[#E85D04] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {option.number}
                </div>

                <h3
                  className={`text-xl font-serif mb-4 ${
                    option.type === "positive" ? "text-[#E8998D]" : ""
                  }`}
                >
                  {option.title}
                </h3>

                <p
                  className={`leading-relaxed ${
                    option.type === "positive"
                      ? "text-white/80"
                      : "text-gray-600"
                  }`}
                >
                  {option.description}
                </p>

                {option.type === "positive" && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <a
                      href={course.checkoutUrl}
                      className="inline-flex items-center gap-2 text-[#E85D04] font-semibold hover:gap-4 transition-all"
                    >
                      <span>Escolher este caminho</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Final message */}
        <ScrollReveal delay={0.4}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-[#043927] rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-6">
                A diferença entre{" "}
                <span className="text-[#E8998D]">sonhadores</span> e{" "}
                <span className="text-[#E85D04]">determinados</span>
              </h3>

              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                A maioria das pessoas dirá que quer alcançar um lugar de
                referência. Mas poucas realmente fazem isso acontecer. A maioria
                continuará apenas sonhando... enquanto os poucos que realmente
                levam a sério tomarão uma atitude.
              </p>

              <a
                href={course.checkoutUrl}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#E85D04] hover:bg-[#d15404] text-white font-semibold text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <span>Quero Ser Uma Determinada</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <p className="mt-6 text-white/50 text-sm">
                Garantia de {course.guarantee} dias • Acesso imediato • Suporte
                incluso
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
