"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";

const bonuses = [
  {
    tag: "Módulo Bônus",
    title: "Segredos da Foliculite",
    description:
      "Aprenda a tratar e prevenir foliculite com protocolos exclusivos. Um conhecimento complementar essencial para resultados completos.",
    coverTitle: "Segredos da",
    coverSubtitle: "Foliculite",
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    tag: "Módulo Bônus",
    title: "Protocolo com Manipulados",
    description:
      "Protocolo exclusivo com fórmulas manipuladas que potencializam os resultados do clareamento íntimo.",
    coverTitle: "Protocolo Exclusivo",
    coverSubtitle: "Fórmulas Manipuladas",
    icon: (
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
];

export function BonusSection() {
  return (
    <section className="py-20 md:py-28 bg-[#0D5C3D] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85D04]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#E85D04] text-white text-sm font-medium rounded-full mb-6">
              Exclusivo
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
              Bônus <span className="text-[#E8998D]">Especiais</span>
            </h2>

            <p className="text-lg text-white/80">
              Garanta sua vaga agora e receba conteúdos exclusivos que vão
              acelerar seus resultados
            </p>
          </div>
        </ScrollReveal>

        {/* Bonuses */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {bonuses.map((bonus, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden h-full">
                {/* Tag */}
                <div className="bg-[#E85D04] px-4 py-2">
                  <span className="text-white text-sm font-medium">
                    {bonus.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Cover generated with code */}
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-[#043927] to-[#0D5C3D] relative overflow-hidden mb-6">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full" />
                      <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-white rounded-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      {/* Icon */}
                      <div className="w-14 h-14 bg-[#E85D04] rounded-2xl flex items-center justify-center mb-4">
                        {bonus.icon}
                      </div>

                      {/* Title */}
                      <h4 className="text-white font-serif text-lg mb-1">
                        {bonus.coverTitle}
                      </h4>
                      <p className="text-[#E8998D] text-sm font-medium">
                        {bonus.coverSubtitle}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif text-white mb-3">
                    {bonus.title}
                  </h3>

                  <p className="text-white/70 leading-relaxed">
                    {bonus.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Urgency notice */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <div className="bg-[#E85D04]/20 border border-[#E85D04]/30 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-3 text-white">
                <svg
                  className="w-6 h-6 text-[#E85D04]"
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
                <span className="font-medium">
                  Esses bônus são por tempo limitado e podem ser removidos a
                  qualquer momento
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
