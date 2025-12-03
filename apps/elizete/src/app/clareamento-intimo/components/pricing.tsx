"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { siteConfig } from "@/config/site";

const includes = [
  "5 módulos completos sobre clareamento íntimo",
  "Metodologia de raciocínio clínico",
  "Protocolos práticos e personalizáveis",
  "Bônus: Curso Segredos da Foliculite",
  "Bônus: Protocolo com manipulados",
  "1 ano de acesso à plataforma",
  "Certificado de conclusão",
  "Suporte via plataforma",
];

export function Pricing() {
  const course = siteConfig.courses.clareamentoIntimo;
  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <section className="py-20 md:py-28 bg-[#043927] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-60 h-60 border-2 border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-white rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#E85D04] text-white text-sm font-medium rounded-full mb-6">
              Oferta Especial
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
              Invista na sua{" "}
              <span className="text-[#E8998D]">transformação</span>
            </h2>

            <p className="text-lg text-white/80">
              Todo o conhecimento que você precisa para se tornar referência em
              clareamento íntimo
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing card */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#E85D04] to-[#E8998D] p-6 text-center">
                <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-3">
                  {discount}% de desconto
                </span>
                <h3 className="text-2xl font-serif text-white">
                  Clareamento Íntimo com Raciocínio Clínico
                </h3>
              </div>

              {/* Price */}
              <div className="p-8 text-center border-b border-gray-100">
                <p className="text-gray-500 mb-2">
                  De{" "}
                  <span className="line-through">
                    R$ {course.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-gray-500 text-lg">por apenas</span>
                </div>
                <p className="text-5xl md:text-6xl font-bold text-[#043927] mt-2">
                  R$ {course.price.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  ou 12x de R${" "}
                  {(course.price / 12).toFixed(2).replace(".", ",")}
                </p>
              </div>

              {/* What's included */}
              <div className="p-8">
                <h4 className="font-semibold text-[#043927] mb-4">
                  O que você vai receber:
                </h4>
                <ul className="space-y-3">
                  {includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-[#E85D04] flex-shrink-0 mt-0.5"
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
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-8 pb-8">
                <a
                  href={course.checkoutUrl}
                  className="block w-full py-4 bg-[#E85D04] hover:bg-[#d15404] text-white font-semibold text-lg text-center rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Quero Me Inscrever Agora
                </a>
              </div>

              {/* Guarantee */}
              <div className="bg-gray-50 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#043927] rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#043927]">
                      Garantia de {course.guarantee} dias
                    </h4>
                    <p className="text-sm text-gray-600">
                      Se você não ficar satisfeita, devolvemos 100% do seu
                      investimento. Sem perguntas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Trust badges */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-2xl mx-auto mt-12">
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Compra segura</span>
              </div>
              <div className="flex items-center gap-2">
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span>Pagamento via Hotmart</span>
              </div>
              <div className="flex items-center gap-2">
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
                <span>Acesso imediato</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
