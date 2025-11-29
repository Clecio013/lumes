/**
 * Conversion Funnel Component
 * Shows: Impressões → Cliques → Conversões
 */

'use client';

import type { CampaignMetrics } from '@lumes/analytics';
import { TrendingDown } from 'lucide-react';

interface ConversionFunnelProps {
  metrics: CampaignMetrics;
}

export function ConversionFunnel({ metrics }: ConversionFunnelProps) {
  // Calcular percentuais
  const impressions = metrics.totalImpressions;
  const clicks = metrics.totalClicks;
  const conversions = metrics.totalConversions;

  // CTR: (Cliques / Impressões) × 100
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

  // Conversion Rate: (Conversões / Cliques) × 100
  const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;

  // Percentual visual para largura das barras (normalizado)
  const clicksPercent = impressions > 0 ? (clicks / impressions) * 100 : 0;
  const conversionsPercent = impressions > 0 ? (conversions / impressions) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingDown className="w-5 h-5 text-[#874329]" />
        <h3 className="text-lg font-semibold text-gray-900">
          Funil de Conversão
        </h3>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Visualização do fluxo de pessoas até o clique no WhatsApp
      </p>

      {/* Funnel Visualization */}
      <div className="max-w-2xl mx-auto space-y-3">
        {/* Stage 1: Impressões (top - widest) */}
        <div className="relative">
          <div
            className="h-24 bg-[#454c31] flex flex-col items-center justify-center text-white relative"
            style={{
              clipPath: 'polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)',
            }}
          >
            <span className="text-sm font-medium opacity-90">Impressões</span>
            <span className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR').format(impressions)}
            </span>
            <span className="text-xs opacity-75">100%</span>
          </div>
        </div>

        {/* Drop-off 1 */}
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <span className="text-xs text-gray-600">
              <strong>CTR {ctr.toFixed(2)}%</strong> • {new Intl.NumberFormat('pt-BR').format(impressions - clicks)} perdidos
            </span>
          </div>
        </div>

        {/* Stage 2: Cliques (middle) */}
        <div className="relative">
          <div
            className="h-24 bg-[#874329] flex flex-col items-center justify-center text-white relative"
            style={{
              clipPath: 'polygon(20% 0%, 80% 0%, 70% 100%, 30% 100%)',
            }}
          >
            <span className="text-sm font-medium opacity-90">Cliques</span>
            <span className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR').format(clicks)}
            </span>
            <span className="text-xs opacity-75">{clicksPercent.toFixed(1)}%</span>
          </div>
        </div>

        {/* Drop-off 2 */}
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <span className="text-xs text-gray-600">
              <strong>Taxa {conversionRate.toFixed(2)}%</strong> • {new Intl.NumberFormat('pt-BR').format(clicks - conversions)} perdidos
            </span>
          </div>
        </div>

        {/* Stage 3: Conversões (bottom - narrowest) */}
        <div className="relative">
          <div
            className="h-24 bg-[#602514] flex flex-col items-center justify-center text-white relative"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 60% 100%, 40% 100%)',
            }}
          >
            <span className="text-sm font-medium opacity-90">Conversões</span>
            <span className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR').format(conversions)}
            </span>
            <span className="text-xs opacity-75">{conversionsPercent.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Summary Stats with Benchmarks */}
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CTR Benchmark */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">CTR Médio</p>
            <p className="text-2xl font-semibold text-[#874329]">
              {ctr.toFixed(2)}%
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  ctr >= 2 ? 'bg-green-500' : ctr >= 1 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((ctr / 3) * 100, 100)}%` }}
              />
            </div>
            {/* Benchmark Markers */}
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0%</span>
              <span className="text-amber-600 font-medium">1%</span>
              <span className="text-green-600 font-medium">2%</span>
              <span>3%+</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">
              {ctr >= 2 ? '✅ Ótimo desempenho' : ctr >= 1 ? '⚠️ Performance normal' : '🔴 Precisa melhorar'}
            </span>
            <span className="font-medium text-gray-700">
              Meta: 2%+
            </span>
          </div>
        </div>

        {/* Conversion Rate Benchmark */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Taxa de Conversão</p>
            <p className="text-2xl font-semibold text-[#602514]">
              {conversionRate.toFixed(2)}%
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  conversionRate >= 5 ? 'bg-green-500' : conversionRate >= 2 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((conversionRate / 8) * 100, 100)}%` }}
              />
            </div>
            {/* Benchmark Markers */}
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0%</span>
              <span className="text-amber-600 font-medium">2%</span>
              <span className="text-green-600 font-medium">5%</span>
              <span>8%+</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">
              {conversionRate >= 5 ? '✅ Excelente conversão' : conversionRate >= 2 ? '⚠️ Boa conversão' : '🔴 Precisa otimizar'}
            </span>
            <span className="font-medium text-gray-700">
              Meta: 5%+
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
