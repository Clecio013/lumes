'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

// Placeholders com imagens do Unsplash
// TODO: Substituir por fotos reais de transformações quando disponíveis
const transformations = [
  {
    name: 'Enzo Faria Limer',
    age: 29,
    result: '+7kg de massa',
    beforeImage: '/projeto45dias/transformacao/enzo/antes.png',
    afterImage: '/projeto45dias/transformacao/enzo/depois.png',
    achievements: ['Ganhou 7kg de massa magra', 'Sente mais confiança', 'Melhorou disposição'],
  },
  {
    name: 'Elizabete Santos',
    age: 34,
    result: '+5kg de massa magra',
    beforeImage: '/projeto45dias/transformacao/elizabeth/antes.png',
    afterImage: '/projeto45dias/transformacao/elizabeth/depois.png',
    achievements: ['Emagreceu e definiu', 'Melhorou autoestima', 'Hábitos sustentáveis'],
  },
  {
    name: '[Nome do Cliente 3]',
    age: 31,
    result: 'Transformação completa',
    beforeImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=600&fit=crop',
    achievements: ['Emagreceu e definiu', 'Melhorou autoestima', 'Hábitos sustentáveis'],
  },
];

export const TransformationsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? transformations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === transformations.length - 1 ? 0 : prev + 1));
  };

  const currentTransformation = transformations[currentIndex];

  return (
    <section className="projeto45-section">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold projeto45-title mb-6">
            TRANSFORMAÇÕES REAIS EM 45 DIAS
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto">
            Não é mágica.{' '}
            <span className="text-[var(--gold-primary)] font-semibold">
              É estratégia, disciplina e acompanhamento profissional
            </span>
            .
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Antes & Depois - Imagens lado a lado */}
              <div className="grid grid-cols-2 gap-4">
                {/* ANTES */}
                <div className="relative">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-[var(--accent-red)]">
                    <Image
                      src={currentTransformation.beforeImage}
                      alt={`Antes - ${currentTransformation.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-[var(--accent-red)] text-white font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wider">
                    Antes
                  </div>
                </div>

                {/* DEPOIS */}
                <div className="relative">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-[var(--gold-primary)]">
                    <Image
                      src={currentTransformation.afterImage}
                      alt={`Depois - ${currentTransformation.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-[var(--gold-primary)] text-black font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wider">
                    Depois
                  </div>
                </div>
              </div>

              {/* Informações */}
              <div className="projeto45-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold-primary)] flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-light)]">
                      {currentTransformation.name}
                    </h3>
                    <p className="text-[var(--text-muted)]">
                      {currentTransformation.age} anos
                    </p>
                  </div>
                </div>

                {/* Resultado principal */}
                <div className="bg-[var(--bg-dark)] border-2 border-[var(--gold-primary)] rounded-xl p-6 mb-6">
                  <p className="text-4xl font-bold projeto45-gold-gradient text-center">
                    {currentTransformation.result}
                  </p>
                </div>

                {/* Conquistas */}
                <div className="space-y-3">
                  <p className="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-sm">
                    Conquistas:
                  </p>
                  {currentTransformation.achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-[var(--bg-dark)] rounded-lg p-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--gold-primary)]" />
                      <span className="text-[var(--text-light)]">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles do Carousel */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <motion.button
              onClick={handlePrevious}
              className="w-12 h-12 rounded-full bg-[var(--bg-dark-secondary)] border-2 border-[var(--gold-primary)] flex items-center justify-center hover:bg-[var(--gold-primary)] hover:text-black transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Indicadores */}
            <div className="flex gap-2">
              {transformations.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-[var(--gold-primary)]'
                      : 'w-2 bg-[var(--text-muted)]'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-[var(--bg-dark-secondary)] border-2 border-[var(--gold-primary)] flex items-center justify-center hover:bg-[var(--gold-primary)] hover:text-black transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Nota sobre placeholders */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-[var(--bg-dark)] border border-[var(--gold-dark)] rounded-xl px-6 py-4">
            <p className="text-[var(--text-muted)] text-sm">
              💡 <span className="font-semibold text-[var(--gold-primary)]">Nota:</span>{' '}
              Fotos reais de transformações serão adicionadas em breve. Estrutura pronta para atualização.
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
            Você também pode{' '}
            <span className="projeto45-gold-gradient">transformar em 45 dias</span>
          </p>

          <motion.button
            className="projeto45-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            QUERO MINHA TRANSFORMAÇÃO
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationsSection;
