/**
 * Performance Chart Component (Recharts)
 */

'use client';

import type { Campaign } from '@lumes/analytics';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PerformanceChartProps {
  campaigns: Campaign[];
}

export function PerformanceChart({ campaigns }: PerformanceChartProps) {
  // Preparar dados para Recharts
  const data = campaigns.map((campaign) => {
    // Nome mais curto: pegar só a parte importante
    let shortName = campaign.name;

    // Se tem padrão [CONVERSAO] [F] Nome... → pegar só "Nome"
    const match = campaign.name.match(/\[.*?\]\s*\[.*?\]\s*(.+)/);
    if (match) {
      shortName = match[1];
    }

    // Limitar a 30 caracteres
    if (shortName.length > 30) {
      shortName = shortName.substring(0, 30) + '...';
    }

    return {
      name: shortName,
      fullName: campaign.name,
      Impressões: campaign.impressions,
      Cliques: campaign.clicks,
      Conversões: campaign.conversions,
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Performance por Campanha
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Comparação de impressões, cliques e conversões
      </p>
      <p className="text-xs text-gray-400 mb-4 italic">
        💡 Passe o mouse sobre as barras para ver detalhes da campanha
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={false}
            axisLine={false}
          />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px',
              padding: '8px 12px',
            }}
            labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
            formatter={(value: number, name: string) => {
              return [new Intl.NumberFormat('pt-BR').format(value), name];
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.fullName;
              }
              return label;
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            iconType="circle"
          />
          <Bar
            dataKey="Impressões"
            fill="#454c31"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
          <Bar
            dataKey="Cliques"
            fill="#874329"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
          <Bar
            dataKey="Conversões"
            fill="#602514"
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
