"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { ScrollReveal } from "@/components/animations";
import { siteConfig } from "@/config/site";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "O que vou aprender no curso?",
      answer: "Você vai aprender a fazer avaliação de pele profissional usando o método de raciocínio clínico. O curso abrange ficha de anamnese, relações da pele com intestino, hormônios, diabetes e outros fatores, além de como organizar as informações para criar protocolos personalizados.",
    },
    {
      question: "Para quem é o curso?",
      answer: "O curso é para profissionais de estética formados em Biomedicina, Biologia, Enfermagem, Odontologia, Dermatologia e áreas correlatas que querem se diferenciar no mercado através do raciocínio clínico.",
    },
    {
      question: "Quanto tempo tenho acesso?",
      answer: "Você terá acesso vitalício ao conteúdo do curso, podendo assistir quantas vezes quiser, no seu próprio ritmo.",
    },
    {
      question: "O curso tem garantia?",
      answer: `Sim! Você tem ${siteConfig.course.guarantee} dias de garantia incondicional. Se não gostar do curso por qualquer motivo, pode pedir reembolso total do seu investimento.`,
    },
    {
      question: "Preciso ter experiência prévia?",
      answer: "O curso é voltado para profissionais da área de estética. Conhecimento básico é recomendado, mas o método de raciocínio clínico é ensinado do zero.",
    },
    {
      question: "O que é o Raciocínio Clínico?",
      answer: "É a capacidade de pensar sobre a pele de forma holística, entendendo as causas por trás de cada disfunção. Você aprende a analisar, não apenas seguir receitas prontas. Isso te dá autonomia para criar protocolos personalizados.",
    },
  ];

  return (
    <section data-section="faq" className="py-24 lg:py-32 px-6 bg-[var(--chiffon)]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <p className="text-[var(--tangerine)] font-medium mb-4 uppercase tracking-widest text-sm">
                FAQ
              </p>
              <h2 className="font-display text-3xl lg:text-4xl text-foreground">
                Dúvidas frequentes
              </h2>
            </div>
            <p className="text-lg text-muted-foreground self-end">
              Encontre respostas para as perguntas mais comuns sobre o curso.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="border-b border-border">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="font-display text-lg lg:text-xl text-foreground pr-8 group-hover:text-[var(--tangerine)] transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-10 h-10 bg-white flex items-center justify-center shrink-0 group-hover:bg-[var(--tangerine)] transition-colors">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-[var(--tangerine)] group-hover:text-white transition-colors" />
                    ) : (
                      <Plus className="w-5 h-5 text-[var(--tangerine)] group-hover:text-white transition-colors" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-muted-foreground leading-relaxed pr-20">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
