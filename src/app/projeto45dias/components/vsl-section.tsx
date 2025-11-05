'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface VSLSectionProps {
  pandaVideoId?: string;
}

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

export const VSLSection: React.FC<VSLSectionProps> = ({ pandaVideoId }) => {
  const [showVideo, setShowVideo] = useState(false);

  const thumbnailUrl =
    '/projeto45dias/thumb-video.png';

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  return (
    <section id="vsl-section" className="projeto45-section projeto45-section-alt">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <motion.div {...fadeIn} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold projeto45-title mb-4">
            Assista e descubra como funciona
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-muted)]">
            3 minutos que podem mudar sua vida
          </p>
        </motion.div>

        {/* Player */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border-2 border-[var(--gold-dark)] shadow-2xl"
        >
          {!showVideo && !pandaVideoId ? (
            // Thumbnail com play button
            <motion.div
              className="relative w-full h-full group cursor-pointer"
              onClick={handlePlayClick}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={thumbnailUrl}
                alt="Thumbnail do vídeo"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-[var(--gold-primary)] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.6)]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Play className="w-10 h-10 md:w-14 md:h-14 text-black fill-black ml-1" />
                </motion.div>
              </div>

              {/* Badge */}
              <motion.div
                className="absolute top-4 left-4 bg-[var(--gold-primary)] text-black font-bold px-4 py-2 rounded-full text-sm uppercase tracking-wider"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Assistir agora
              </motion.div>
            </motion.div>
          ) : pandaVideoId ? (
            // Embed real do Panda Video
            <iframe
              src={`https://player-vz-dc3c6a74-8a9.tv.pandavideo.com.br/embed/?v=${pandaVideoId}`}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              title="Vídeo Projeto 45 Graus"
              loading="lazy"
            />
          ) : (
            // Placeholder loading
            <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--bg-dark-secondary)]">
              <motion.div
                className="w-20 h-20 border-4 border-[var(--gold-primary)] border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-[var(--text-muted)] mt-4">Carregando vídeo...</p>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                (Placeholder - adicionar ID do Panda Video)
              </p>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-center mt-12"
        >
          <motion.button
            className="projeto45-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            QUERO GARANTIR MINHA VAGA
          </motion.button>

          <motion.p
            className="text-[var(--text-muted)] mt-4 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            ⚡ Apenas{' '}
            <span className="text-[var(--gold-primary)] font-bold">25 vagas</span>{' '}
            neste lote
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
