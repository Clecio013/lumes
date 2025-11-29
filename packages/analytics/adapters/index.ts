/**
 * @lumes/analytics - Adapters
 */

import type { IAnalyticsAdapter } from './base';
import type { ValidatedConfig } from '../config';
import { AdapterError } from '../errors';
import { CSVAdapter } from './csv-adapter';
import { MetaAPIAdapter } from './meta-api-adapter';

export type { IAnalyticsAdapter } from './base';
export { CSVAdapter } from './csv-adapter';
export { MetaAPIAdapter } from './meta-api-adapter';

/**
 * Factory de adapters
 *
 * @param config - Configuração validada
 * @returns Adapter apropriado
 */
export function getAdapter(config: ValidatedConfig): IAnalyticsAdapter {
  switch (config.adapter) {
    case 'csv':
      if (!config.csvData) {
        throw new AdapterError('CSV adapter requer csvData');
      }
      return new CSVAdapter(config.csvData);

    case 'meta-api':
      if (!config.accessToken) {
        throw new AdapterError('Meta API adapter requer accessToken');
      }
      return new MetaAPIAdapter({ accessToken: config.accessToken });

    case 'ga4-api':
      throw new AdapterError('GA4 API adapter ainda não implementado');

    default:
      throw new AdapterError(`Adapter desconhecido: ${config.adapter}`);
  }
}
