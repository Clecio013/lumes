'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const faqs = [
  {
    question: 'Já tentei várias vezes e não deu certo. Por que agora seria diferente?',
    answer:
      'Porque você terá algo que nunca teve antes: um plano feito especificamente para você, baseado em consultas individuais com nutricionista e personal trainer. Não é mais um protocolo genérico. É estratégia personalizada + acompanhamento profissional durante todo o processo.',
  },
  {
    question: 'Não tenho tempo para treinar todos os dias. Consigo fazer o programa?',
    answer:
      'Sim! O plano de treino é criado de acordo com sua rotina. Durante a consulta com o Amauri, você vai contar quantos dias por semana consegue treinar e quanto tempo tem disponível. O treino será montado para caber na sua realidade, não o contrário.',
  },
  {
    question: 'O plano alimentar vai ser muito restritivo?',
    answer:
      'Não. A Seyune trabalha com Nutrição Comportamental, que foge de restrições extremas e foca em criar uma relação saudável com a comida. O plano será adaptado aos seus gostos, rotina e necessidades. Sem radicalismo, sem culpa.',
  },
  {
    question: '45 dias é suficiente para ver resultado?',
    answer:
      '45 dias é um período estratégico para criar hábitos sustentáveis e ver mudanças visíveis no corpo e na mente. Não é sobre resultado "milagroso", mas sobre transformação real: melhor disposição, corpo mais firme, roupas vestindo melhor e, principalmente, confiança de que você está no caminho certo.',
  },
  {
    question: 'Vou ter suporte durante o programa ou só no início?',
    answer:
      'Você terá suporte contínuo! Além das consultas iniciais, você entra no grupo VIP no WhatsApp onde pode tirar dúvidas, compartilhar progresso e receber orientações dos profissionais durante todo o programa de 45 dias.',
  },
  {
    question: 'Preciso ter experiência com treino ou dieta?',
    answer:
      'Não precisa! O programa é para qualquer pessoa, independente do nível atual. Os planos são personalizados considerando sua experiência, condicionamento físico e objetivos. Se você nunca treinou ou está parado há anos, tudo bem – o plano será adaptado para você.',
  },
  {
    question: 'Posso pagar via Pix?',
    answer:
      'Sim! Se você preferir pagar via Pix, entre em contato conosco pelo WhatsApp e enviaremos um link personalizado para pagamento. O processo é rápido e sua vaga é confirmada assim que o pagamento for identificado.',
  },
  {
    question: 'O que está incluso exatamente?',
    answer:
      'Você recebe: (1) Consulta de 30min com a Seyune (Nutricionista), (2) Consulta de 30min com o Amauri (Personal Trainer), (3) Plano alimentar 100% personalizado, (4) Planilha de treino individualizada para 45 dias, (5) Acesso aos apps WebDiet e MFit Personal por 45 dias, (6) Acesso ao grupo VIP no WhatsApp por 45 dias, e (7) 5 guias exclusivos que são seus para sempre (emagrecimento sustentável, não sabotar seu processo, ganho de massa, sobrevivência nas festas e receitas saudáveis).',
  },
  {
    question: 'Por que o preço aumenta nos próximos lotes?',
    answer:
      'Trabalhamos com vagas limitadas e preço promocional por tempo determinado. O investimento aumenta conforme a demanda e proximidade do início do programa. Quanto antes você garantir, menor será o valor investido.',
  },
  {
    question: 'Como funcionam as consultas? São online ou presencial?',
    answer:
      'As consultas são online, via Google Meet ou WhatsApp, com duração de 30 minutos cada. Você agenda diretamente com cada profissional após a compra. Depois das consultas, os planos personalizados são entregues por e-mail.',
  },
  {
    question: 'O acesso aos apps WebDiet e MFit é permanente?',
    answer:
      'O acesso aos apps WebDiet e MFit Personal é válido por 45 dias, o período completo do programa. Já os 5 guias exclusivos (materiais em PDF) são seus para sempre, mesmo após o término dos 45 dias. Você poderá consultá-los sempre que precisar.',
  },
  {
    question: 'Como e quando vou receber os materiais e acessos?',
    answer:
      'Após a confirmação do pagamento, você receberá um e-mail e será adicionado ao grupo VIP do WhatsApp. É através do grupo que entraremos em contato para enviar os 5 guias exclusivos em PDF e as credenciais de acesso aos apps WebDiet e MFit Personal. Você também receberá as orientações para agendar suas consultas individuais com a Seyune e o Amauri.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToOferta = () => {
    const ofertaSection = document.getElementById('oferta-section');
    ofertaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="projeto45-section projeto45-section-alt">
      <div className="max-w-4xl mx-auto">
        {/* Título */}
        <motion.div {...fadeIn} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--gold-primary)] mb-6">
            <HelpCircle className="w-8 h-8 text-black" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold projeto45-title mb-6">
            PERGUNTAS FREQUENTES
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-muted)]">
            Tire todas as suas dúvidas antes de começar
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="projeto45-card overflow-hidden"
              >
                {/* Pergunta */}
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-start justify-between gap-4 text-left group"
                >
                  <span className="text-lg md:text-xl font-bold text-[var(--text-light)] group-hover:text-[var(--gold-light)] transition-colors">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDown className="w-6 h-6 text-[var(--gold-primary)]" />
                  </motion.div>
                </button>

                {/* Resposta */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-[var(--gold-dark)] mt-4">
                        <p className="text-[var(--text-muted)] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-center mt-16"
        >
          <div className="bg-[var(--bg-dark)] border-2 border-[var(--gold-primary)] rounded-2xl p-8 md:p-12">
            <p className="text-2xl md:text-3xl font-bold mb-6 text-[var(--text-light)]">
              Ainda tem dúvidas?{' '}
              <span className="projeto45-gold-gradient">
                Fale com a gente!
              </span>
            </p>

            <p className="text-[var(--text-muted)] mb-8">
              Entre em contato pelo WhatsApp e tire todas as suas dúvidas antes de garantir sua vaga.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={scrollToOferta}
                className="projeto45-cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                GARANTIR MINHA VAGA
              </motion.button>

              <motion.a
                href="https://wa.me/5511950822727?text=Ol%C3%A1%21%20Estou%20no%20site%20do%20Projeto%2045%20Graus%20e%20gostaria%20de%20tirar%20algumas%20d%C3%BAvidas%20antes%20de%20garantir%20minha%20vaga.%20Pode%20me%20ajudar%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[var(--gold-primary)] text-[var(--gold-primary)] font-bold rounded-lg hover:bg-[var(--gold-primary)] hover:text-black transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                FALAR NO WHATSAPP
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
