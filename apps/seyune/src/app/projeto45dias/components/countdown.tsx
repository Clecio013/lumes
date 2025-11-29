'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownProps {
  targetDate: string; // ISO format
  onComplete?: () => void;
}

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsExpired(true);
        if (onComplete) onComplete();
        return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
      }

      return {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    };

    // Atualiza a cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (isExpired) {
    return (
      <div className="text-center py-4">
        <p className="text-[var(--accent-red)] text-lg font-bold uppercase tracking-wider">
          ⚠️ Este lote encerrou
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Label */}
      <div className="flex items-center gap-2 text-[var(--text-muted)] uppercase tracking-widest text-sm">
        <Clock className="w-5 h-5 text-[var(--gold-primary)]" />
        <span>Termina em</span>
      </div>

      {/* Contador */}
      <div className="projeto45-countdown">
        <div className="projeto45-countdown-item">
          <span className="projeto45-countdown-number">
            {String(timeLeft.dias).padStart(2, '0')}
          </span>
          <span className="projeto45-countdown-label">
            {timeLeft.dias === 1 ? 'Dia' : 'Dias'}
          </span>
        </div>

        <div className="projeto45-countdown-item">
          <span className="projeto45-countdown-number">
            {String(timeLeft.horas).padStart(2, '0')}
          </span>
          <span className="projeto45-countdown-label">Horas</span>
        </div>

        <div className="projeto45-countdown-item">
          <span className="projeto45-countdown-number">
            {String(timeLeft.minutos).padStart(2, '0')}
          </span>
          <span className="projeto45-countdown-label">Min</span>
        </div>

        <div className="projeto45-countdown-item">
          <span className="projeto45-countdown-number">
            {String(timeLeft.segundos).padStart(2, '0')}
          </span>
          <span className="projeto45-countdown-label">Seg</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
