'use client';

import React, { useState } from 'react';
import { Check, Zap, TrendingUp } from 'lucide-react';
import { UrgencyBadge } from './urgency-badge';
import { getCurrentBatch, getNextBatch, calculateSavings, isCampaignEnded, formatPrice } from '../lib/batches-config';

export const OfertaSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentBatch = getCurrentBatch();
  const nextBatch = getNextBatch();
  const savings = calculateSavings();
  const campaignEnded = isCampaignEnded();

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Erro ao criar checkout');
      }

      const data = await res.json();

      // Redirecionar para checkout do Mercado Pago
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('Erro ao criar checkout:', error);
      alert('Erro ao processar sua solicitação. Tente novamente.');
      setIsLoading(false);
    }
  };

  if (campaignEnded) {
    return (
      <section className="projeto45-section text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold projeto45-title mb-6">
            Campanha Encerrada
          </h2>
          <p className="text-xl text-[var(--text-muted)]">
            As vagas para o Projeto 45 Graus se esgotaram.
            <br />
            Entre em contato para saber sobre a próxima turma.
          </p>
        </div>
      </section>
    );
  }

  if (!currentBatch) {
    return (
      <section className="projeto45-section text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-[var(--text-muted)]">
            Carregando informações da oferta...
          </p>
        </div>
      </section>
    );
  }

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

              {/* Alerta de economia */}
              {nextBatch && savings > 0 && (
                <div className="bg-[var(--bg-dark)] border border-[var(--accent-red)] rounded-lg p-4 w-full">
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-[var(--accent-red)] flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-[var(--text-light)] font-semibold mb-1">
                        Próximo lote: R$ {nextBatch.promotionalPrice}
                      </p>
                      <p className="text-[var(--text-muted)]">
                        Economize R$ {savings} garantindo agora
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
                  'Acesso ao grupo VIP no WhatsApp',
                  'Suporte durante todo o programa',
                  'Garantia de 7 dias (satisfação ou devolução)',
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
              {isLoading ? 'PROCESSANDO...' : '✅ GARANTIR MINHA VAGA AGORA'}
            </button>

            {/* Urgência */}
            <p className="text-center text-[var(--text-muted)] text-sm mt-4">
              🔥 <span className="text-[var(--accent-red)] font-bold">Vagas limitadas</span> • Preço aumenta em breve
            </p>
          </div>
        </div>

        {/* Garantia */}
        <div className="text-center mt-8">
          <p className="text-[var(--text-muted)] text-sm">
            🛡️ <span className="text-[var(--gold-primary)] font-semibold">Garantia de 7 dias</span> - Se não gostar, devolvemos seu dinheiro
          </p>
        </div>
      </div>
    </section>
  );
};

export default OfertaSection;
