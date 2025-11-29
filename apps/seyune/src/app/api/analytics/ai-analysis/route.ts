/**
 * API Route: AI Analysis
 *
 * Endpoint para gerar análise IA de campanhas
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAIAnalyzer } from '@lumes/analytics/insights';
import type { Campaign, CampaignMetrics } from '@lumes/analytics';

interface RequestBody {
  campaigns: Campaign[];
  metrics: CampaignMetrics;
  context?: {
    budget?: number;
    goal?: string;
    businessContext?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parse body
    const body = (await request.json()) as RequestBody;

    // Validação básica
    if (!body.campaigns || !Array.isArray(body.campaigns)) {
      return NextResponse.json(
        { error: 'Campanhas inválidas' },
        { status: 400 }
      );
    }

    if (!body.metrics) {
      return NextResponse.json(
        { error: 'Métricas inválidas' },
        { status: 400 }
      );
    }

    // Detectar e usar analyzer disponível (OpenAI ou Anthropic)
    const analyzer = getAIAnalyzer();

    console.log(`[AI Analysis] Usando provider: ${analyzer.provider}`);

    const analysis = await analyzer.analyze(
      body.campaigns,
      body.metrics,
      body.context
    );

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('[AI Analysis API] Erro:', error);

    // Erro específico de API key
    if (error instanceof Error && (
      error.message.includes('API_KEY') ||
      error.message.includes('configurada')
    )) {
      return NextResponse.json(
        {
          error: 'API key de IA não configurada',
          details: 'Configure OPENAI_API_KEY ou ANTHROPIC_API_KEY nas variáveis de ambiente',
        },
        { status: 500 }
      );
    }

    // Erro genérico
    return NextResponse.json(
      {
        error: 'Erro ao gerar análise IA',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

// Bloquear outros métodos
export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido. Use POST.' },
    { status: 405 }
  );
}
