'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const transformations = [
  {
    id: 1,
    title: 'EMAGRECER E GANHAR MASSA MAGRA',
    mainResult: 'Construir um corpo forte e saudável',
    before: {
      image: '/projeto45dias/transformacao/gabriela/antes.png',
      alt: 'Antes da transformação',
    },
    after: {
      image: '/projeto45dias/transformacao/gabriela/depois.png',
      alt: 'Depois da transformação',
    },
    achievements: [
      'Eliminar compulsão alimentar',
      'Melhorar autoestima e confiança',
      'Criar rotina sustentável',
    ],
  },
  {
    id: 2,
    title: 'RECUPERAR ENERGIA',
    mainResult: 'Sentir disposição e vitalidade todos os dias',
    before: {
      image: '/projeto45dias/transformacao/rodrigo/antes.png',
      alt: 'Antes da transformação',
    },
    after: {
      image: '/projeto45dias/transformacao/rodrigo/depois.png',
      alt: 'Depois da transformação',
    },
    achievements: [
      'Triplicar disposição diária',
      'Aderir ao treino regularmente',
      'Melhorar qualidade do sono',
    ],
  },
  {
    id: 3,
    title: 'DESENVOLVER AUTOCONFIANÇA',
    mainResult: 'Conquistar clareza e foco nos objetivos',
    before: {
      image: '/projeto45dias/transformacao/lucas/antes.png',
      alt: 'Antes da transformação',
    },
    after: {
      image: '/projeto45dias/transformacao/lucas/depois.png',
      alt: 'Depois da transformação',
    },
    achievements: [
      'Ganhar clareza sobre objetivos',
      'Desenvolver disciplina consistente',
      'Aumentar autoconfiança',
    ],
  },
];

export function EmotionalTransformationSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return transformations.length - 1;
      if (nextIndex >= transformations.length) return 0;
      return nextIndex;
    });
  };

  const current = transformations[currentIndex];

  return (
    <section className="projeto45-section py-20 bg-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold projeto45-title mb-6">
            TRANSFORMAÇÕES REAIS EM 45 DIAS
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            Não é mágica.{' '}
            <span className="text-gold font-semibold">
              É estratégia, disciplina e acompanhamento profissional.
            </span>
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="relative min-h-[600px] md:min-h-[500px] lg:min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="w-full absolute top-0 left-0 right-0"
              >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-center max-w-6xl mx-auto px-4">
                  {/* Cards ANTES/DEPOIS - Lado Esquerdo */}
                  <div className="flex gap-4 flex-shrink-0">
                    {/* Card ANTES */}
                    <div className="relative w-[140px] sm:w-[180px] md:w-[220px] lg:w-[250px] aspect-[3/4] rounded-xl overflow-hidden border-3 border-red-500">
                      <Image
                        src={current.before.image}
                        alt={current.before.alt}
                        fill
                        className="object-cover"
                        sizes="250px"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                          Antes
                        </span>
                      </div>
                    </div>

                    {/* Card DEPOIS */}
                    <div className="relative w-[140px] sm:w-[180px] md:w-[220px] lg:w-[250px] aspect-[3/4] rounded-xl overflow-hidden border-3 border-gold">
                      <Image
                        src={current.after.image}
                        alt={current.after.alt}
                        fill
                        className="object-cover"
                        sizes="250px"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-gold text-dark text-xs font-bold px-3 py-1 rounded-full uppercase">
                          Depois
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info Card - Lado Direito */}
                  <div className="bg-dark-lighter/90 rounded-2xl border-2 border-gold/20 p-6 sm:p-8 w-full lg:max-w-lg shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                    {/* Título da Transformação */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-gold p-2.5 rounded-full">
                        <TrendingUp className="w-5 h-5 text-dark" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-base sm:text-lg tracking-wide">
                          {current.title}
                        </p>
                      </div>
                    </div>

                    {/* Resultado Principal - DESTAQUE */}
                    <div className="border-2 border-gold rounded-lg px-4 py-5 mb-6 bg-black/20">
                      <p className="text-gold font-bold text-xl sm:text-2xl text-center">
                        {current.mainResult}
                      </p>
                    </div>

                    {/* O que você vai conseguir */}
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">
                        O QUE VOCÊ VAI CONSEGUIR:
                      </p>
                      <ul className="space-y-2.5">
                        {current.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 bg-black/30 p-3 rounded-lg">
                            <div className="bg-gold rounded-full w-1.5 h-1.5 flex-shrink-0 mt-1.5" />
                            <span className="text-gray-200 text-sm leading-relaxed">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-4 mt-18">
            <button
              onClick={() => paginate(-1)}
              className="cursor-pointer bg-dark-lighter hover:bg-dark border-2 border-gold/50 hover:border-gold text-gold rounded-full p-3 transition-all duration-300 hover:scale-110"
              aria-label="Transformação anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicators */}
            <div className="flex items-center gap-2">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`cursor-pointer rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-gold'
                      : 'w-2 h-2 bg-gold/40 hover:bg-gold/70'
                  }`}
                  aria-label={`Ir para transformação ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="cursor-pointer bg-dark-lighter hover:bg-dark border-2 border-gold/50 hover:border-gold text-gold rounded-full p-3 transition-all duration-300 hover:scale-110"
              aria-label="Próxima transformação"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
