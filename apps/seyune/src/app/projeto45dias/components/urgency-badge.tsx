'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { getRemainingSlots } from '../lib/dynamic-slots';
import { getCopy } from '../lib/campaign-config';

export const UrgencyBadge: React.FC = () => {
  const remainingSlots = getRemainingSlots();
  const copy = getCopy();

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
        {/* Icon */}
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

        {/* Text */}
        <span className="text-gray-300 text-xs md:text-sm tracking-wide">
          {copy.urgencyBadge(remainingSlots)}
        </span>
      </motion.div>
    </div>
  );
};
