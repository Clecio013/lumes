/**
 * @lumes/analytics - CSV Adapter
 *
 * Implementação do adapter para dados CSV
 */

import type { IAnalyticsAdapter } from './base';
import type { Campaign, CampaignMetrics } from '../types';
import { AdapterError } from '../errors';
import { parseAndConvert } from '../parsers';

export class CSVAdapter implements IAnalyticsAdapter {
  private campaigns: Campaign[] | null = null;

  constructor(private readonly csvData: string) {
    if (!csvData) {
      throw new AdapterError('CSV data não pode ser vazio');
    }
  }

  /**
   * Parse lazy: só processa CSV quando necessário
   */
  private ensureParsed(): void {
    if (this.campaigns !== null) return;

    try {
      this.campaigns = parseAndConvert(this.csvData);
    } catch (error) {
      throw new AdapterError('Erro ao processar CSV', error);
    }
  }

  async getCampaigns(): Promise<Campaign[]> {
    this.ensureParsed();

    // Agregar campanhas duplicadas (CSV segmentado)
    const aggregated = this.aggregateDuplicates(this.campaigns!);
    return aggregated;
  }

  /**
   * Agrega campanhas com mesmo nome (CSV segmentado por idade/gênero/dia)
   */
  private aggregateDuplicates(campaigns: Campaign[]): Campaign[] {
    const aggregatedMap = new Map<string, Campaign>();

    for (const campaign of campaigns) {
      const existing = aggregatedMap.get(campaign.name);

      if (existing) {
        // Agregar valores
        existing.impressions += campaign.impressions;
        existing.clicks += campaign.clicks;
        existing.conversions += campaign.conversions;
        existing.amountSpent += campaign.amountSpent;

        // Recalcular métricas
        const impressions = existing.impressions;
        const clicks = existing.clicks;
        const conversions = existing.conversions;
        const amountSpent = existing.amountSpent;

        existing.ctr = impressions > 0 ? Math.round((clicks / impressions) * 100 * 100) / 100 : 0;
        existing.cpc = clicks > 0 ? Math.round((amountSpent / clicks) * 100) / 100 : 0;
        existing.cpl = conversions > 0 ? Math.round((amountSpent / conversions) * 100) / 100 : 0;
        existing.conversionRate = clicks > 0 ? Math.round((conversions / clicks) * 100 * 100) / 100 : 0;
      } else {
        // Primeira ocorrência
        aggregatedMap.set(campaign.name, { ...campaign });
      }
    }

    return Array.from(aggregatedMap.values());
  }

  async getMetrics(): Promise<CampaignMetrics> {
    this.ensureParsed();
    const campaigns = this.campaigns!;

    if (campaigns.length === 0) {
      return {
        totalSpent: 0,
        totalImpressions: 0,
        totalClicks: 0,
        totalConversions: 0,
        avgCTR: 0,
        avgCPC: 0,
        avgCPL: 0,
        avgConversionRate: 0,
        avgCPM: 0,
      };
    }

    // Somar totais
    const totals = campaigns.reduce(
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

    const count = campaigns.length;

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
  }

  async getRawData(): Promise<string> {
    return this.csvData;
  }
}
