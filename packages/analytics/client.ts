/**
 * @lumes/analytics - Client
 *
 * Factory principal da biblioteca
 */

import type { AnalyticsConfig, Campaign, CampaignMetrics, Insight, AIAnalysis } from './types';
import { validateConfig, type ValidatedConfig } from './config';
import { AnalyticsError } from './errors';
import { getAdapter, type IAnalyticsAdapter } from './adapters';

/**
 * Cliente principal de analytics
 *
 * @example
 * ```typescript
 * const analytics = AnalyticsClient.create({
 *   adapter: 'csv',
 *   csvData: uploadedFile
 * });
 *
 * const campaigns = await analytics.getCampaigns();
 * const insights = await analytics.getInsights();
 * ```
 */
export class AnalyticsClient {
  private constructor(
    private readonly config: ValidatedConfig,
    private readonly adapter: IAnalyticsAdapter
  ) {}

  /**
   * Cria uma nova instância do AnalyticsClient
   *
   * @param config - Configuração do client
   * @returns Instância configurada
   * @throws {ConfigError} Se configuração inválida
   */
  static create(config: AnalyticsConfig): AnalyticsClient {
    const validatedConfig = validateConfig(config);
    const adapter = getAdapter(validatedConfig);

    return new AnalyticsClient(validatedConfig, adapter);
  }

  /**
   * Retorna configuração atual (readonly)
   */
  getConfig(): Readonly<ValidatedConfig> {
    return Object.freeze({ ...this.config });
  }

  /**
   * Busca todas as campanhas
   *
   * @returns Lista de campanhas com métricas
   */
  async getCampaigns(): Promise<Campaign[]> {
    try {
      return await this.adapter.getCampaigns();
    } catch (error) {
      throw new AnalyticsError(
        'Erro ao buscar campanhas',
        'GET_CAMPAIGNS_ERROR',
        error
      );
    }
  }

  /**
   * Calcula métricas agregadas
   *
   * @returns Métricas totais/médias
   */
  async getMetrics(): Promise<CampaignMetrics> {
    try {
      return await this.adapter.getMetrics();
    } catch (error) {
      throw new AnalyticsError(
        'Erro ao calcular métricas',
        'GET_METRICS_ERROR',
        error
      );
    }
  }

  /**
   * Gera insights automáticos baseados em regras
   *
   * @returns Lista de insights acionáveis
   */
  async getInsights(): Promise<Insight[]> {
    try {
      const campaigns = await this.getCampaigns();
      const { getInsightsEngine } = await import('./insights');
      const engine = getInsightsEngine(this.config.targets);

      return engine.analyze(campaigns);
    } catch (error) {
      throw new AnalyticsError(
        'Erro ao gerar insights',
        'GET_INSIGHTS_ERROR',
        error
      );
    }
  }

  /**
   * Análise avançada com IA (requer API key)
   *
   * @param context - Contexto adicional para análise
   * @returns Análise estruturada
   * @throws {AnalyticsError} Se API key não configurada
   */
  async analyzeWithAI(context?: {
    budget?: number;
    goal?: string;
    businessContext?: string;
  }): Promise<AIAnalysis> {
    try {
      const campaigns = await this.getCampaigns();
      const metrics = await this.getMetrics();

      const { getAIAnalyzer } = await import('./insights');
      const analyzer = getAIAnalyzer();

      return await analyzer.analyze(campaigns, metrics, context);
    } catch (error) {
      throw new AnalyticsError(
        'Erro ao gerar análise com IA',
        'AI_ANALYSIS_ERROR',
        error
      );
    }
  }
}
