"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

// Depoimentos verticais (formato celular)
const verticalTestimonials = [
  {
    image: "/images/depoimentos/1.webp",
    highlight: "encontrei o equilíbrio",
  },
  {
    image: "/images/depoimentos/2.webp",
    highlight: "aprendo muito",
  },
  {
    image: "/images/depoimentos/3.webp",
    highlight: "riquíssima de conhecimento",
  },
  {
    image: "/images/depoimentos/4.webp",
    highlight: "admiro mais",
  },
];

// Depoimento horizontal (formato Telegram/desktop)
const horizontalTestimonial = {
  image: "/images/depoimentos/5.webp",
  highlight: "transborda conhecimento",
};

const videoTestimonials = [
  {
    id: "c3fa9e05-1895-4fc5-9db7-5544e7e8a619",
    title: "Depoimento 1",
  },
  {
    id: "3874fb63-e740-4649-bf4a-a81d80418f1e",
    title: "Depoimento 2",
  },
  {
    id: "cbb1c471-ee71-43ef-b524-1a2d492a9ff6",
    title: "Depoimento 3",
  },
];

export function SocialProof() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-[#FFF8F0]">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#E8998D]/20 text-[#043927] text-sm font-medium rounded-full mb-6">
              Depoimentos Reais
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#043927] mb-6">
              O que dizem as profissionais que já{" "}
              <span className="text-[#E85D04]">aprenderam</span>
            </h2>

            <p className="text-lg text-[#043927]/70">
              Mensagens reais de alunas e seguidoras da Elizete
            </p>
          </div>
        </ScrollReveal>

        {/* Screenshot testimonials - Vertical */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-8">
          {verticalTestimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={testimonial.image}
                    alt={`Depoimento: ${testimonial.highlight}`}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Screenshot testimonial - Horizontal */}
        <ScrollReveal delay={0.4}>
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-[16/9]">
                <Image
                  src={horizontalTestimonial.image}
                  alt={`Depoimento: ${horizontalTestimonial.highlight}`}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Video testimonials */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-serif text-[#043927] text-center mb-8">
              Depoimentos em Vídeo
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {videoTestimonials.map((video, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden shadow-lg aspect-[9/16] bg-black"
                >
                  <iframe
                    src={`https://player-vz-9c8f18da-4c3.tv.pandavideo.com.br/embed/?v=${video.id}`}
                    style={{ border: "none" }}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
