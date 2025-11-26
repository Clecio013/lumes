'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { getVagasRestantes } from '../lib/vagas-dinamicas';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

export const CountdownTimer: React.FC = () => {
  // Deadline: 28/11/2025 às 23:59:59
  const deadline = new Date('2025-11-28T23:59:59');

  const scrollToOferta = () => {
    const ofertaSection = document.getElementById('oferta-section');
    ofertaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Atualizar imediatamente
    setTimeLeft(calculateTimeLeft());

    // Atualizar a cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Evitar hidratação incorreta (SSR)
  if (!isClient) {
    return null;
  }

  const { days, hours, minutes, seconds } = timeLeft;
  const isEnded = days === 0 && hours === 0 && minutes === 0 && seconds === 0;
  const vagasRestantes = getVagasRestantes();

  return (
    <motion.section
      {...fadeIn}
      className="projeto45-section"
      style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Card de Contador */}
        <div className="projeto45-card relative overflow-hidden">
          {/* Background com gradiente sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-red)]/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative p-8 md:p-12">
            {/* Título */}
            <div className="text-center mb-8">
              <motion.div
                className="flex items-center justify-center gap-3 mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Clock className="w-8 h-8 md:w-10 md:h-10 text-[var(--accent-red)]" />
                <h3 className="text-3xl md:text-4xl font-bold projeto45-title">
                  <span className="text-[var(--accent-red)]">BLACK FRIDAY</span> TERMINA EM:
                </h3>
              </motion.div>

              {isEnded ? (
                <p className="text-lg md:text-xl text-[var(--text-muted)]">
                  Oferta encerrada
                </p>
              ) : (
                <p className="text-lg md:text-xl text-[var(--text-muted)]">
                  Garanta sua vaga com <span className="text-[var(--gold-primary)] font-bold">65% OFF</span> antes que acabe
                </p>
              )}
            </div>

            {/* Contador */}
            {!isEnded && (
              <div className="projeto45-countdown">
                {/* Dias */}
                <motion.div
                  className="projeto45-countdown-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="projeto45-countdown-number">
                    {String(days).padStart(2, '0')}
                  </span>
                  <span className="projeto45-countdown-label">
                    {days === 1 ? 'Dia' : 'Dias'}
                  </span>
                </motion.div>

                {/* Separador */}
                <span className="text-[var(--gold-primary)] text-4xl md:text-5xl font-bold">:</span>

                {/* Horas */}
                <motion.div
                  className="projeto45-countdown-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="projeto45-countdown-number">
                    {String(hours).padStart(2, '0')}
                  </span>
                  <span className="projeto45-countdown-label">
                    {hours === 1 ? 'Hora' : 'Horas'}
                  </span>
                </motion.div>

                {/* Separador */}
                <span className="text-[var(--gold-primary)] text-4xl md:text-5xl font-bold">:</span>

                {/* Minutos */}
                <motion.div
                  className="projeto45-countdown-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="projeto45-countdown-number">
                    {String(minutes).padStart(2, '0')}
                  </span>
                  <span className="projeto45-countdown-label">
                    {minutes === 1 ? 'Min' : 'Min'}
                  </span>
                </motion.div>

                {/* Separador */}
                <span className="text-[var(--gold-primary)] text-4xl md:text-5xl font-bold">:</span>

                {/* Segundos */}
                <motion.div
                  className="projeto45-countdown-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="projeto45-countdown-number">
                    {String(seconds).padStart(2, '0')}
                  </span>
                  <span className="projeto45-countdown-label">
                    {seconds === 1 ? 'Seg' : 'Seg'}
                  </span>
                </motion.div>
              </div>
            )}

            {/* CTA */}
            {!isEnded && (
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                <motion.button
                  onClick={scrollToOferta}
                  className="projeto45-cta"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Garantir minha vaga"
                >
                  GARANTIR MINHA VAGA
                </motion.button>
              </motion.div>
            )}

            {/* Urgência */}
            {!isEnded && (
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 bg-[var(--accent-red)]/20 border border-[var(--accent-red)] rounded-full px-6 py-3">
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
                    ⚠️ Restam apenas {vagasRestantes} vagas • Após sexta-feira volta pra R$ 697
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
