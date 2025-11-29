/**
 * @lumes/analytics - AI Analyzer
 *
 * Análise avançada de campanhas usando Claude (Anthropic API)
 */

import type { Campaign, CampaignMetrics } from '../types';
import type { AIAnalysis, AIAnalysisContext } from './types';
import { AnalyticsError } from '../errors';

/**
 * Formata dados de campanhas para o prompt
 */
function formatCampaignsForPrompt(campaigns: Campaign[], metrics: CampaignMetrics): string {
  const campaignsList = campaigns
    .map(
      (c) =>
        `- ${c.name}:
  Gasto: R$${c.amountSpent.toFixed(2)}
  Impressões: ${c.impressions.toLocaleString()}
  Cliques: ${c.clicks} (CTR: ${c.ctr}%)
  Conversões: ${c.conversions} (Taxa: ${c.conversionRate}%)
  CPL: R$${c.cpl.toFixed(2)}
  CPC: R$${c.cpc.toFixed(2)}`
    )
    .join('\n\n');

  return `
**Resumo Geral:**
- Gasto Total: R$${metrics.totalSpent.toFixed(2)}
- Impressões: ${metrics.totalImpressions.toLocaleString()}
- Cliques: ${metrics.totalClicks}
- Conversões: ${metrics.totalConversions}
- CPL Médio: R$${metrics.avgCPL.toFixed(2)}
- CTR Médio: ${metrics.avgCTR.toFixed(2)}%

**Campanhas Individuais:**
${campaignsList}
  `.trim();
}

/**
 * Gera prompt estruturado para Claude
 */
function buildPrompt(
  campaigns: Campaign[],
  metrics: CampaignMetrics,
  context?: AIAnalysisContext
): string {
  const campaignsData = formatCampaignsForPrompt(campaigns, metrics);

  const contextInfo = context
    ? `
**Contexto do Negócio:**
- Budget: R$${context.budget || 'não especificado'}
- Objetivo: ${context.goal || 'maximizar conversões'}
- Contexto: ${context.businessContext || 'campanha de performance'}
    `.trim()
    : '';

  return `
Você é um especialista em análise de campanhas de Meta Ads. Analise os dados abaixo e forneça insights acionáveis.

${contextInfo}

${campaignsData}

Por favor, forneça uma análise estruturada no seguinte formato:

**Resumo Executivo:**
[Resumo de 2-3 frases sobre a performance geral]

**Recomendações Prioritárias:**
1. [Ação urgente/alta prioridade]
2. [Ação importante]
3. [Otimização sugerida]

**Prognóstico:**
[Estimativa de resultados se as recomendações forem seguidas]

Seja direto, específico e acionável. Foque em decisões práticas que o anunciante possa tomar imediatamente.
  `.trim();
}

/**
 * Parse resposta da API Claude
 */
function parseClaudeResponse(content: string): AIAnalysis {
  try {
    // Extrair seções do markdown
    const summaryMatch = content.match(/\*\*Resumo Executivo:\*\*\s+([\s\S]*?)(?=\n\n\*\*|$)/);
    const recommendationsMatch = content.match(/\*\*Recomendações Prioritárias:\*\*\s+([\s\S]*?)(?=\n\n\*\*|$)/);
    const forecastMatch = content.match(/\*\*Prognóstico:\*\*\s+([\s\S]*?)(?=\n\n|$)/);

    const summary = summaryMatch?.[1].trim() || content.substring(0, 200);

    // Extrair recomendações numeradas
    const recommendationsText = recommendationsMatch?.[1] || '';
    const recommendations = recommendationsText
      .split(/\n\d+\.\s+/)
      .filter((r) => r.trim())
      .map((r) => r.trim());

    const forecast = forecastMatch?.[1].trim();

    // Determinar prioridades baseado em palavras-chave
    const priorities: Array<'urgent' | 'high' | 'medium' | 'low'> = recommendations.map((rec) => {
      const lowerRec = rec.toLowerCase();
      if (lowerRec.includes('urgente') || lowerRec.includes('pausar') || lowerRec.includes('imediatamente')) {
        return 'urgent';
      }
      if (lowerRec.includes('importante') || lowerRec.includes('prioritário')) {
        return 'high';
      }
      if (lowerRec.includes('considerar') || lowerRec.includes('testar')) {
        return 'medium';
      }
      return 'low';
    });

    return {
      summary,
      recommendations: recommendations.length > 0 ? recommendations : ['Sem recomendações específicas'],
      priorities: priorities.length > 0 ? priorities : ['medium'],
      forecast,
    };
  } catch (error) {
    console.warn('[AI Analyzer] Erro ao parsear resposta:', error);
    return {
      summary: content.substring(0, 300),
      recommendations: ['Análise detalhada disponível acima'],
      priorities: ['medium'],
    };
  }
}

/**
 * Analisa campanhas usando Claude API
 */
export async function analyzeWithClaude(
  campaigns: Campaign[],
  metrics: CampaignMetrics,
  context?: AIAnalysisContext
): Promise<AIAnalysis> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new AnalyticsError(
      'ANTHROPIC_API_KEY não configurada',
      'AI_CONFIG_ERROR'
    );
  }

  const prompt = buildPrompt(campaigns, metrics, context);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new AnalyticsError(
        `Anthropic API erro: ${response.status} - ${error}`,
        'AI_API_ERROR'
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '';

    return parseClaudeResponse(content);
  } catch (error) {
    if (error instanceof AnalyticsError) {
      throw error;
    }
    throw new AnalyticsError(
      'Erro ao chamar Anthropic API',
      'AI_REQUEST_ERROR',
      error
    );
  }
}

/**
 * Analisa campanhas usando OpenAI GPT-4
 */
export async function analyzeWithOpenAI(
  campaigns: Campaign[],
  metrics: CampaignMetrics,
  context?: AIAnalysisContext
): Promise<AIAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new AnalyticsError(
      'OPENAI_API_KEY não configurada',
      'AI_CONFIG_ERROR'
    );
  }

  const prompt = buildPrompt(campaigns, metrics, context);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Modelo mais barato e rápido
        max_tokens: 1024,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em análise de campanhas de Meta Ads. Forneça insights acionáveis e específicos.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new AnalyticsError(
        `OpenAI API erro: ${response.status} - ${error}`,
        'AI_API_ERROR'
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    return parseClaudeResponse(content); // Mesmo parser funciona
  } catch (error) {
    if (error instanceof AnalyticsError) {
      throw error;
    }
    throw new AnalyticsError(
      'Erro ao chamar OpenAI API',
      'AI_REQUEST_ERROR',
      error
    );
  }
}

/**
 * Factory para criar AI analyzer (detecta provider automaticamente)
 */
export function getAIAnalyzer() {
  // Prioriza OpenAI (mais barato e fácil)
  const openAIKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (openAIKey) {
    return {
      analyze: analyzeWithOpenAI,
      provider: 'openai' as const,
    };
  }

  if (anthropicKey) {
    return {
      analyze: analyzeWithClaude,
      provider: 'anthropic' as const,
    };
  }

  throw new AnalyticsError(
    'Nenhuma API key configurada. Adicione OPENAI_API_KEY ou ANTHROPIC_API_KEY',
    'AI_CONFIG_ERROR'
  );
}
