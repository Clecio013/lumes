'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { getVagasRestantes } from '../lib/vagas-dinamicas';

export const UrgencyBadge: React.FC = () => {
  const vagasRestantes = getVagasRestantes();
  return (
    <div className="flex justify-center">
      <motion.div
        className="inline-flex items-center gap-2 bg-dark-lighter border border-gold/30 rounded-full px-4 py-2"
        animate={{
          borderColor: [
            'rgba(212,175,55,0.3)',
            'rgba(212,175,55,0.5)',
            'rgba(212,175,55,0.3)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Ícone sutil */}
        <motion.div
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Zap className="w-3 h-3 md:w-4 md:h-4 text-gold" />
        </motion.div>

        {/* Texto */}
        <span className="text-gray-300 text-xs md:text-sm tracking-wide">
          Black Friday • Restam {vagasRestantes} vagas • Termina sexta-feira
        </span>
      </motion.div>
    </div>
  );
};
