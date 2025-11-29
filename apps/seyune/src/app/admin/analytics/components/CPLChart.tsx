/**
 * CPL Chart Component (Recharts)
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
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

interface CPLChartProps {
  campaigns: Campaign[];
  targetCPL?: number;
}

export function CPLChart({ campaigns, targetCPL = 70 }: CPLChartProps) {
  // Preparar dados
  const data = campaigns
    .filter((c) => c.conversions > 0) // Só campanhas com conversões
    .map((campaign) => ({
      name: campaign.name.length > 20
        ? campaign.name.substring(0, 20) + '...'
        : campaign.name,
      fullName: campaign.name,
      CPL: parseFloat(campaign.cpl.toFixed(2)),
    }))
    .sort((a, b) => a.CPL - b.CPL); // Ordenar por CPL (menor primeiro)

  // Determinar cor baseado no CPL
  const getColor = (cpl: number) => {
    if (cpl < targetCPL * 0.7) return '#10b981'; // Verde (excelente)
    if (cpl <= targetCPL) return '#454c31'; // Verde Seyune (bom)
    if (cpl <= targetCPL * 1.4) return '#f59e0b'; // Amarelo (atenção)
    return '#ef4444'; // Vermelho (crítico)
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        CPL por Campanha
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Custo por Lead (meta: R${targetCPL})
      </p>
      <p className="text-xs text-gray-400 mb-4 italic">
        💡 Passe o mouse sobre as barras para ver detalhes da campanha
      </p>

      {data.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          Nenhuma campanha com conversões
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={false}
              axisLine={false}
            />
            <YAxis
              label={{
                value: 'CPL (R$)',
                angle: -90,
                position: 'insideLeft',
                style: { fontSize: 12, fill: '#6b7280' },
              }}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'CPL']}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.fullName;
                }
                return label;
              }}
            />
            {/* Linha de meta */}
            <ReferenceLine
              y={targetCPL}
              stroke="#874329"
              strokeDasharray="3 3"
              label={{
                value: `Meta: R$${targetCPL}`,
                position: 'right',
                fill: '#874329',
                fontSize: 12,
              }}
            />
            <Bar dataKey="CPL" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.CPL)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Legenda de cores */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-600">Excelente (&lt; R${(targetCPL * 0.7).toFixed(0)})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#454c31]" />
          <span className="text-gray-600">Bom (&le; R${targetCPL})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-gray-600">Atenção</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-gray-600">Crítico</span>
        </div>
      </div>
    </div>
  );
}
