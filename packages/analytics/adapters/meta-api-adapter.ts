/**
 * @lumes/analytics - Meta API Adapter (FUTURO)
 *
 * Skeleton para implementação futura com Meta Marketing API
 */

import type { IAnalyticsAdapter } from './base';
import type { Campaign, CampaignMetrics } from '../types';
import { AdapterError } from '../errors';

export class MetaAPIAdapter implements IAnalyticsAdapter {
  constructor(private readonly config: { accessToken: string }) {
    if (!config.accessToken) {
      throw new AdapterError('Meta API access token é obrigatório');
    }
  }

  async getCampaigns(): Promise<Campaign[]> {
    // TODO: Implementar chamada para Meta Marketing API
    // https://developers.facebook.com/docs/marketing-api/
    throw new AdapterError('Meta API adapter ainda não implementado');
  }

  async getMetrics(): Promise<CampaignMetrics> {
    // TODO: Implementar agregação de métricas via API
    throw new AdapterError('Meta API adapter ainda não implementado');
  }

  async getRawData(): Promise<unknown> {
    throw new AdapterError('Meta API adapter ainda não implementado');
  }
}
