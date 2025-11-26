'use client';

import React, { useState } from 'react';
import { Check, TrendingUp } from 'lucide-react';
import { UrgencyBadge } from './urgency-badge';
import { uniqueBatch, formatPrice } from '../lib/batches-config';
import { useTracking } from '@/hooks/useTracking';

export const OfertaSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { trackInitiateCheckout } = useTracking();
  const currentBatch = uniqueBatch();
  const nextBatch = null;
  const savings = 0;
  const campaignEnded = false;

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      // Disparar evento InitiateCheckout (Meta Pixel + GA4)
      trackInitiateCheckout('oferta-section', currentBatch.promotionalPrice);

      // Criar sessão de checkout no Stripe (sem metadata de formulário)
      const response = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar checkout');
      }

      // Redirecionar para checkout do Stripe
      window.location.href = data.url;
    } catch (error) {
      console.error('Erro ao criar checkout:', error);
      alert('Erro ao processar checkout. Tente novamente.');
      setIsLoading(false);
    }
  };

  const discount = currentBatch.originalPrice - currentBatch.promotionalPrice;
  const discountPercentage = Math.round((discount / currentBatch.originalPrice) * 100);

  return (
    <section id="oferta-section" className="projeto45-section">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold projeto45-title mb-4">
            GARANTA SUA VAGA
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-muted)]">
            Transformação completa em 45 dias
          </p>
        </div>

        {/* Card de Oferta */}
        <div className="projeto45-card max-w-4xl mx-auto relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 p-8 md:p-12">
            {/* Lado esquerdo: Preço */}
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-[var(--gold-dark)] pb-8 md:pb-0 md:pr-8">
              {/* Preço original */}
              <div className="mb-4">
                <span className="text-[var(--text-muted)] text-lg line-through">
                  De R$ {formatPrice(currentBatch.originalPrice)}
                </span>
              </div>

              {/* Preço promocional */}
              <div className="mb-2">
                <span className="text-[var(--text-muted)] text-xl">Por apenas</span>
              </div>
              <div className="mb-4">
                <span className="text-6xl md:text-7xl font-bold projeto45-gold-gradient">
                  R$ {currentBatch.promotionalPrice}
                </span>
              </div>

              {/* Badge de desconto */}
              <div className="inline-flex items-center gap-2 bg-[var(--gold-primary)] text-black font-bold px-4 py-2 rounded-full mb-6">
                <TrendingUp className="w-5 h-5" />
                <span>{discountPercentage}% OFF</span>
              </div>

              {/* Parcelamento */}
              <div className="text-[var(--text-muted)] mb-4">
                ou até <span className="text-[var(--gold-primary)] font-bold">12x de R$ {formatPrice((currentBatch.promotionalPrice / 12))}</span>
              </div>
            </div>

            {/* Lado direito: O que está incluso */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6 text-[var(--gold-primary)]">
                O que você recebe:
              </h3>

              <ul className="space-y-4">
                {[
                  'Consulta individual de 30min com Seyune (Nutricionista)',
                  'Consulta individual de 30min com Amauri (Personal Trainer)',
                  'Plano alimentar 100% personalizado',
                  'Planilha de treino individualizada para 45 dias',
                  'Acesso aos apps WebDiet e MFit Personal (45 dias)',
                  'Acesso ao grupo VIP no WhatsApp (45 dias)',
                  '5 guias exclusivos (seus para sempre)',
                  'Suporte profissional durante os 45 dias',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-[var(--gold-primary)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-light)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Badge de urgência */}
          <div className="border-t border-[var(--gold-dark)] pt-8 pb-4 px-8">
            <UrgencyBadge />
          </div>

          {/* CTA */}
          <div className="px-8 pb-8">
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="projeto45-cta-green w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'PROCESSANDO...' : '✅ GARANTIR VAGA POR R$ 397'}
            </button>

            {/* Urgência */}
            <p className="text-center text-[var(--text-muted)] text-sm mt-4">
              ⏰ Black Friday termina <span className="text-[var(--accent-red)] font-bold">sexta-feira</span> • Depois volta pra R$ 697
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OfertaSection;
