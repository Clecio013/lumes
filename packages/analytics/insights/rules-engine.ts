/**
 * @lumes/analytics - Rules Engine
 *
 * Gera insights automáticos baseados em regras predefinidas
 */

import type { Campaign } from '../types';
import type { Insight } from './types';

export interface InsightsEngineConfig {
  cpl?: number;   // Target CPL (R$)
  ctr?: number;   // Target CTR (%)
  cpc?: number;   // Target CPC (R$)
}

const DEFAULT_TARGETS: Required<InsightsEngineConfig> = {
  cpl: 70,   // R$70 por lead
  ctr: 1,    // 1% CTR
  cpc: 5,    // R$5 por clique
};

export class InsightsEngine {
  private targets: Required<InsightsEngineConfig>;

  constructor(config: InsightsEngineConfig = {}) {
    this.targets = { ...DEFAULT_TARGETS, ...config };
  }

  /**
   * Analisa campanhas e gera insights
   */
  analyze(campaigns: Campaign[]): Insight[] {
    const insights: Insight[] = [];

    for (const campaign of campaigns) {
      // Análise CPL
      insights.push(...this.analyzeCPL(campaign));

      // Análise CTR
      insights.push(...this.analyzeCTR(campaign));

      // Análise CPC
      insights.push(...this.analyzeCPC(campaign));

      // Análise Conversion Rate
      insights.push(...this.analyzeConversionRate(campaign));

      // Análise CPM
      insights.push(...this.analyzeCPM(campaign));

      // Análise Frequência
      insights.push(...this.analyzeFrequency(campaign));
    }

    // Ordenar por prioridade: error > warning > success
    return insights.sort((a, b) => {
      const priority = { error: 0, warning: 1, success: 2 };
      return priority[a.type] - priority[b.type];
    });
  }

  private analyzeCPL(campaign: Campaign): Insight[] {
    const { cpl, name, conversions } = campaign;
    const target = this.targets.cpl;

    // Sem conversões, não analisar CPL
    if (conversions === 0) return [];

    // Excelente: < 70% do target
    if (cpl < target * 0.7) {
      return [
        {
          type: 'success',
          campaign: name,
          metric: 'cpl',
          value: cpl,
          message: `🎯 CPL excelente: R$${cpl.toFixed(2)} (meta: R$${target})`,
          action: `Considere aumentar budget em 20-30% para escalar resultados`,
        },
      ];
    }

    // Bom: 70-100% do target
    if (cpl <= target) {
      return [
        {
          type: 'success',
          campaign: name,
          metric: 'cpl',
          value: cpl,
          message: `✅ CPL dentro da meta: R$${cpl.toFixed(2)}`,
          action: 'Manter campanha ativa, monitorar performance',
        },
      ];
    }

    // Atenção: 100-140% do target
    if (cpl <= target * 1.4) {
      return [
        {
          type: 'warning',
          campaign: name,
          metric: 'cpl',
          value: cpl,
          message: `⚠️ CPL acima da meta: R$${cpl.toFixed(2)} (meta: R$${target})`,
          action: 'Testar novo criativo ou ajustar segmentação',
        },
      ];
    }

    // Crítico: > 140% do target
    return [
      {
        type: 'error',
        campaign: name,
        metric: 'cpl',
        value: cpl,
        message: `🚨 CPL muito alto: R$${cpl.toFixed(2)} (meta: R$${target})`,
        action: 'Pausar campanha urgentemente e revisar estratégia',
      },
    ];
  }

  private analyzeCTR(campaign: Campaign): Insight[] {
    const { ctr, name, impressions } = campaign;
    const target = this.targets.ctr;

    // Poucas impressões, não analisar
    if (impressions < 1000) return [];

    // Ótimo: > 2x target
    if (ctr > target * 2) {
      return [
        {
          type: 'success',
          campaign: name,
          metric: 'ctr',
          value: ctr,
          message: `🎯 CTR excelente: ${ctr.toFixed(2)}% (meta: ${target}%)`,
          action: 'Criativo está performando muito bem, escalar',
        },
      ];
    }

    // Bom: > target
    if (ctr > target) {
      return [
        {
          type: 'success',
          campaign: name,
          metric: 'ctr',
          value: ctr,
          message: `✅ CTR acima da meta: ${ctr.toFixed(2)}%`,
          action: 'Criativo está engajando, manter',
        },
      ];
    }

    // Atenção: 50-100% do target
    if (ctr >= target * 0.5) {
      return [
        {
          type: 'warning',
          campaign: name,
          metric: 'ctr',
          value: ctr,
          message: `⚠️ CTR abaixo da meta: ${ctr.toFixed(2)}% (meta: ${target}%)`,
          action: 'Testar novo criativo (imagem/vídeo/copy diferente)',
        },
      ];
    }

    // Crítico: < 50% do target
    return [
      {
        type: 'error',
        campaign: name,
        metric: 'ctr',
        value: ctr,
        message: `🚨 CTR muito baixo: ${ctr.toFixed(2)}% (meta: ${target}%)`,
        action: 'Criativo não está engajando, pausar e revisar',
      },
    ];
  }

  private analyzeCPC(campaign: Campaign): Insight[] {
    const { cpc, name, clicks } = campaign;
    const target = this.targets.cpc;

    // Sem cliques, não analisar
    if (clicks === 0) return [];

    // Excelente: < 60% do target
    if (cpc < target * 0.6) {
      return [
        {
          type: 'success',
          campaign: name,
          metric: 'cpc',
          value: cpc,
          message: `🎯 CPC excelente: R$${cpc.toFixed(2)} (meta: R$${target})`,
          action: 'Custo por clique otimizado, escalar',
        },
      ];
    }

    // Bom: < target
    if (cpc <= target) {
      return [
        {
          type: 'success',
          campaign: name,
          metric: 'cpc',
          value: cpc,
          message: `✅ CPC dentro da meta: R$${cpc.toFixed(2)}`,
          action: 'Manter',
        },
      ];
    }

    // Atenção: 100-150% do target
    if (cpc <= target * 1.5) {
      return [
        {
          type: 'warning',
          campaign: name,
          metric: 'cpc',
          value: cpc,
          message: `⚠️ CPC acima da meta: R$${cpc.toFixed(2)} (meta: R$${target})`,
          action: 'Revisar segmentação ou lances',
        },
      ];
    }

    // Crítico: > 150% do target
    return [
      {
        type: 'error',
        campaign: name,
        metric: 'cpc',
        value: cpc,
        message: `🚨 CPC muito alto: R$${cpc.toFixed(2)} (meta: R$${target})`,
        action: 'Custo por clique insustentável, pausar',
      },
    ];
  }

  private analyzeConversionRate(campaign: Campaign): Insight[] {
    const { conversionRate, name, clicks } = campaign;

    // Poucas cliques, não analisar
    if (clicks < 50) return [];

    // Excelente: > 5%
    if (conversionRate > 5) {
      return [
        {
          type: 'success',
          campaign: name,
          metric: 'conversion_rate',
          value: conversionRate,
          message: `🎯 Taxa de conversão excelente: ${conversionRate.toFixed(2)}%`,
          action: 'Landing page está convertendo muito bem',
        },
      ];
    }

    // Bom: 2-5%
    if (conversionRate >= 2) {
      return [
        {
          type: 'success',
          campaign: name,
          metric: 'conversion_rate',
          value: conversionRate,
          message: `✅ Taxa de conversão saudável: ${conversionRate.toFixed(2)}%`,
          action: 'Performance esperada',
        },
      ];
    }

    // Atenção: 1-2%
    if (conversionRate >= 1) {
      return [
        {
          type: 'warning',
          campaign: name,
          metric: 'conversion_rate',
          value: conversionRate,
          message: `⚠️ Taxa de conversão baixa: ${conversionRate.toFixed(2)}%`,
          action: 'Otimizar landing page (CTA, copy, UX)',
        },
      ];
    }

    // Crítico: < 1%
    return [
      {
        type: 'error',
        campaign: name,
        metric: 'conversion_rate',
        value: conversionRate,
        message: `🚨 Taxa de conversão muito baixa: ${conversionRate.toFixed(2)}%`,
        action: 'Problema sério na landing page ou match oferta/público',
        },
    ];
  }

  private analyzeCPM(campaign: Campaign): Insight[] {
    const { cpm, name, impressions } = campaign;

    // Poucas impressões, não analisar
    if (impressions < 1000) return [];

    // Excelente: < R$15 (Meta Ads BR benchmark: R$15-25 para saúde/wellness)
    if (cpm < 15) {
      return [
        {
          type: 'success',
          campaign: name,
          metric: 'cpm',
          value: cpm,
          message: `🎯 CPM excelente: R$${cpm.toFixed(2)} (benchmark: R$15-25)`,
          action: 'Custo por mil impressões muito competitivo',
        },
      ];
    }

    // Bom: R$15-25
    if (cpm <= 25) {
      return [
        {
          type: 'success',
          campaign: name,
          metric: 'cpm',
          value: cpm,
          message: `✅ CPM dentro do benchmark: R$${cpm.toFixed(2)}`,
          action: 'Custo de impressões normal para o setor',
        },
      ];
    }

    // Atenção: R$25-35
    if (cpm <= 35) {
      return [
        {
          type: 'warning',
          campaign: name,
          metric: 'cpm',
          value: cpm,
          message: `⚠️ CPM acima do ideal: R$${cpm.toFixed(2)} (benchmark: R$15-25)`,
          action: 'Revisar segmentação ou horários de veiculação',
        },
      ];
    }

    // Crítico: > R$35
    return [
      {
        type: 'error',
        campaign: name,
        metric: 'cpm',
        value: cpm,
        message: `🚨 CPM muito alto: R$${cpm.toFixed(2)} (benchmark: R$15-25)`,
        action: 'Público pode estar saturado ou competição muito alta',
      },
    ];
  }

  private analyzeFrequency(campaign: Campaign): Insight[] {
    const { frequency, name, impressions } = campaign;

    // Sem frequência ou poucas impressões, não analisar
    if (!frequency || impressions < 1000) return [];

    // Ideal: 1.5-2.5 (sweet spot de frequência)
    if (frequency >= 1.5 && frequency <= 2.5) {
      return [
        {
          type: 'success',
          campaign: name,
          metric: 'frequency',
          value: frequency,
          message: `✅ Frequência ideal: ${frequency.toFixed(2)}x`,
          action: 'Anúncio está chegando nas pessoas certas na quantidade certa',
        },
      ];
    }

    // Baixa: < 1.5 (pode estar subutilizando o público)
    if (frequency < 1.5) {
      return [
        {
          type: 'warning',
          campaign: name,
          metric: 'frequency',
          value: frequency,
          message: `⚠️ Frequência baixa: ${frequency.toFixed(2)}x`,
          action: 'Considere aumentar budget ou reduzir tamanho do público',
        },
      ];
    }

    // Atenção: 2.5-3.5 (começando a saturar)
    if (frequency <= 3.5) {
      return [
        {
          type: 'warning',
          campaign: name,
          metric: 'frequency',
          value: frequency,
          message: `⚠️ Frequência elevada: ${frequency.toFixed(2)}x`,
          action: 'Público começando a saturar, considere expandir audiência',
        },
      ];
    }

    // Crítico: > 3.5 (saturação, burnout do criativo)
    return [
      {
        type: 'error',
        campaign: name,
        metric: 'frequency',
        value: frequency,
        message: `🚨 Frequência muito alta: ${frequency.toFixed(2)}x`,
        action: 'Público saturado! Expandir audiência ou trocar criativo urgente',
      },
    ];
  }
}

/**
 * Factory para criar insights engine
 */
export function getInsightsEngine(config?: InsightsEngineConfig): InsightsEngine {
  return new InsightsEngine(config);
}
