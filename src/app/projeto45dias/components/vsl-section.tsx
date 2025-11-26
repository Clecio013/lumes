'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UrgencyBadge } from './urgency-badge';

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

export const VSLSection: React.FC = () => {
  const scrollToOferta = () => {
    const ofertaSection = document.getElementById('oferta-section');
    ofertaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Panda Video configuration
  const pandaVideoId = '367772b9-badc-449c-bdba-3ba05fb62c29';
  const pandaPlayerDomain = 'player-vz-9c8f18da-4c3.tv.pandavideo.com.br';

  // URL parameters for VSL behavior:
  // - autoplay=true: Start playing automatically
  // - muted=true: Start without sound (browser requirement)
  // - mutedIndicatorIcon=true: Show "click to unmute" overlay
  // - mutedIndicatorClickRestart=true: Restart from 0:00 + unmute when clicked
  // - saveProgress=false: Always restart fresh
  const videoParams = new URLSearchParams({
    v: pandaVideoId,
    autoplay: 'true',
    muted: 'true',
    mutedIndicatorIcon: 'true',
    mutedIndicatorClickRestart: 'true',
    mutedIndicatorTextTop: 'CLIQUE AQUI',
    mutedIndicatorTextBottom: 'Para ativar o áudio',
    saveProgress: 'false',
  });

  const videoUrl = `https://${pandaPlayerDomain}/embed/?${videoParams.toString()}`;

  return (
    <section id="vsl-section" className="projeto45-section projeto45-section-alt">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <motion.div {...fadeIn} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold projeto45-title mb-4">
            Assista e descubra como funciona
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-muted)]">
            5 minutos que podem mudar sua vida
          </p>
        </motion.div>

        {/* Player */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border-2 border-[var(--gold-dark)] shadow-2xl"
        >
          <iframe
            id={`panda-${pandaVideoId}`}
            src={videoUrl}
            className="w-full h-full border-0"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Vídeo de Apresentação - Projeto 45 Graus"
            loading="eager"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={scrollToOferta}
            className="projeto45-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            GARANTIR VAGA POR R$ 397
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6"
          >
            <UrgencyBadge />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
