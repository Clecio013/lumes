"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";

const modules = [
  {
    number: "01",
    title: "Tudo sobre o Escurecimento",
    description:
      "Entenda profundamente as causas, tipos e fatores que influenciam o escurecimento íntimo. Base teórica sólida para decisões assertivas.",
    topics: ["Fisiologia da pele", "Causas do escurecimento", "Tipos de manchas"],
  },
  {
    number: "02",
    title: "Cuidados e Prevenção",
    description:
      "Aprenda a orientar suas clientes sobre prevenção e cuidados diários essenciais para manter os resultados.",
    topics: ["Rotina de cuidados", "Produtos indicados", "Orientação ao cliente"],
  },
  {
    number: "03",
    title: "Tratamentos",
    description:
      "Domine as técnicas e tratamentos mais eficazes para clareamento íntimo, com protocolos práticos e seguros.",
    topics: ["Técnicas profissionais", "Ativos clareadores", "Combinações eficazes"],
  },
  {
    number: "04",
    title: "Abordagem Holística e Ética",
    description:
      "Como abordar o tema com sensibilidade, ética profissional e visão integral da saúde da cliente.",
    topics: ["Comunicação empática", "Ética profissional", "Abordagem integral"],
  },
  {
    number: "05",
    title: "Protocolos",
    description:
      "Protocolos práticos e personalizáveis que você pode adaptar às necessidades únicas de cada cliente.",
    topics: ["Protocolos prontos", "Personalização", "Acompanhamento"],
  },
];

export function CourseModules() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#FFF8F0] to-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#043927]/10 text-[#043927] text-sm font-medium rounded-full mb-6">
              O Curso
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#043927] mb-6">
              Clareamento Íntimo com{" "}
              <span className="text-[#E85D04]">Raciocínio Clínico</span>
            </h2>

            <p className="text-lg text-[#043927]/70">
              5 módulos completos que vão transformar sua prática profissional
            </p>
          </div>
        </ScrollReveal>

        {/* Modules grid */}
        <div className="max-w-5xl mx-auto">
          {modules.map((module, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div
                className={`flex flex-col md:flex-row gap-6 md:gap-10 py-8 ${
                  index !== modules.length - 1
                    ? "border-b border-[#043927]/10"
                    : ""
                }`}
              >
                {/* Number */}
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-16 h-16 bg-[#E8998D]/20 text-[#E85D04] font-bold text-xl rounded-2xl">
                    {module.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-serif text-[#043927] mb-3">
                    {module.title}
                  </h3>
                  <p className="text-[#043927]/70 mb-4 leading-relaxed">
                    {module.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-3 py-1 bg-[#043927]/5 text-[#043927]/80 text-sm rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative */}
                <div className="hidden md:flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#043927]/5 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#043927]/30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Access info */}
        <ScrollReveal delay={0.5}>
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#043927] text-white rounded-full">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>1 ano de acesso completo à plataforma</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
