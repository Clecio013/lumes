/**
 * @lumes/analytics - Meta Ads CSV Parser
 *
 * Parser robusto para arquivos CSV exportados do Meta Ads Manager
 */

import { ParserError } from '../errors';
import type { Campaign } from '../types';
import type { ParsedCSVRow, CSVParseResult } from './types';

/**
 * Mapeamento de nomes de colunas possíveis (Meta muda nomes às vezes)
 */
const COLUMN_MAPPINGS = {
  campaignName: [
    'Campaign name',
    'Campaign Name',
    'Nome da campanha',
    'Campanha',
    'campaign_name',
  ],
  impressions: [
    'Impressions',
    'Impressões',
    'impressions',
    'Alcance',
    'Reach',
  ],
  clicks: [
    'Link clicks',
    'Link Clicks',
    'Clicks',
    'Cliques',
    'clicks',
    'Cliques no link',
    'Cliques (todos)',
  ],
  conversions: [
    'Website purchases',
    'Conversions',
    'Conversões',
    'conversions',
    'Purchases',
    'Leads',
    'Results',
    'Resultados',
    'Actions', // Fallback se não tiver conversão configurada
  ],
  amountSpent: [
    'Amount spent (BRL)',
    'Amount spent',
    'Amount Spent',
    'Valor gasto (BRL)',
    'Valor gasto',
    'Gasto',
    'amount_spent',
    'Valor usado (BRL)',
  ],
};

/**
 * Encontra o nome da coluna no header do CSV
 */
function findColumn(headers: string[], possibleNames: string[]): string | null {
  for (const name of possibleNames) {
    const found = headers.find(
      (h) => h.trim().toLowerCase() === name.toLowerCase()
    );
    if (found) return found;
  }
  return null;
}

/**
 * Parse número do CSV (remove símbolos de moeda, vírgulas, etc)
 */
function parseNumber(value: string): number {
  if (!value) return 0;

  // Remove símbolos de moeda, espaços, vírgulas
  const cleaned = value
    .replace(/[R$\s,]/g, '')
    .replace(',', '.') // Vírgula decimal → ponto
    .trim();

  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Parse uma linha do CSV
 */
function parseRow(
  row: string[],
  columnIndexes: Record<string, number>
): ParsedCSVRow | null {
  try {
    const campaignName = row[columnIndexes.campaignName]?.trim();
    if (!campaignName) return null; // Pular linhas sem nome

    return {
      campaignName,
      impressions: parseNumber(row[columnIndexes.impressions] || '0'),
      clicks: parseNumber(row[columnIndexes.clicks] || '0'),
      conversions: parseNumber(row[columnIndexes.conversions] || '0'),
      amountSpent: parseNumber(row[columnIndexes.amountSpent] || '0'),
    };
  } catch (error) {
    console.warn('Erro ao parsear linha CSV:', error);
    return null;
  }
}

/**
 * Calcula métricas derivadas
 */
function calculateMetrics(row: ParsedCSVRow, index: number): Campaign {
  const { campaignName, impressions, clicks, conversions, amountSpent } = row;

  // CTR (Click-Through Rate): (clicks / impressions) * 100
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

  // CPC (Cost Per Click): amountSpent / clicks
  const cpc = clicks > 0 ? amountSpent / clicks : 0;

  // CPL (Cost Per Lead): amountSpent / conversions
  const cpl = conversions > 0 ? amountSpent / conversions : 0;

  // Conversion Rate: (conversions / clicks) * 100
  const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;

  // ID único: nome + índice para evitar duplicatas
  const baseId = campaignName.toLowerCase().replace(/\s+/g, '-');
  const uniqueId = `${baseId}-${index}`;

  return {
    id: uniqueId,
    name: campaignName,
    impressions,
    clicks,
    conversions,
    amountSpent,
    ctr: Math.round(ctr * 100) / 100,           // 2 decimais
    cpc: Math.round(cpc * 100) / 100,
    cpl: Math.round(cpl * 100) / 100,
    conversionRate: Math.round(conversionRate * 100) / 100,
  };
}

/**
 * Parse CSV completo do Meta Ads
 *
 * @param csvData - String do arquivo CSV
 * @returns Resultado do parse com dados e metadata
 * @throws {ParserError} Se CSV inválido
 */
export function parseMetaAdsCSV(csvData: string): CSVParseResult {
  if (!csvData || typeof csvData !== 'string') {
    throw new ParserError('CSV inválido: dados vazios ou formato incorreto');
  }

  try {
    // Split por linhas (suporta \n e \r\n)
    const lines = csvData.split(/\r?\n/).filter((line) => line.trim());

    if (lines.length < 2) {
      throw new ParserError('CSV inválido: arquivo vazio ou sem dados');
    }

    // Parse header
    const headerLine = lines[0];
    const headers = headerLine.split(',').map((h) => h.trim().replace(/"/g, ''));

    // Encontrar índices das colunas
    const columnIndexes = {
      campaignName: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.campaignName) || ''),
      impressions: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.impressions) || ''),
      clicks: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.clicks) || ''),
      conversions: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.conversions) || ''),
      amountSpent: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.amountSpent) || ''),
    };

    // Validar colunas obrigatórias
    if (columnIndexes.campaignName === -1) {
      throw new ParserError(
        'CSV inválido: coluna "Campaign Name" não encontrada.\n' +
        `Colunas disponíveis: ${headers.join(', ')}`
      );
    }

    // Parse rows
    const rows: ParsedCSVRow[] = [];
    let validRows = 0;
    let invalidRows = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Split mantendo strings com vírgula dentro de aspas
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((v) => v.replace(/"/g, '').trim());

      const parsedRow = parseRow(values, columnIndexes);

      if (parsedRow) {
        rows.push(parsedRow);
        validRows++;
      } else {
        invalidRows++;
      }
    }

    if (rows.length === 0) {
      throw new ParserError('CSV inválido: nenhuma linha válida encontrada');
    }

    return {
      rows,
      metadata: {
        totalRows: lines.length - 1,
        validRows,
        invalidRows,
        columns: headers,
      },
    };
  } catch (error) {
    if (error instanceof ParserError) {
      throw error;
    }
    throw new ParserError('Erro ao processar CSV', error);
  }
}

/**
 * Converte resultado do parse para Campaigns com métricas calculadas
 */
export function convertToCampaigns(parseResult: CSVParseResult): Campaign[] {
  return parseResult.rows.map((row, index) => calculateMetrics(row, index));
}

/**
 * Parser completo: CSV → Campaigns
 *
 * @param csvData - String do arquivo CSV
 * @returns Array de campanhas com métricas
 */
export function parseAndConvert(csvData: string): Campaign[] {
  const parseResult = parseMetaAdsCSV(csvData);
  return convertToCampaigns(parseResult);
}
