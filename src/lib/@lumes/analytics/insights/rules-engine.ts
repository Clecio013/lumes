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
}

/**
 * Factory para criar insights engine
 */
export function getInsightsEngine(config?: InsightsEngineConfig): InsightsEngine {
  return new InsightsEngine(config);
}
