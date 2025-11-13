/**
 * @lumes/analytics - Adapters Base
 *
 * Interface comum para todos os adapters
 */

import type { Campaign, CampaignMetrics } from '../types';

/**
 * Interface que todos os adapters devem implementar
 *
 * Permite trocar data source (CSV, Meta API, GA4 API) sem mudar código cliente
 */
export interface IAnalyticsAdapter {
  /**
   * Busca todas as campanhas com suas métricas
   */
  getCampaigns(): Promise<Campaign[]>;

  /**
   * Calcula métricas agregadas de todas as campanhas
   */
  getMetrics(): Promise<CampaignMetrics>;

  /**
   * Retorna dados brutos (opcional, para debug)
   */
  getRawData?(): Promise<unknown>;
}
