"use client";

import { siteConfig } from "@/config/site";

export function VideoHero() {
  const checkoutUrl = siteConfig.courses.clareamentoIntimo.checkoutUrl;

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#FFF8F0] via-[#FFF8F0] to-[#fdf3eb]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-[#E8998D]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-40 h-40 bg-[#E85D04]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Tag superior */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 bg-[#E8998D]/20 text-[#043927] text-sm font-medium rounded-full">
            Curso de Clareamento Íntimo
          </span>
        </div>

        {/* Headline emocional */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#043927] leading-tight mb-6">
            Domine o Clareamento Íntimo
            <span className="block mt-2 text-[#E85D04]">
              com raciocínio clínico, não receitas de bolo
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#043927]/70 max-w-2xl mx-auto">
            Entenda o porquê por trás dos tratamentos e crie protocolos
            personalizados que realmente funcionam para cada cliente.
          </p>
        </div>

        {/* Video VSL */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
            <iframe
              id="panda-241bd6f1-c676-4d8b-a803-410e143746cc"
              src="https://player-vz-9c8f18da-4c3.tv.pandavideo.com.br/embed/?v=241bd6f1-c676-4d8b-a803-410e143746cc"
              style={{ border: "none" }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="eager"
            />
          </div>
        </div>

        {/* CTA Principal */}
        <div className="text-center">
          <a
            href={checkoutUrl}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#E85D04] hover:bg-[#d15404] text-white font-semibold text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 md:mb-12"
          >
            <span>Quero Dominar o Clareamento Íntimo</span>
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
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#043927"
          />
        </svg>
      </div>
    </section>
  );
}
