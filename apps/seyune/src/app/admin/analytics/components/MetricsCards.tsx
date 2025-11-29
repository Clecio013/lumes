/**
 * Metrics Cards Component
 */

'use client';

import type { CampaignMetrics } from '@lumes/analytics';
import { DollarSign, Eye, MousePointerClick, Target, TrendingUp, TrendingDown, Gauge, Users, Repeat } from 'lucide-react';

interface MetricsCardsProps {
  metrics: CampaignMetrics;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'terracota' | 'verde' | 'marrom';
}

function MetricCard({ title, value, subtitle, icon, trend, color = 'terracota' }: MetricCardProps) {
  const colorClasses = {
    terracota: 'bg-[#874329]/10 text-[#874329]',
    verde: 'bg-[#454c31]/10 text-[#454c31]',
    marrom: 'bg-[#602514]/10 text-[#602514]',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : trend === 'down' ? (
            <TrendingDown className="w-4 h-4 text-red-600" />
          ) : null}
          <span
            className={`text-xs font-medium ${
              trend === 'up'
                ? 'text-green-600'
                : trend === 'down'
                ? 'text-red-600'
                : 'text-gray-500'
            }`}
          >
            {trend === 'neutral' && 'Estável'}
          </span>
        </div>
      )}
    </div>
  );
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* Gasto Total */}
      <MetricCard
        title="Gasto Total"
        value={formatCurrency(metrics.totalSpent)}
        icon={<DollarSign className="w-6 h-6" />}
        color="terracota"
      />

      {/* Impressões */}
      <MetricCard
        title="Impressões"
        value={formatNumber(metrics.totalImpressions)}
        subtitle={`CTR: ${metrics.avgCTR.toFixed(2)}%`}
        icon={<Eye className="w-6 h-6" />}
        color="verde"
      />

      {/* Cliques */}
      <MetricCard
        title="Cliques"
        value={formatNumber(metrics.totalClicks)}
        subtitle={`CPC: ${formatCurrency(metrics.avgCPC)}`}
        icon={<MousePointerClick className="w-6 h-6" />}
        color="marrom"
      />

      {/* Conversões */}
      <MetricCard
        title="Conversões"
        value={formatNumber(metrics.totalConversions)}
        subtitle={`CPL: ${formatCurrency(metrics.avgCPL)}`}
        icon={<Target className="w-6 h-6" />}
        color="terracota"
        trend={
          metrics.avgCPL < 50
            ? 'up'
            : metrics.avgCPL > 70
            ? 'down'
            : 'neutral'
        }
      />

      {/* CPM Médio */}
      <MetricCard
        title="CPM Médio"
        value={formatCurrency(metrics.avgCPM)}
        subtitle="Custo por mil impressões"
        icon={<Gauge className="w-6 h-6" />}
        color="verde"
        trend={
          metrics.avgCPM < 20
            ? 'up'
            : metrics.avgCPM > 30
            ? 'down'
            : 'neutral'
        }
      />

      {/* Frequência Média (se disponível) */}
      {metrics.avgFrequency !== undefined && (
        <MetricCard
          title="Frequência Média"
          value={metrics.avgFrequency.toFixed(2)}
          subtitle="Vezes que anúncio é visto"
          icon={<Repeat className="w-6 h-6" />}
          color="marrom"
          trend={
            metrics.avgFrequency < 2
              ? 'neutral'
              : metrics.avgFrequency > 3
              ? 'down'
              : 'neutral'
          }
        />
      )}

      {/* Alcance Total (se disponível) */}
      {metrics.totalReach !== undefined && (
        <MetricCard
          title="Alcance Total"
          value={formatNumber(metrics.totalReach)}
          subtitle="Pessoas únicas alcançadas"
          icon={<Users className="w-6 h-6" />}
          color="verde"
        />
      )}
    </div>
  );
}
