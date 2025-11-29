/**
 * Campaigns Table Component
 */

'use client';

import { useState } from 'react';
import type { Campaign } from '@lumes/analytics';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface CampaignsTableProps {
  campaigns: Campaign[];
}

type SortKey = keyof Campaign;
type SortOrder = 'asc' | 'desc';

// Helper component for sort icons (moved outside to avoid re-creation on render)
function SortIcon({
  columnKey,
  sortKey,
  sortOrder,
}: {
  columnKey: SortKey;
  sortKey: SortKey;
  sortOrder: SortOrder;
}) {
  if (sortKey !== columnKey) {
    return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
  }
  return sortOrder === 'asc' ? (
    <ArrowUp className="w-4 h-4 text-[#874329]" />
  ) : (
    <ArrowDown className="w-4 h-4 text-[#874329]" />
  );
}

export function CampaignsTable({ campaigns }: CampaignsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('cpl');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return 0;
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat('pt-BR').format(value);

  const getStatusBadge = (cpl: number, conversions: number) => {
    if (conversions === 0) {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">Sem conversões</span>;
    }
    if (cpl < 50) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">Excelente</span>;
    }
    if (cpl <= 70) {
      return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">Bom</span>;
    }
    if (cpl <= 98) {
      return <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded">Atenção</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded">Crítico</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Detalhamento de Campanhas
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Clique nos cabeçalhos para ordenar
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Campanha
                  <SortIcon columnKey="name" sortKey={sortKey} sortOrder={sortOrder} />
                </div>
              </th>
              <th
                onClick={() => handleSort('impressions')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center justify-end gap-2">
                  Impressões
                  <SortIcon columnKey="impressions" sortKey={sortKey} sortOrder={sortOrder} />
                </div>
              </th>
              <th
                onClick={() => handleSort('clicks')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center justify-end gap-2">
                  Cliques
                  <SortIcon columnKey="clicks" sortKey={sortKey} sortOrder={sortOrder} />
                </div>
              </th>
              <th
                onClick={() => handleSort('conversions')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center justify-end gap-2">
                  Conversões
                  <SortIcon columnKey="conversions" sortKey={sortKey} sortOrder={sortOrder} />
                </div>
              </th>
              <th
                onClick={() => handleSort('amountSpent')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center justify-end gap-2">
                  Gasto
                  <SortIcon columnKey="amountSpent" sortKey={sortKey} sortOrder={sortOrder} />
                </div>
              </th>
              <th
                onClick={() => handleSort('cpl')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center justify-end gap-2">
                  CPL
                  <SortIcon columnKey="cpl" sortKey={sortKey} sortOrder={sortOrder} />
                </div>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCampaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {campaign.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    CTR: {campaign.ctr.toFixed(2)}% • Taxa conversão: {campaign.conversionRate.toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                  {formatNumber(campaign.impressions)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                  {formatNumber(campaign.clicks)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-medium">
                  {formatNumber(campaign.conversions)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                  {formatCurrency(campaign.amountSpent)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span
                    className={`text-sm font-semibold ${
                      campaign.conversions === 0
                        ? 'text-gray-400'
                        : campaign.cpl < 50
                        ? 'text-green-600'
                        : campaign.cpl <= 70
                        ? 'text-blue-600'
                        : campaign.cpl <= 98
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}
                  >
                    {campaign.conversions > 0 ? formatCurrency(campaign.cpl) : '—'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {getStatusBadge(campaign.cpl, campaign.conversions)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
