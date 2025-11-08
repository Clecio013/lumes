'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { BrandLogo } from './brand-logo';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const HeroSection: React.FC = () => {
  const scrollToOferta = () => {
    const ofertaSection = document.getElementById('oferta-section');
    ofertaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToVSL = () => {
    const vslSection = document.getElementById('vsl-section');
    vslSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Placeholder: foto de profissionais fitness juntos
  const professionalImageUrl =
    '/projeto45dias/seyune-amauri-hero.png';

  return (
    <section className="projeto45-section relative min-h-screen flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Lado Esquerdo: Conteúdo */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
          >
            {/* Logo */}
            <motion.div variants={fadeInUp} className="mb-8">
              <BrandLogo size="sm" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInLeft}
              className="projeto45-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
            >
              <span className="projeto45-gold-gradient">45 DIAS</span>
              <br />
              PARA TRANSFORMAR
              <br />
              CORPO E MENTE
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInLeft}
              className="text-lg md:text-xl lg:text-2xl text-[var(--text-muted)] mb-8 leading-relaxed max-w-xl"
            >
              O único programa que une{' '}
              <span className="text-[var(--gold-primary)] font-semibold">
                nutrição comportamental
              </span>{' '}
              +{' '}
              <span className="text-[var(--gold-primary)] font-semibold">
                treino personalizado
              </span>{' '}
              para resultados que duram
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInLeft} className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                onClick={scrollToOferta}
                className="projeto45-cta"
                style={{ padding: '24px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Garantir minha vaga"
              >
                GARANTIR MINHA VAGA
              </motion.button>

              <motion.button
                onClick={scrollToVSL}
                className="px-8 py-4 rounded-lg border-2 border-[var(--gold-primary)] text-[var(--gold-primary)] font-bold hover:bg-[var(--gold-primary)] hover:text-black transition-all duration-300 flex items-center gap-2 justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Ver como funciona"
              >
                VER COMO FUNCIONA
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowDown className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Badge de urgência */}
            <motion.div variants={fadeInLeft}>
              <div className="inline-flex items-center gap-2 bg-[var(--bg-dark-secondary)] border border-[var(--accent-red)] rounded-full px-6 py-3">
                <motion.span
                  className="w-2 h-2 bg-[var(--accent-red)] rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-[var(--accent-red)] font-semibold text-sm md:text-base uppercase tracking-wider">
                  Vagas Limitadas • Black Friday
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Lado Direito: Foto dos Profissionais */}
          <motion.div
            variants={fadeInRight}
            initial="initial"
            animate="animate"
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] lg:aspect-[3/4] max-w-2xl lg:max-w-5xl mx-auto">
              {/* Imagem */}
              <motion.div
                className="relative w-full h-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <Image
                  src={professionalImageUrl}
                  alt="Seyune e Amauri - Nutricionista e Personal Trainer"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-[var(--text-muted)] text-sm"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="uppercase tracking-widest">Role para baixo</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
