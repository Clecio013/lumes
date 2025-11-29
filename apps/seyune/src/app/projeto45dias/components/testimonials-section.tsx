'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { scrollToOferta } from '../utils/scrollToOferta';
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

// Placeholders baseados na persona (frustração → transformação)
// TODO: Substituir por depoimentos reais quando disponíveis
const testimonials = [
  {
    name: '[Nome do Cliente]',
    age: 32,
    result: 'Perdeu 8kg e ganhou confiança',
    quote:
      'Eu já tinha tentado tantas dietas que achei que nunca ia conseguir. Mas com o projeto, pela primeira vez tive um plano que fazia sentido pra minha rotina. Não foi sobre restrição, foi sobre entender meu corpo.',
    beforeState: 'Frustração cíclica, efeito sanfona',
    afterState: 'Consistência e resultados sustentáveis',
  },
  {
    name: '[Nome do Cliente]',
    age: 28,
    result: 'Ganhou 4kg de massa magra',
    quote:
      'Eu sabia o que precisava fazer, mas não conseguia manter. O diferencial foi ter dois profissionais me guiando de verdade. Não foi mais um desafio de 30 dias, foi uma mudança real.',
    beforeState: 'Sabia o que fazer, mas não mantinha',
    afterState: 'Disciplina e estrutura que funcionam',
  },
  {
    name: '[Nome do Cliente]',
    age: 35,
    result: 'Transformação completa em 45 dias',
    quote:
      'Cansei de começar e parar. Dessa vez foi diferente porque eu tinha direção e suporte constante. Eu voltei a me reconhecer no espelho. Agora eu sei que consigo.',
    beforeState: 'Insegurança corporal, cansaço mental',
    afterState: 'Energia, vitalidade e autoconfiança',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="projeto45-section projeto45-section-alt">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold projeto45-title mb-6">
            QUEM JÁ TRANSFORMOU COM A GENTE
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto">
            Pessoas reais que saíram do ciclo de frustração e{' '}
            <span className="text-[var(--gold-primary)] font-semibold">
              conquistaram resultados que duram
            </span>
            .
          </p>
        </motion.div>

        {/* Grid de Depoimentos */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="projeto45-card relative overflow-hidden"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-16 h-16 text-[var(--gold-primary)]" />
              </div>

              {/* Estrelas */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[var(--gold-primary)] text-[var(--gold-primary)]"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[var(--text-light)] text-lg leading-relaxed mb-6 relative z-10">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Transformação */}
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-[var(--accent-red)] font-semibold flex-shrink-0">
                    Antes:
                  </span>
                  <span className="text-[var(--text-muted)]">
                    {testimonial.beforeState}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--gold-primary)] font-semibold flex-shrink-0">
                    Depois:
                  </span>
                  <span className="text-[var(--text-muted)]">
                    {testimonial.afterState}
                  </span>
                </div>
              </div>

              {/* Autor e resultado */}
              <div className="border-t border-[var(--gold-dark)] pt-4">
                <p className="text-[var(--text-light)] font-bold text-lg">
                  {testimonial.name}, {testimonial.age} anos
                </p>
                <p className="text-[var(--gold-light)] font-semibold text-sm mt-1">
                  {testimonial.result}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Nota sobre placeholders */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-[var(--bg-dark)] border border-[var(--gold-dark)] rounded-xl px-6 py-4">
            <p className="text-[var(--text-muted)] text-sm">
              💡 <span className="font-semibold text-[var(--gold-primary)]">Nota:</span>{' '}
              Depoimentos reais serão adicionados em breve. Estes são baseados nas transformações
              típicas da persona.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-center mt-16"
        >
          <p className="text-2xl md:text-3xl font-bold mb-6 text-[var(--text-light)]">
            Pronto(a) para ser{' '}
            <span className="projeto45-gold-gradient">o próximo caso de sucesso?</span>
          </p>

          <motion.button
            className="projeto45-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToOferta}
          >
            COMEÇAR MINHA TRANSFORMAÇÃO
          </motion.button>

          <div className="mt-6">
            <UrgencyBadge />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
