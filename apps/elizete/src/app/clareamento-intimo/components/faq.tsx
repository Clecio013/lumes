"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const faqs = [
  {
    question: "Para quem é este curso?",
    answer:
      "Este curso é para profissionais da estética que desejam se especializar em clareamento íntimo com uma abordagem baseada em raciocínio clínico. Se você é esteticista, biomédica, farmacêutica ou profissional da área da saúde que atua com estética, este curso é para você.",
  },
  {
    question: "Preciso ter experiência prévia?",
    answer:
      "O curso foi desenvolvido para profissionais que já atuam na área da estética. Não é necessário ter experiência específica com clareamento íntimo, mas é importante ter formação básica em estética ou área da saúde.",
  },
  {
    question: "Por quanto tempo terei acesso ao curso?",
    answer:
      "Você terá 1 ano de acesso completo a todo o conteúdo do curso, incluindo atualizações que forem feitas durante este período.",
  },
  {
    question: "O curso tem certificado?",
    answer:
      "Sim! Ao concluir o curso, você receberá um certificado de conclusão que pode ser utilizado para comprovar sua especialização.",
  },
  {
    question: "Como funciona a garantia?",
    answer:
      "Oferecemos garantia incondicional de 7 dias. Se você não ficar satisfeita com o conteúdo, basta solicitar o reembolso dentro deste prazo e devolvemos 100% do seu investimento, sem perguntas.",
  },
  {
    question: "O pagamento é seguro?",
    answer:
      "Sim! O pagamento é processado pela Hotmart, a maior plataforma de produtos digitais da América Latina, com certificação de segurança e criptografia de dados.",
  },
  {
    question: "Posso parcelar?",
    answer:
      "Sim! Você pode parcelar em até 12x no cartão de crédito. Também aceitamos PIX e boleto bancário para pagamento à vista.",
  },
  {
    question: "Quando terei acesso ao conteúdo?",
    answer:
      "O acesso é liberado imediatamente após a confirmação do pagamento. Para cartão de crédito e PIX, o acesso é instantâneo. Para boleto, pode levar até 3 dias úteis.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[#043927]/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left gap-4"
      >
        <span className="text-lg font-medium text-[#043927]">{question}</span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#E8998D]/20 flex items-center justify-center transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            className="w-4 h-4 text-[#E85D04]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-[#043927]/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#043927]/10 text-[#043927] text-sm font-medium rounded-full mb-6">
              Dúvidas Frequentes
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#043927] mb-6">
              Perguntas <span className="text-[#E85D04]">Frequentes</span>
            </h2>

            <p className="text-lg text-[#043927]/70">
              Tire suas dúvidas sobre o curso
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto bg-[#FFF8F0] rounded-3xl p-8 md:p-12">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Additional help */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-xl mx-auto mt-12 text-center">
            <p className="text-[#043927]/70 mb-4">
              Ainda tem dúvidas? Entre em contato pelo Instagram
            </p>
            <a
              href="https://www.instagram.com/eli.zetegarcia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#E85D04] font-medium hover:underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>@eli.zetegarcia</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
