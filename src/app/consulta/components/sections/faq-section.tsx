"use client";

// Client Component - FAQ Section
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTracking } from "@/hooks/useTracking";
import { StructuredData } from "@/components/schema/structured-data";

export function FAQSection() {
  const { trackFAQInteraction } = useTracking();

  const faqs = [
    {
      question: "Quanto custa a consulta?",
      answer:
        "O investimento varia de acordo com o tipo de acompanhamento que você precisa. Vamos conversar no WhatsApp para eu entender seus objetivos e te passar os valores personalizados.",
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer:
        "Resultados físicos começam a aparecer nas primeiras semanas, mas a verdadeira transformação — mental e comportamental — é um processo contínuo. Não é sobre ser rápido, é sobre ser sustentável.",
    },
    {
      question: "É mais uma dieta restritiva?",
      answer:
        "Não! Nutrição comportamental é justamente o OPOSTO de dietas restritivas. Trabalhamos seus comportamentos, emoções e relação com a comida — sem proibições extremas que levam à compulsão.",
    },
    {
      question: "Eu já tentei tudo e nada funcionou. Por que seria diferente?",
      answer:
        "Porque você provavelmente tentou abordagens genéricas que não consideram quem VOCÊ é. Aqui, o plano é 100% personalizado para sua rotina, preferências e desafios emocionais. E você tem acompanhamento contínuo.",
    },
    {
      question: "Como funciona o acompanhamento?",
      answer:
        "Após a consulta inicial e criação do seu plano, mantemos contato regular para ajustes, suporte e motivação. Você não fica sozinha no processo.",
    },
    {
      question: "As consultas são presenciais ou online?",
      answer:
        "As consultas podem ser online, então você pode estar em qualquer lugar do Brasil (ou do mundo) para ter acesso ao acompanhamento.",
    },
  ];

  return (
    <>
      {/* Schema.org Structured Data para SEO */}
      <StructuredData type="faq" />

      <section data-section="faq" className="py-24 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre a consultoria
          </p>
        </div>

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="space-y-4"
          onValueChange={(value) => {
            if (value) {
              const index = parseInt(value.replace("item-", "")) - 1;
              if (faqs[index]) {
                trackFAQInteraction(faqs[index].question, "open");
              }
            }
          }}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="border border-border rounded-2xl px-6 bg-background"
            >
              <AccordionTrigger className="font-heading font-bold text-lg text-left hover:no-underline cursor-pointer">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
    </>
  );
}
