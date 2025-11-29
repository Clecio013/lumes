'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, FileText, Rocket, ArrowRight } from 'lucide-react';
import { scrollToOferta } from '@/app/projeto45dias/utils/scrollToOferta';
import { UrgencyBadge } from './urgency-badge';

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15,
    },
  },
  viewport: { once: true, margin: '-100px' },
};

const steps = [
  {
    number: '01',
    icon: UserCheck,
    title: 'Consultas Individuais',
    description:
      'Você terá 30 minutos com a Seyune (Nutricionista) e 30 minutos com o Amauri (Personal Trainer). Eles vão entender sua rotina, seus objetivos e suas dificuldades.',
    details: [
      'Anamnese completa',
      'Análise de hábitos atuais',
      'Definição de metas realistas',
      'Entendimento da sua história',
    ],
  },
  {
    number: '02',
    icon: FileText,
    title: 'Planos Personalizados',
    description:
      'Com base nas consultas, você receberá um plano alimentar 100% personalizado e uma planilha de treino individualizada para os próximos 45 dias.',
    details: [
      'Plano nutricional adaptado à sua rotina',
      'Planilha de treino progressiva',
      'Orientações claras e objetivas',
      'Substituições e flexibilidade',
    ],
  },
  {
    number: '03',
    icon: Rocket,
    title: '45 Dias de Transformação',
    description:
      'Coloque os planos em prática com suporte contínuo no grupo VIP. Acompanhamento, dúvidas respondidas e ajustes quando necessário.',
    details: [
      'Grupo VIP no WhatsApp',
      'Suporte durante todo o programa',
      'Ajustes conforme necessário',
      'Comunidade de apoio',
    ],
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="projeto45-section projeto45-section-alt">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold projeto45-title mb-6">
            COMO FUNCIONA O PROJETO
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto">
            3 etapas simples para você ter{' '}
            <span className="text-[var(--gold-primary)] font-semibold">
              clareza, estrutura e resultados
            </span>{' '}
            em 45 dias.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12 md:space-y-16"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <motion.div
                key={index}
                variants={fadeIn}
                className="relative"
              >
                {/* Linha conectora (apenas entre steps) */}
                {!isLast && (
                  <div className="hidden lg:block absolute left-[7.5rem] top-32 w-0.5 h-20 bg-gradient-to-b from-[var(--gold-primary)] to-transparent opacity-30" />
                )}

                {/* Mobile: Stack vertical */}
                <div className="flex flex-col gap-6 lg:hidden">
                  {/* Número + Ícone horizontal */}
                  <div className="flex items-center gap-6">
                    <div className="text-7xl font-bold projeto45-gold-gradient opacity-20 leading-none">
                      {step.number}
                    </div>
                    <div className="w-20 h-20 rounded-full bg-[var(--bg-dark-secondary)] border-2 border-[var(--gold-primary)] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-10 h-10 text-[var(--gold-primary)]" />
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="projeto45-card">
                    <h3 className="text-3xl font-bold mb-4 text-[var(--text-light)]">
                      {step.title}
                    </h3>

                    <p className="text-lg text-[var(--text-muted)] mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-[var(--text-muted)]"
                        >
                          <ArrowRight className="w-5 h-5 text-[var(--gold-primary)] flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Desktop: Tudo na mesma linha */}
                <div className="hidden lg:flex items-start gap-8">
                  {/* Número grande */}
                  <div className="text-8xl font-bold projeto45-gold-gradient opacity-20 leading-none flex-shrink-0">
                    {step.number}
                  </div>

                  {/* Ícone */}
                  <div className="w-24 h-24 rounded-full bg-[var(--bg-dark-secondary)] border-2 border-[var(--gold-primary)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-12 h-12 text-[var(--gold-primary)]" />
                  </div>

                  {/* Conteúdo */}
                  <div className="projeto45-card flex-1">
                    <h3 className="text-4xl font-bold mb-4 text-[var(--text-light)]">
                      {step.title}
                    </h3>

                    <p className="text-lg text-[var(--text-muted)] mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-[var(--text-muted)]"
                        >
                          <ArrowRight className="w-5 h-5 text-[var(--gold-primary)] flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
          <div className="inline-block bg-[var(--bg-dark)] border border-[var(--gold-primary)] rounded-2xl p-8 md:p-12">
            <p className="text-2xl md:text-3xl font-bold mb-6 text-[var(--text-light)]">
              Pronto(a) para ter um plano que{' '}
              <span className="projeto45-gold-gradient">
                funcione pra você?
              </span>
            </p>

            <motion.button
              className="projeto45-cta"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToOferta}
            >
              GARANTIR MINHA VAGA AGORA
            </motion.button>

            <div className="mt-6">
              <UrgencyBadge />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
