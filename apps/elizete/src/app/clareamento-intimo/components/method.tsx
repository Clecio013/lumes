"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";

const pillars = [
  {
    icon: (
      <svg
        className="w-8 h-8"
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
    title: "Entender",
    description:
      "Antes de tratar, você precisa entender profundamente o porquê do escurecimento. Cada cliente é única.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    title: "Analisar",
    description:
      "Com raciocínio clínico, você analisa cada caso individualmente e cria soluções personalizadas.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Transformar",
    description:
      "Um conhecimento base te permite criar múltiplos protocolos e resultados consistentes.",
  },
];

export function Method() {
  return (
    <section className="py-20 md:py-28 bg-[#043927] relative overflow-hidden">
      {/* Decorative butterfly */}
      <div className="absolute left-10 top-20 opacity-5 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="white">
          <path d="M50 45 C30 30, 10 35, 5 50 C10 65, 30 70, 50 55 C70 70, 90 65, 95 50 C90 35, 70 30, 50 45 Z" />
          <ellipse cx="50" cy="50" rx="2" ry="15" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#E85D04]/20 text-[#E85D04] text-sm font-medium rounded-full mb-6">
              O Método
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
              Estética <span className="text-[#E8998D]">Inteligente</span>
            </h2>

            <p className="text-xl text-white/80 mb-8">
              Não importa o curso que você faça, você precisa da{" "}
              <strong className="text-[#E85D04]">
                metodologia de raciocínio clínico
              </strong>{" "}
              por trás.
            </p>

            <div className="w-24 h-1 bg-[#E8998D] mx-auto" />
          </div>
        </ScrollReveal>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <div className="bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center h-full">
                <div className="w-16 h-16 bg-[#E85D04]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#E85D04]">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">
                  {pillar.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Key insight */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#0D5C3D] border border-white/10 rounded-3xl p-8 md:p-12 text-center">
              <svg
                className="w-12 h-12 text-[#E8998D] mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="text-xl md:text-2xl font-serif text-white italic mb-6">
                &ldquo;Quando você entende o porquê, você pode criar o como.
                <span className="block mt-2 text-[#E8998D]">
                  Um conhecimento te dá múltiplos resultados.&rdquo;
                </span>
              </blockquote>

              <p className="text-white/60">— Elizete Garcia</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
