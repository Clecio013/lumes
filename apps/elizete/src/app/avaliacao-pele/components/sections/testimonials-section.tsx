"use client";

import { ScrollReveal } from "@/components/animations";

export function TestimonialsSection() {
  const testimonials = [
    {
      content: "O conteúdo da Elizete é profundo e transformador. O método de Raciocínio Clínico mudou completamente minha forma de trabalhar na estética.",
      author: "Aluna do curso",
      role: "Profissional de Estética",
    },
    {
      content: "Finalmente entendi que não preciso de mais uma técnica da moda. Preciso de raciocínio clínico para dominar qualquer protocolo.",
      author: "Aluna do curso",
      role: "Esteticista",
    },
    {
      content: "A Elizete tem uma didática incrível. 49 anos de experiência fazem toda a diferença. É conhecimento de verdade, não receita de bolo.",
      author: "Aluna do curso",
      role: "Biomédica",
    },
  ];

  return (
    <section data-section="testimonials" className="py-24 lg:py-32 px-6 bg-[var(--sacramento)]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-[var(--tangerine)] font-medium mb-4 uppercase tracking-widest text-sm">
              Depoimentos
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-white max-w-xl">
              O que dizem profissionais que aprenderam o método
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.15}>
              <div className="relative h-full">
                {/* Número */}
                <span className="absolute -top-4 left-0 font-display text-7xl text-white/5">
                  0{index + 1}
                </span>

                <div className="relative pt-8 h-full flex flex-col">
                  {/* Linha decorativa */}
                  <div className="w-12 h-0.5 bg-[var(--tangerine)] mb-6" />

                  {/* Conteúdo */}
                  <p className="text-white/80 text-lg leading-relaxed flex-1 mb-8">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Autor */}
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-white/50 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
