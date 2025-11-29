/**
 * @lumes/analytics - Types
 *
 * Tipos públicos da biblioteca de analytics
 */

export type AdapterType = 'csv' | 'meta-api' | 'ga4-api';

export interface Campaign {
  id: string;
  name: string;
  impressions: number;
  clicks: number;
  conversions: number;
  amountSpent: number;
  ctr: number;      // Click-Through Rate (%)
  cpc: number;      // Cost Per Click (R$)
  cpl: number;      // Cost Per Lead (R$)
  conversionRate: number; // Conversion Rate (%)
  cpm: number;      // Cost Per Mille/Thousand Impressions (R$)
  frequency?: number; // Average times ad shown to same person
  reach?: number;    // Unique people reached
  startDate?: string; // Campaign start date (ISO format)
  endDate?: string;   // Campaign end date (ISO format)
}

export interface CampaignMetrics {
  totalSpent: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  avgCTR: number;
  avgCPC: number;
  avgCPL: number;
  avgConversionRate: number;
  avgCPM: number;
  avgFrequency?: number;
  totalReach?: number;
}

export interface UTMParams {
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  content?: string | null;
  term?: string | null;
}

export type InsightType = 'success' | 'warning' | 'error';

export interface Insight {
  type: InsightType;
  campaign: string;
  metric: 'cpl' | 'ctr' | 'cpc' | 'conversion_rate' | 'cpm' | 'frequency';
  value: number;
  message: string;
  action: string;
}

export interface AIAnalysis {
  summary: string;
  recommendations: string[];
  priorities: Array<'urgent' | 'high' | 'medium' | 'low'>;
  forecast?: string;
}

export interface AnalyticsConfig {
  adapter: AdapterType;
  csvData?: string;
  accessToken?: string;
  targets?: {
    cpl?: number;
    ctr?: number;
    cpc?: number;
  };
}
