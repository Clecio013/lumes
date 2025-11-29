/**
 * Insights Panel Component
 */

'use client';

import { useState } from 'react';
import type { Campaign, CampaignMetrics, Insight, AIAnalysis } from '@lumes/analytics';
import { Lightbulb, AlertCircle, CheckCircle, Sparkles, Loader2 } from 'lucide-react';

interface InsightsPanelProps {
  insights: Insight[];
  campaigns: Campaign[];
  metrics: CampaignMetrics;
}

export function InsightsPanel({ insights, campaigns, metrics }: InsightsPanelProps) {
  const [aiAnalysis, setAIAnalysis] = useState<AIAnalysis | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState<string | null>(null);

  const handleAIAnalysis = async () => {
    setLoadingAI(true);
    setErrorAI(null);

    try {
      const response = await fetch('/api/analytics/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaigns,
          metrics,
          context: {
            budget: 500,
            goal: 'agendamentos via WhatsApp',
            businessContext: 'Seyune - nutricionista comportamental',
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = error.error || 'Erro ao gerar análise';
        const details = error.details || '';

        // Mensagem específica se API key não configurada
        if (errorMessage.includes('API key') || errorMessage.includes('configurada')) {
          throw new Error('⚠️ API key de IA não configurada. Adicione OPENAI_API_KEY (recomendado) ou ANTHROPIC_API_KEY no .env.local para usar análise IA.');
        }

        throw new Error(`${errorMessage}${details ? `\n${details}` : ''}`);
      }

      const data = await response.json();
      setAIAnalysis(data);
    } catch (error) {
      console.error('[Insights Panel] Erro AI:', error);
      setErrorAI(
        error instanceof Error
          ? error.message
          : 'Erro ao gerar análise IA. Verifique a configuração.'
      );
    } finally {
      setLoadingAI(false);
    }
  };

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getInsightBgColor = (type: Insight['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'error':
        return 'bg-red-50 border-red-200';
    }
  };

  const getPriorityBadge = (priority: AIAnalysis['priorities'][number]) => {
    const colors = {
      urgent: 'bg-red-100 text-red-700',
      high: 'bg-amber-100 text-amber-700',
      medium: 'bg-blue-100 text-blue-700',
      low: 'bg-gray-100 text-gray-700',
    };

    const labels = {
      urgent: 'Urgente',
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa',
    };

    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded ${colors[priority]}`}>
        {labels[priority]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Insights Automáticos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-[#874329]" />
          <h3 className="text-lg font-semibold text-gray-900">
            Insights Automáticos
          </h3>
        </div>

        {insights.length === 0 ? (
          <p className="text-sm text-gray-500">
            Nenhum insight disponível no momento.
          </p>
        ) : (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 ${getInsightBgColor(insight.type)}`}
              >
                <div className="flex items-start gap-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {insight.message}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <strong>Ação:</strong> {insight.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Campanha: {insight.campaign}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Análise IA */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#874329]" />
            <h3 className="text-lg font-semibold text-gray-900">
              Análise Avançada com IA
            </h3>
          </div>

          {!aiAnalysis && (
            <button
              onClick={handleAIAnalysis}
              disabled={loadingAI}
              className="px-4 py-2 bg-[#874329] text-white rounded-lg hover:bg-[#602514] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loadingAI ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Gerar Análise IA
                </>
              )}
            </button>
          )}
        </div>

        {errorAI && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            {errorAI}
          </div>
        )}

        {aiAnalysis ? (
          <div className="space-y-6">
            {/* Resumo */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                Resumo Executivo
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {aiAnalysis.summary}
              </p>
            </div>

            {/* Recomendações */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Recomendações Prioritárias
              </h4>
              <div className="space-y-3">
                {aiAnalysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#874329] text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{rec}</p>
                      {aiAnalysis.priorities[index] && (
                        <div className="mt-1">
                          {getPriorityBadge(aiAnalysis.priorities[index])}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prognóstico */}
            {aiAnalysis.forecast && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Prognóstico
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {aiAnalysis.forecast}
                </p>
              </div>
            )}

            {/* Botão para nova análise */}
            <button
              onClick={() => {
                setAIAnalysis(null);
                setErrorAI(null);
              }}
              className="text-sm text-[#874329] hover:text-[#602514] underline"
            >
              Gerar nova análise
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Clique em &quot;Gerar Análise IA&quot; para obter recomendações personalizadas
            baseadas em inteligência artificial.
          </p>
        )}
      </div>
    </div>
  );
}
