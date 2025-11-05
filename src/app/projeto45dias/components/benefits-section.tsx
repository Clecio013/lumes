'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Brain, Calendar, TrendingUp, Heart, Zap } from 'lucide-react';

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
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true, margin: '-100px' },
};

const benefits = [
  {
    icon: Target,
    title: 'Plano 100% Personalizado',
    description:
      'Esqueça os protocolos genéricos. Você terá um plano de nutrição e treino feito exclusivamente para sua rotina, seus objetivos e seu corpo.',
  },
  {
    icon: Brain,
    title: 'Nutrição Comportamental',
    description:
      'Sem restrições extremas ou culpa. Aprenda a ter uma relação saudável com a comida, entendendo suas emoções e padrões alimentares.',
  },
  {
    icon: Calendar,
    title: 'Resultados em 45 Dias',
    description:
      'Um período estratégico para criar hábitos sustentáveis. Você verá mudanças reais no corpo e na mente, sem sofrimento ou efeito sanfona.',
  },
  {
    icon: TrendingUp,
    title: 'Acompanhamento Profissional',
    description:
      'Suporte direto com nutricionista e personal trainer durante todo o programa. Você não estará sozinho(a) em nenhum momento da jornada.',
  },
  {
    icon: Heart,
    title: 'Transformação Integral',
    description:
      'Muito além da balança. Ganhe energia, disposição, autoconfiança e a sensação de estar no controle do seu corpo e da sua vida.',
  },
  {
    icon: Zap,
    title: 'Método Realista',
    description:
      'Sem promessas milagrosas. Um caminho estratégico, baseado em ciência, que respeita seu ritmo e prioriza resultados que você pode manter.',
  },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section className="projeto45-section">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold projeto45-title mb-6">
            POR QUE ESSE PROJETO É DIFERENTE
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto">
            Não é mais um desafio. É um plano estratégico para você{' '}
            <span className="text-[var(--gold-primary)] font-semibold">
              provar pra si mesmo(a)
            </span>{' '}
            que ainda é capaz de fazer acontecer.
          </p>
        </motion.div>

        {/* Grid de Benefícios */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={fadeIn}
                className="projeto45-card group"
              >
                {/* Ícone */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-[var(--bg-dark)] border-2 border-[var(--gold-primary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[var(--gold-primary)]" />
                  </div>
                </div>

                {/* Título */}
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-light)]">
                  {benefit.title}
                </h3>

                {/* Descrição */}
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-center mt-16"
        >
          <motion.button
            className="projeto45-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            QUERO COMEÇAR MINHA TRANSFORMAÇÃO
          </motion.button>

          <p className="text-[var(--text-muted)] mt-6 text-sm">
            🔥 Vagas limitadas •{' '}
            <span className="text-[var(--gold-primary)] font-semibold">
              Próximo lote com preço maior
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
