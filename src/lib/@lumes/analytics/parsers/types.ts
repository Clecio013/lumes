/**
 * @lumes/analytics - Parser Types
 */

export interface ParsedCSVRow {
  campaignName: string;
  impressions: number;
  clicks: number;
  conversions: number;
  amountSpent: number;
}

export interface CSVParseResult {
  rows: ParsedCSVRow[];
  metadata: {
    totalRows: number;
    validRows: number;
    invalidRows: number;
    columns: string[];
  };
}
