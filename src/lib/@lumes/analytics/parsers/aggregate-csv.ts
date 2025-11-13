/**
 * Agregador de CSV Meta Ads Segmentado
 *
 * Converte CSV com breakdown (idade/gênero/dia) em CSV agregado por campanha
 */

import type { Campaign } from '../types';

interface SegmentedRow {
  campaignName: string;
  impressions: number;
  clicks: number;
  conversions: number;
  amountSpent: number;
}

/**
 * Agrega linhas segmentadas em campanhas únicas
 *
 * @param rows - Linhas parseadas do CSV segmentado
 * @returns Campanhas agregadas
 */
export function aggregateCampaigns(rows: SegmentedRow[]): Map<string, SegmentedRow> {
  const aggregated = new Map<string, SegmentedRow>();

  for (const row of rows) {
    const existing = aggregated.get(row.campaignName);

    if (existing) {
      // Agregar valores
      existing.impressions += row.impressions;
      existing.clicks += row.clicks;
      existing.conversions += row.conversions;
      existing.amountSpent += row.amountSpent;
    } else {
      // Primeira ocorrência desta campanha
      aggregated.set(row.campaignName, { ...row });
    }
  }

  return aggregated;
}

/**
 * Calcula métricas de campanha agregada
 */
export function calculateAggregatedMetrics(
  aggregated: Map<string, SegmentedRow>
): Campaign[] {
  const campaigns: Campaign[] = [];
  let index = 0;

  for (const [name, data] of aggregated) {
    const { impressions, clicks, conversions, amountSpent } = data;

    // Métricas derivadas
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const cpc = clicks > 0 ? amountSpent / clicks : 0;
    const cpl = conversions > 0 ? amountSpent / conversions : 0;
    const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;

    campaigns.push({
      id: `${name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
      name,
      impressions,
      clicks,
      conversions,
      amountSpent: Math.round(amountSpent * 100) / 100,
      ctr: Math.round(ctr * 100) / 100,
      cpc: Math.round(cpc * 100) / 100,
      cpl: Math.round(cpl * 100) / 100,
      conversionRate: Math.round(conversionRate * 100) / 100,
    });

    index++;
  }

  return campaigns;
}
