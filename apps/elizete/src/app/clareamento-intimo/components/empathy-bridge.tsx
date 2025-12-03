"use client";

import { ScrollReveal } from "@/components/animations/scroll-reveal";

export function EmpathyBridge() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#043927] to-[#0D5C3D] overflow-hidden">
      {/* Decorative butterfly silhouette */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <svg
          width="400"
          height="400"
          viewBox="0 0 100 100"
          fill="white"
          className="transform rotate-12"
        >
          <path d="M50 45 C30 30, 10 35, 5 50 C10 65, 30 70, 50 55 C70 70, 90 65, 95 50 C90 35, 70 30, 50 45 Z" />
          <ellipse cx="50" cy="50" rx="2" ry="15" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            {/* Main message */}
            <div className="mb-12">
              <span className="inline-block px-6 py-3 bg-[#E8998D]/20 text-[#E8998D] rounded-full text-sm font-medium mb-8">
                Uma mensagem importante
              </span>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-8">
                A culpa <span className="text-[#E8998D]">não é sua.</span>
              </h2>

              <div className="w-24 h-1 bg-[#E85D04] mx-auto mb-8" />

              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                O mercado te ensinou a <strong className="text-[#E85D04]">copiar</strong>, não a <strong className="text-[#E85D04]">pensar</strong>.
              </p>
            </div>

            {/* Explanation */}
            <div className="grid md:grid-cols-2 gap-8 text-left mt-16">
              <ScrollReveal delay={0.2}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                  <div className="w-12 h-12 bg-[#E85D04]/20 rounded-full flex items-center justify-center mb-6">
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    O que te ensinaram
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Cursos que vendem "protocolos prontos", "receitas de bolo" e
                    fórmulas mágicas. Você decora, aplica... e quando não
                    funciona, não sabe o que fazer.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                  <div className="w-12 h-12 bg-[#E8998D]/20 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-6 h-6 text-[#E8998D]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    O que você precisa
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Entender o <strong>porquê</strong> por trás de cada
                    tratamento. Desenvolver raciocínio clínico para criar suas
                    próprias soluções, adaptadas a cada cliente.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Transition statement */}
            <ScrollReveal delay={0.4}>
              <div className="mt-16">
                <p className="text-lg md:text-xl text-[#E8998D] font-medium">
                  Existe um caminho diferente. Um caminho que transforma
                  profissionais comuns em referências.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
