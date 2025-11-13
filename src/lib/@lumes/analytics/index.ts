/**
 * @lumes/analytics
 *
 * Biblioteca reutilizável para análise de campanhas de marketing
 *
 * @example
 * ```typescript
 * import { AnalyticsClient } from '@/lib/@lumes/analytics';
 *
 * const analytics = AnalyticsClient.create({
 *   adapter: 'csv',
 *   csvData: uploadedFile
 * });
 *
 * const campaigns = await analytics.getCampaigns();
 * const insights = await analytics.getInsights();
 * ```
 */

// Core
export { AnalyticsClient } from './client';
export type { ValidatedConfig } from './config';
export { InsightsEngine } from './insights/rules-engine';
export type { InsightsEngineConfig } from './insights/rules-engine';

// Types
export type {
  AdapterType,
  Campaign,
  CampaignMetrics,
  UTMParams,
  InsightType,
  Insight,
  AIAnalysis,
} from './types';

// Errors
export {
  AnalyticsError,
  AdapterError,
  ParserError,
  ConfigError,
  UTMError,
} from './errors';
