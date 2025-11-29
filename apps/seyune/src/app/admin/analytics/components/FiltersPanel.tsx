/**
 * Filters Panel Component
 * Filtros inteligentes para análise de campanhas
 */

'use client';

import { useState, useMemo } from 'react';
import type { Campaign } from '@lumes/analytics';
import { Filter, X, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

export type PerformanceFilter = 'all' | 'excellent' | 'good' | 'warning' | 'critical';
export type SortBy = 'cpl-asc' | 'cpl-desc' | 'conversions-desc' | 'spent-desc' | 'name-asc';

export interface FilterState {
  performance: PerformanceFilter;
  selectedCampaigns: string[]; // IDs das campanhas selecionadas
  minConversions: number;
  sortBy: SortBy;
  dateRange?: {
    start: string | null;  // ISO date format (YYYY-MM-DD)
    end: string | null;    // ISO date format (YYYY-MM-DD)
  };
}

interface FiltersPanelProps {
  campaigns: Campaign[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FiltersPanel({ campaigns, filters, onFiltersChange }: FiltersPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determinar performance de cada campanha
  const getCampaignPerformance = (campaign: Campaign): PerformanceFilter => {
    if (campaign.conversions === 0) return 'critical';
    const targetCPL = 70;
    if (campaign.cpl < targetCPL * 0.7) return 'excellent'; // < R$49
    if (campaign.cpl <= targetCPL) return 'good'; // R$49-70
    if (campaign.cpl <= targetCPL * 1.4) return 'warning'; // R$70-98
    return 'critical'; // > R$98
  };

  // Contar campanhas por performance
  const performanceCounts = campaigns.reduce(
    (acc, campaign) => {
      const perf = getCampaignPerformance(campaign);
      acc[perf] = (acc[perf] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const handlePerformanceChange = (perf: PerformanceFilter) => {
    onFiltersChange({ ...filters, performance: perf });
  };

  const handleCampaignToggle = (campaignId: string) => {
    const selected = filters.selectedCampaigns;
    const newSelected = selected.includes(campaignId)
      ? selected.filter((id) => id !== campaignId)
      : [...selected, campaignId];

    onFiltersChange({ ...filters, selectedCampaigns: newSelected });
  };

  const handleSelectAll = () => {
    if (filters.selectedCampaigns.length === campaigns.length) {
      // Deselect all
      onFiltersChange({ ...filters, selectedCampaigns: [] });
    } else {
      // Select all
      onFiltersChange({ ...filters, selectedCampaigns: campaigns.map((c) => c.id) });
    }
  };

  const handleMinConversionsChange = (value: number) => {
    onFiltersChange({ ...filters, minConversions: value });
  };

  const handleSortChange = (sortBy: SortBy) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const handleDatePreset = (preset: 'last7' | 'last30' | 'all') => {
    const today = new Date();
    const toISO = (date: Date) => date.toISOString().split('T')[0];

    if (preset === 'all') {
      onFiltersChange({ ...filters, dateRange: undefined });
      return;
    }

    const daysAgo = preset === 'last7' ? 7 : 30;
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - daysAgo);

    onFiltersChange({
      ...filters,
      dateRange: {
        start: toISO(startDate),
        end: toISO(today),
      },
    });
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        start: type === 'start' ? value : filters.dateRange?.start || null,
        end: type === 'end' ? value : filters.dateRange?.end || null,
      },
    });
  };

  // Calcular range de datas disponíveis nas campanhas
  const dateRangeInfo = useMemo(() => {
    const datesWithData = campaigns
      .flatMap((c) => [c.startDate, c.endDate])
      .filter((d): d is string => Boolean(d))
      .sort();

    if (datesWithData.length === 0) return null;

    return {
      minDate: datesWithData[0],
      maxDate: datesWithData[datesWithData.length - 1],
    };
  }, [campaigns]);

  const handleReset = () => {
    onFiltersChange({
      performance: 'all',
      selectedCampaigns: campaigns.map((c) => c.id),
      minConversions: 0,
      sortBy: 'cpl-asc',
      dateRange: undefined,
    });
  };

  const isFiltered =
    filters.performance !== 'all' ||
    filters.selectedCampaigns.length !== campaigns.length ||
    filters.minConversions > 0 ||
    filters.sortBy !== 'cpl-asc' ||
    filters.dateRange !== undefined;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#874329]" />
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          {isFiltered && (
            <span className="px-2 py-0.5 bg-[#874329] text-white text-xs font-medium rounded-full">
              Ativo
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Filters Content */}
      {isExpanded && (
        <div className="p-4 pt-0 space-y-6 border-t border-gray-200">
          {/* Performance Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Performance (CPL)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <button
                onClick={() => handlePerformanceChange('all')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  filters.performance === 'all'
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                Todas ({campaigns.length})
              </button>
              <button
                onClick={() => handlePerformanceChange('excellent')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  filters.performance === 'excellent'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                Excelente ({performanceCounts.excellent || 0})
              </button>
              <button
                onClick={() => handlePerformanceChange('good')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  filters.performance === 'good'
                    ? 'bg-[#454c31] text-white border-[#454c31]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                Bom ({performanceCounts.good || 0})
              </button>
              <button
                onClick={() => handlePerformanceChange('warning')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  filters.performance === 'warning'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                Atenção ({performanceCounts.warning || 0})
              </button>
              <button
                onClick={() => handlePerformanceChange('critical')}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  filters.performance === 'critical'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                Crítico ({performanceCounts.critical || 0})
              </button>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Ordenar por
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortBy)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#874329] focus:border-transparent"
            >
              <option value="cpl-asc">CPL (menor primeiro)</option>
              <option value="cpl-desc">CPL (maior primeiro)</option>
              <option value="conversions-desc">Conversões (maior primeiro)</option>
              <option value="spent-desc">Gasto (maior primeiro)</option>
              <option value="name-asc">Nome (A-Z)</option>
            </select>
          </div>

          {/* Min Conversions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mínimo de conversões
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={filters.minConversions}
                onChange={(e) => handleMinConversionsChange(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-medium text-gray-900 w-12 text-right">
                {filters.minConversions}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Filtrar apenas campanhas com {filters.minConversions} ou mais conversões
            </p>
          </div>

          {/* Date Range Filter (only if dates available) */}
          {dateRangeInfo && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Calendar className="w-4 h-4 inline mr-1" />
                Período
              </label>

              {/* Presets */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  onClick={() => handleDatePreset('last7')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                    filters.dateRange?.start && filters.dateRange?.end
                      ? 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Últimos 7 dias
                </button>
                <button
                  onClick={() => handleDatePreset('last30')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                    filters.dateRange?.start && filters.dateRange?.end
                      ? 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Últimos 30 dias
                </button>
                <button
                  onClick={() => handleDatePreset('all')}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                    !filters.dateRange
                      ? 'bg-[#874329] text-white border-[#874329]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Todo período
                </button>
              </div>

              {/* Custom Date Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">De</label>
                  <input
                    type="date"
                    value={filters.dateRange?.start || ''}
                    onChange={(e) => handleDateRangeChange('start', e.target.value)}
                    min={dateRangeInfo.minDate}
                    max={dateRangeInfo.maxDate}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#874329] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Até</label>
                  <input
                    type="date"
                    value={filters.dateRange?.end || ''}
                    onChange={(e) => handleDateRangeChange('end', e.target.value)}
                    min={dateRangeInfo.minDate}
                    max={dateRangeInfo.maxDate}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#874329] focus:border-transparent"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Dados disponíveis: {dateRangeInfo.minDate} até {dateRangeInfo.maxDate}
              </p>
            </div>
          )}

          {/* Campaign Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Selecionar campanhas
              </label>
              <button
                onClick={handleSelectAll}
                className="text-xs text-[#874329] hover:text-[#602514] font-medium"
              >
                {filters.selectedCampaigns.length === campaigns.length
                  ? 'Desmarcar todas'
                  : 'Selecionar todas'}
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-3">
              {campaigns.map((campaign) => {
                const isSelected = filters.selectedCampaigns.includes(campaign.id);
                const performance = getCampaignPerformance(campaign);

                return (
                  <label
                    key={campaign.id}
                    className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCampaignToggle(campaign.id)}
                      className="mt-0.5 w-4 h-4 text-[#874329] focus:ring-[#874329] rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">
                        {campaign.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded ${
                            performance === 'excellent'
                              ? 'bg-green-100 text-green-700'
                              : performance === 'good'
                              ? 'bg-blue-100 text-blue-700'
                              : performance === 'warning'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          CPL: R${campaign.cpl.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {campaign.conversions} conv.
                        </span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {filters.selectedCampaigns.length} de {campaigns.length} selecionadas
            </p>
          </div>

          {/* Reset Button */}
          {isFiltered && (
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}
