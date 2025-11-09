'use client';

import { Check, Shield, Clock, Users } from 'lucide-react';
import { BrandLogo } from '../../components/brand-logo';
import { formatPrice } from '../../lib/batches-config';

interface OrderSummaryProps {
  amount: number;
}

export function OrderSummary({ amount }: OrderSummaryProps) {
  return (
    <div className="bg-[#151515] border border-[#d4af37]/30 rounded-2xl p-6 md:p-8 lg:sticky lg:top-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <BrandLogo size="md" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#d4af37' }}>
        Resumo da Compra
      </h2>

      {/* Produto */}
      <div className="mb-6 pb-6 border-b border-[#1a1a1a]">
        <h3 className="text-xl font-bold mb-2 text-white">Projeto 45 Graus</h3>
        <p className="text-[#a8a8a8] text-sm mb-4">
          Programa completo de transformação física e mental em 45 dias
        </p>
        <div className="flex justify-between items-center">
          <span className="text-[#a8a8a8]">Valor total:</span>
          <span className="text-3xl md:text-4xl font-bold" style={{ color: '#d4af37' }}>
            {formatPrice(amount)}
          </span>
        </div>
      </div>

      {/* O que está incluído */}
      <div className="mb-6">
        <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
          <Check className="w-5 h-5" style={{ color: '#d4af37' }} />
          O que está incluído:
        </h4>
        <ul className="space-y-3 text-sm text-[#a8a8a8]">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#d4af37' }} />
            <span>Consulta individual de 30min com Seyune (Nutricionista)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#d4af37' }} />
            <span>Consulta individual de 30min com Amauri (Personal Trainer)</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#d4af37' }} />
            <span>Plano alimentar 100% personalizado</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#d4af37' }} />
            <span>Planilha de treino individualizada para 45 dias</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#d4af37' }} />
            <span>Grupo VIP WhatsApp com suporte direto</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#d4af37' }} />
            <span>Acompanhamento durante todo o programa</span>
          </li>
        </ul>
      </div>

      {/* Garantias */}
      <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3 text-[#a8a8a8]">
          <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-sm">Garantia de 7 dias (satisfação ou devolução)</span>
        </div>
        <div className="flex items-center gap-3 text-[#a8a8a8]">
          <Clock className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} />
          <span className="text-sm">Início do programa: 15 de Dezembro de 2025</span>
        </div>
        <div className="flex items-center gap-3 text-[#a8a8a8]">
          <Users className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} />
          <span className="text-sm">Acesso vitalício ao grupo VIP</span>
        </div>
      </div>
    </div>
  );
}
