/**
 * @lumes/analytics - Insights Types
 */

export type InsightType = 'success' | 'warning' | 'error';

export interface Insight {
  type: InsightType;
  campaign: string;
  metric: 'cpl' | 'ctr' | 'cpc' | 'conversion_rate';
  value: number;
  message: string;
  action: string;
}

export interface AIAnalysisContext {
  budget?: number;
  goal?: string;
  businessContext?: string;
}

export interface AIAnalysis {
  summary: string;
  recommendations: string[];
  priorities: Array<'urgent' | 'high' | 'medium' | 'low'>;
  forecast?: string;
}
