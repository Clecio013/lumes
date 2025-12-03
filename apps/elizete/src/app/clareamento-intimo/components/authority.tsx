"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const credentials = [
  {
    number: "49",
    label: "anos na estética",
  },
  {
    number: "15",
    label: "anos no Senac",
  },
  {
    number: "1000+",
    label: "alunas formadas",
  },
];

export function Authority() {
  return (
    <section className="relative py-20 md:py-28 bg-[#FFF8F0] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#E8998D]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#E85D04]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <ScrollReveal>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/ensaio/elizete-portrait.jpg"
                  alt="Elizete Garcia - Especialista em Estética"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#043927] text-white p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold text-[#E85D04]">49</p>
                <p className="text-sm">anos dedicados<br />à estética</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={0.2}>
            <div>
              <span className="inline-block px-4 py-2 bg-[#E8998D]/20 text-[#043927] text-sm font-medium rounded-full mb-6">
                Conheça sua mentora
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#043927] mb-6">
                Elizete Garcia
              </h2>

              <div className="w-16 h-1 bg-[#E85D04] mb-8" />

              <div className="space-y-5 text-[#043927]/80 leading-relaxed">
                <p className="text-lg">
                  Estou na estética há{" "}
                  <strong className="text-[#043927]">49 anos</strong>. Formada
                  em Biologia e especialista em Cosmetologia Clínica.
                </p>

                <p>
                  Fui{" "}
                  <strong className="text-[#043927]">
                    pioneira no primeiro curso técnico de estética no Brasil
                    pelo Senac
                  </strong>
                  , trabalhei em clínica de cirurgia plástica por 15 anos, e
                  hoje sou consultora de fábricas de cosméticos, palestrante e
                  mentora.
                </p>

                <p>
                  Eu construí tudo o que eu tenho — autoridade dentro da
                  comunidade e uma imagem de referência — porque não desisti,
                  mas acima de tudo, porque aprendi quais eram as{" "}
                  <strong className="text-[#E85D04]">
                    escolhas inteligentes
                  </strong>
                  .
                </p>

                <blockquote className="border-l-4 border-[#E85D04] pl-6 py-2 text-xl font-serif italic text-[#043927]">
                  &ldquo;Eu quero que você saia dessa roda de ratos. A maioria
                  das pessoas está no piloto automático e não consegue enxergar
                  o rumo que está tomando.&rdquo;
                </blockquote>
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-3 gap-6 mt-10">
                {credentials.map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-[#E85D04]">
                      {item.number}
                    </p>
                    <p className="text-sm text-[#043927]/60 mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
