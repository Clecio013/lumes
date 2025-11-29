/**
 * Analytics Dashboard - Main Page
 */

'use client';

import { useState, useMemo } from 'react';
import { AnalyticsClient, InsightsEngine } from '@lumes/analytics';
import type { Campaign, CampaignMetrics, Insight } from '@lumes/analytics';

// Components (criar depois)
import { UploadZone } from './components/UploadZone';
import { MetricsCards } from './components/MetricsCards';
import { PerformanceChart } from './components/PerformanceChart';
import { CPLChart } from './components/CPLChart';
import { CampaignsTable } from './components/CampaignsTable';
import { ConversionFunnel } from './components/ConversionFunnel';
import { InsightsPanel } from './components/InsightsPanel';
import { FiltersPanel, type FilterState, type PerformanceFilter } from './components/FiltersPanel';

export default function AnalyticsPage() {
  const [csvData, setCsvData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dados processados (originais, sem filtro)
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [originalMetrics, setOriginalMetrics] = useState<CampaignMetrics | null>(null);

  // Estado de filtros
  const [filters, setFilters] = useState<FilterState>({
    performance: 'all',
    selectedCampaigns: [],
    minConversions: 0,
    sortBy: 'cpl-asc',
  });

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      // Ler arquivo
      const text = await file.text();
      setCsvData(text);

      // Processar com AnalyticsClient
      const analytics = AnalyticsClient.create({
        adapter: 'csv',
        csvData: text,
      });

      const [campaignsData, metricsData] = await Promise.all([
        analytics.getCampaigns(),
        analytics.getMetrics(),
      ]);

      setCampaigns(campaignsData);
      setOriginalMetrics(metricsData);

      // Inicializar filtros com todas campanhas selecionadas
      setFilters({
        performance: 'all',
        selectedCampaigns: campaignsData.map((c) => c.id),
        minConversions: 0,
        sortBy: 'cpl-asc',
      });
    } catch (err) {
      console.error('[Analytics] Erro ao processar CSV:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao processar arquivo. Verifique o formato.'
      );
      setCsvData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCsvData(null);
    setCampaigns([]);
    setOriginalMetrics(null);
    setError(null);
    setFilters({
      performance: 'all',
      selectedCampaigns: [],
      minConversions: 0,
      sortBy: 'cpl-asc',
    });
  };

  // Determinar performance de uma campanha
  const getCampaignPerformance = (campaign: Campaign): PerformanceFilter => {
    if (campaign.conversions === 0) return 'critical';
    const targetCPL = 70;
    if (campaign.cpl < targetCPL * 0.7) return 'excellent'; // < R$49
    if (campaign.cpl <= targetCPL) return 'good'; // R$49-70
    if (campaign.cpl <= targetCPL * 1.4) return 'warning'; // R$70-98
    return 'critical'; // > R$98
  };

  // Aplicar filtros e ordenação (memoizado)
  const filteredCampaigns = useMemo(() => {
    let result = [...campaigns];

    // Filtro por performance
    if (filters.performance !== 'all') {
      result = result.filter((c) => getCampaignPerformance(c) === filters.performance);
    }

    // Filtro por campanhas selecionadas
    if (filters.selectedCampaigns.length > 0) {
      result = result.filter((c) => filters.selectedCampaigns.includes(c.id));
    }

    // Filtro por mínimo de conversões
    if (filters.minConversions > 0) {
      result = result.filter((c) => c.conversions >= filters.minConversions);
    }

    // Filtro por data
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      result = result.filter((c) => {
        // Se campanha não tem datas, incluir
        if (!c.startDate && !c.endDate) return true;

        // Usar startDate ou endDate da campanha para comparação
        const campaignDate = c.startDate || c.endDate;
        if (!campaignDate) return true;

        // Filtrar se está no range
        const matchesStart = !start || campaignDate >= start;
        const matchesEnd = !end || campaignDate <= end;

        return matchesStart && matchesEnd;
      });
    }

    // Ordenação
    switch (filters.sortBy) {
      case 'cpl-asc':
        result.sort((a, b) => a.cpl - b.cpl);
        break;
      case 'cpl-desc':
        result.sort((a, b) => b.cpl - a.cpl);
        break;
      case 'conversions-desc':
        result.sort((a, b) => b.conversions - a.conversions);
        break;
      case 'spent-desc':
        result.sort((a, b) => b.amountSpent - a.amountSpent);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [campaigns, filters]);

  // Recalcular métricas baseadas em campanhas filtradas (memoizado)
  const filteredMetrics = useMemo((): CampaignMetrics | null => {
    if (filteredCampaigns.length === 0 || !originalMetrics) {
      return originalMetrics;
    }

    const totals = filteredCampaigns.reduce(
      (acc, campaign) => ({
        spent: acc.spent + campaign.amountSpent,
        impressions: acc.impressions + campaign.impressions,
        clicks: acc.clicks + campaign.clicks,
        conversions: acc.conversions + campaign.conversions,
        reach: acc.reach + (campaign.reach || 0),
        ctr: acc.ctr + campaign.ctr,
        cpc: acc.cpc + campaign.cpc,
        cpl: acc.cpl + campaign.cpl,
        cpm: acc.cpm + campaign.cpm,
        frequency: acc.frequency + (campaign.frequency || 0),
        conversionRate: acc.conversionRate + campaign.conversionRate,
        campaignsWithFrequency: acc.campaignsWithFrequency + (campaign.frequency ? 1 : 0),
        campaignsWithReach: acc.campaignsWithReach + (campaign.reach ? 1 : 0),
      }),
      {
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        reach: 0,
        ctr: 0,
        cpc: 0,
        cpl: 0,
        cpm: 0,
        frequency: 0,
        conversionRate: 0,
        campaignsWithFrequency: 0,
        campaignsWithReach: 0,
      }
    );

    const count = filteredCampaigns.length;

    return {
      totalSpent: Math.round(totals.spent * 100) / 100,
      totalImpressions: totals.impressions,
      totalClicks: totals.clicks,
      totalConversions: totals.conversions,
      avgCTR: Math.round((totals.ctr / count) * 100) / 100,
      avgCPC: Math.round((totals.cpc / count) * 100) / 100,
      avgCPL: Math.round((totals.cpl / count) * 100) / 100,
      avgConversionRate: Math.round((totals.conversionRate / count) * 100) / 100,
      avgCPM: Math.round((totals.cpm / count) * 100) / 100,
      avgFrequency: totals.campaignsWithFrequency > 0
        ? Math.round((totals.frequency / totals.campaignsWithFrequency) * 100) / 100
        : undefined,
      totalReach: totals.campaignsWithReach > 0 ? totals.reach : undefined,
    };
  }, [filteredCampaigns, originalMetrics]);

  // Recalcular insights baseados em campanhas filtradas (memoizado)
  const filteredInsights = useMemo((): Insight[] => {
    if (filteredCampaigns.length === 0) {
      return [];
    }

    const insightsEngine = new InsightsEngine({
      cpl: 70,
      ctr: 1,
      cpc: 5,
    });

    return insightsEngine.analyze(filteredCampaigns);
  }, [filteredCampaigns]);

  // Empty state
  if (!csvData || !originalMetrics) {
    return (
      <div className="max-w-3xl mx-auto">
        <UploadZone
          onUpload={handleFileUpload}
          loading={loading}
          error={error}
        />

        {/* Instruções */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Como usar
          </h2>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#874329] text-white text-xs font-bold">
                1
              </span>
              <div className="flex-1">
                <strong className="text-gray-900">Exporte CSV do Meta Ads Manager:</strong>
                <p className="mt-1">Ads Manager → Campanhas → Exportar → CSV</p>

                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-xs font-semibold text-amber-900 mb-2">
                    📊 Colunas necessárias no relatório:
                  </p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-amber-900 mb-1">Obrigatórias:</p>
                      <ul className="text-xs text-amber-800 space-y-1 ml-4 list-disc">
                        <li><strong>Nome da campanha</strong></li>
                        <li><strong>Impressões</strong></li>
                        <li><strong>Cliques no link</strong> ou Cliques (todos)</li>
                        <li><strong>Conversões</strong> (Leads, Compras ou Resultados)</li>
                        <li><strong>Valor gasto</strong> (em BRL)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-amber-900 mb-1">Opcionais (recomendado):</p>
                      <ul className="text-xs text-amber-700 space-y-1 ml-4 list-disc">
                        <li><strong>CPM</strong> - Custo por mil impressões</li>
                        <li><strong>Frequência</strong> - Detectar saturação de público</li>
                        <li><strong>Alcance</strong> - Pessoas únicas alcançadas</li>
                        <li><strong>Data de início/término</strong> - Para filtro por período</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs text-amber-700 mt-2 italic">
                    💡 Dica: Use &quot;Colunas: Performance&quot; ou personalize as colunas no Meta Ads Manager
                  </p>
                </div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#874329] text-white text-xs font-bold">
                2
              </span>
              <span>
                <strong className="text-gray-900">Faça upload do arquivo</strong><br />
                Arraste e solte ou clique para selecionar
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#874329] text-white text-xs font-bold">
                3
              </span>
              <span>
                <strong className="text-gray-900">Analise os resultados</strong><br />
                Veja métricas, gráficos e insights automáticos
              </span>
            </li>
          </ol>
        </div>
      </div>
    );
  }

  // Dashboard com dados
  return (
    <div className="space-y-6">
      {/* Header com reset */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Análise de {campaigns.length} campanha{campaigns.length !== 1 ? 's' : ''}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredCampaigns.length === campaigns.length ? (
              'Todas as campanhas'
            ) : (
              <>
                Mostrando {filteredCampaigns.length} de {campaigns.length} campanhas
              </>
            )}
          </p>
        </div>
        <button
          onClick={handleReset}
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Carregar novo CSV
        </button>
      </div>

      {/* Filtros */}
      <FiltersPanel
        campaigns={campaigns}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Verificar se há campanhas após filtros */}
      {filteredCampaigns.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <p className="text-amber-800 font-medium">
            Nenhuma campanha corresponde aos filtros selecionados
          </p>
          <p className="text-sm text-amber-600 mt-2">
            Ajuste os filtros ou clique em &quot;Limpar filtros&quot; para ver todas as campanhas
          </p>
        </div>
      ) : (
        <>
          {/* Métricas Overview */}
          <MetricsCards metrics={filteredMetrics!} />

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceChart campaigns={filteredCampaigns} />
            <CPLChart campaigns={filteredCampaigns} />
          </div>

          {/* Tabela Detalhada */}
          <CampaignsTable campaigns={filteredCampaigns} />

          {/* Funil de Conversão */}
          <ConversionFunnel metrics={filteredMetrics!} />

          {/* Insights */}
          <InsightsPanel
            insights={filteredInsights}
            campaigns={filteredCampaigns}
            metrics={filteredMetrics!}
          />
        </>
      )}
    </div>
  );
}
