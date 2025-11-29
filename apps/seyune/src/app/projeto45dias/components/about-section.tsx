'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Heart, Target } from 'lucide-react';
import { scrollToOferta } from '../utils/scrollToOferta';

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const professionals = [
  {
    name: 'Seyune',
    role: 'Nutricionista',
    credentials: 'CRN-3 90419/P',
    image: '/images/seyune/ensaio/image1.jpg',
    bio: 'Formada pelo Centro Universitário São Camilo (2021-2025), especializando em Nutrição Comportamental e Clínica. Acredito que comer bem vai muito além dos nutrientes – envolve cultura, emoções, histórias e acolhimento.',
    approach:
      'Minha paixão pela nutrição surgiu do prazer de comer, reconhecendo a alimentação como um remédio natural que promove saúde e bem-estar. Venho de uma família chinesa, com uma cultura alimentar muito diferente da maioria, o que me fez entender desde cedo que cada pessoa tem sua própria história com a comida.',
    highlights: [
      {
        icon: Heart,
        text: 'Nutrição Comportamental',
      },
      {
        icon: Target,
        text: 'Relação saudável com comida',
      },
      {
        icon: Award,
        text: 'Sem restrições extremas',
      },
    ],
  },
  {
    name: 'Amauri',
    role: 'Personal Trainer',
    credentials: 'CREF 155584-G/SP',
    image: '/projeto45dias/amauri/ensaio.png',
    bio: 'Formado em Educação Física pela Uniitalo, especialista em treino de hipertrofia e emagrecimento. Com curso de extensão pela Core360 focado em treinamento funcional, desenvolvo programas que aliam técnica, segurança e resultados comprovados.',
    approach:
      'Meu método de treinamento induz você a superar suas próprias expectativas. Acredito que quando você entende que a dedicação é o caminho, os resultados surgem naturalmente. Treino não é sobre sofrer — é sobre evoluir de forma consistente e sustentável.',
    highlights: [
      {
        icon: Target,
        text: 'Especialista em hipertrofia',
      },
      {
        icon: Heart,
        text: 'Treinamento funcional',
      },
      {
        icon: Award,
        text: 'Superação de expectativas',
      },
    ],
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section className="projeto45-section">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold projeto45-title mb-6">
            QUEM VAI TE GUIAR
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto">
            Dois profissionais{' '}
            <span className="text-[var(--gold-primary)] font-semibold">
              apaixonados por transformação real
            </span>
            , sem promessas milagrosas.
          </p>
        </motion.div>

        {/* Profissionais */}
        <div className="space-y-24">
          {professionals.map((professional, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  !isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Imagem */}
                <motion.div
                  variants={isEven ? fadeInLeft : fadeInRight}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true, margin: '-100px' }}
                  className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-[var(--gold-dark)]">
                    <Image
                      src={professional.image}
                      alt={professional.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badge com nome e role */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-4xl font-bold text-white mb-1">
                        {professional.name}
                      </h3>
                      <p className="text-[var(--gold-light)] text-lg font-semibold">
                        {professional.role}
                      </p>
                      <p className="text-white/80 text-sm mt-1">
                        {professional.credentials}
                      </p>
                    </div>
                  </div>

                  {/* Moldura dourada decorativa */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-[var(--gold-primary)] rounded-tl-2xl opacity-40" />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-[var(--gold-primary)] rounded-br-2xl opacity-40" />
                </motion.div>

                {/* Conteúdo */}
                <motion.div
                  variants={isEven ? fadeInRight : fadeInLeft}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true, margin: '-100px' }}
                  className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}
                >
                  {/* Bio */}
                  <div className="mb-8">
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-4">
                      {professional.bio}
                    </p>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                      {professional.approach}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-4">
                    {professional.highlights.map((highlight, idx) => {
                      const Icon = highlight.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-4 bg-[var(--bg-dark-secondary)] border border-[var(--gold-dark)] rounded-xl p-4"
                        >
                          <div className="w-12 h-12 rounded-full bg-[var(--bg-dark)] border-2 border-[var(--gold-primary)] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-[var(--gold-primary)]" />
                          </div>
                          <span className="text-[var(--text-light)] font-semibold text-lg">
                            {highlight.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-center mt-20"
        >
          <div className="inline-block bg-[var(--bg-dark-secondary)] border-2 border-[var(--gold-primary)] rounded-2xl p-8 md:p-12">
            <p className="text-2xl md:text-3xl font-bold mb-2 text-[var(--text-light)]">
              Quer ter esses profissionais{' '}
              <span className="projeto45-gold-gradient">te guiando?</span>
            </p>
            <p className="text-lg text-[var(--text-muted)] mb-8">
              Consultoria individual com cada um + planos personalizados
            </p>

            <motion.button
              className="projeto45-cta"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToOferta}
            >
              QUERO MINHA CONSULTORIA
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
