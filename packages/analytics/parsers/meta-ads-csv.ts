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
    'Venda', // Meta Ads PT-BR
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
    'Valor Usado', // Meta Ads PT-BR sem (BRL)
  ],
  cpm: [
    'CPM (cost per 1,000 impressions)',
    'CPM',
    'Cost per 1,000 impressions (BRL)',
    'Custo por 1.000 impressões',
    'CPM (custo por 1.000 impressões)', // Meta Ads PT-BR
    'cpm',
  ],
  frequency: [
    'Frequency',
    'Frequência',
    'frequency',
  ],
  reach: [
    'Reach',
    'Alcance',
    'reach',
  ],
  startDate: [
    'Reporting starts',
    'Reporting Starts',
    'Start date',
    'Data de início',
    'Início do relatório',
    'reporting_starts',
    'Data',
    'Dia', // Meta Ads PT-BR formato simplificado
  ],
  endDate: [
    'Reporting ends',
    'Reporting Ends',
    'End date',
    'Data de término',
    'Término do relatório',
    'reporting_ends',
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
 * Formato brasileiro: R$ 1.234,56 (ponto = milhar, vírgula = decimal)
 */
function parseNumber(value: string): number {
  if (!value) return 0;

  // Formato brasileiro: R$ 1.234,56
  // 1. Remove R$ e espaços
  // 2. Remove pontos (separador de milhar)
  // 3. Converte vírgula (decimal) para ponto
  const cleaned = value
    .replace(/R\$/g, '')     // Remove R$
    .replace(/\s/g, '')      // Remove espaços
    .replace(/\./g, '')      // Remove ponto (separador de milhar)
    .replace(',', '.')       // Converte vírgula decimal → ponto
    .trim();

  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Parse data do CSV (converte para ISO format)
 * Aceita formatos: DD/MM/YYYY, YYYY-MM-DD, MM/DD/YYYY
 */
function parseDate(value: string): string | undefined {
  if (!value || !value.trim()) return undefined;

  const cleaned = value.trim();

  // Formato ISO (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}/.test(cleaned)) {
    return cleaned.split(' ')[0]; // Remove horário se tiver
  }

  // Formato DD/MM/YYYY
  const ddmmyyyyMatch = cleaned.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (ddmmyyyyMatch) {
    const [, day, month, year] = ddmmyyyyMatch;
    return `${year}-${month}-${day}`;
  }

  // Formato MM/DD/YYYY (US format)
  const mmddyyyyMatch = cleaned.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (mmddyyyyMatch) {
    const [, month, day, year] = mmddyyyyMatch;
    return `${year}-${month}-${day}`;
  }

  return undefined;
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

    const parsed: ParsedCSVRow = {
      campaignName,
      impressions: parseNumber(row[columnIndexes.impressions] || '0'),
      clicks: parseNumber(row[columnIndexes.clicks] || '0'),
      conversions: parseNumber(row[columnIndexes.conversions] || '0'),
      amountSpent: parseNumber(row[columnIndexes.amountSpent] || '0'),
    };

    // Campos opcionais
    if (columnIndexes.cpm >= 0) {
      const cpmValue = parseNumber(row[columnIndexes.cpm] || '');
      if (cpmValue > 0) parsed.cpm = cpmValue;
    }

    if (columnIndexes.frequency >= 0) {
      const freqValue = parseNumber(row[columnIndexes.frequency] || '');
      if (freqValue > 0) parsed.frequency = freqValue;
    }

    if (columnIndexes.reach >= 0) {
      const reachValue = parseNumber(row[columnIndexes.reach] || '');
      if (reachValue > 0) parsed.reach = reachValue;
    }

    if (columnIndexes.startDate >= 0) {
      const dateValue = parseDate(row[columnIndexes.startDate] || '');
      if (dateValue) parsed.startDate = dateValue;
    }

    if (columnIndexes.endDate >= 0) {
      const dateValue = parseDate(row[columnIndexes.endDate] || '');
      if (dateValue) parsed.endDate = dateValue;
    }

    return parsed;
  } catch (error) {
    console.warn('Erro ao parsear linha CSV:', error);
    return null;
  }
}

/**
 * Calcula métricas derivadas
 */
function calculateMetrics(row: ParsedCSVRow, index: number): Campaign {
  const { campaignName, impressions, clicks, conversions, amountSpent, cpm, frequency, reach, startDate, endDate } = row;

  // CTR (Click-Through Rate): (clicks / impressions) * 100
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

  // CPC (Cost Per Click): amountSpent / clicks
  const cpc = clicks > 0 ? amountSpent / clicks : 0;

  // CPL (Cost Per Lead): amountSpent / conversions
  const cpl = conversions > 0 ? amountSpent / conversions : 0;

  // Conversion Rate: (conversions / clicks) * 100
  const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;

  // CPM (Cost Per Mille): calcular se não vier no CSV
  const calculatedCPM = cpm ?? (impressions > 0 ? (amountSpent / impressions) * 1000 : 0);

  // ID único: nome + índice para evitar duplicatas
  const baseId = campaignName.toLowerCase().replace(/\s+/g, '-');
  const uniqueId = `${baseId}-${index}`;

  const campaign: Campaign = {
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
    cpm: Math.round(calculatedCPM * 100) / 100, // 2 decimais
  };

  // Adicionar campos opcionais se presentes
  if (frequency !== undefined) campaign.frequency = Math.round(frequency * 100) / 100;
  if (reach !== undefined) campaign.reach = reach;
  if (startDate) campaign.startDate = startDate;
  if (endDate) campaign.endDate = endDate;

  return campaign;
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

    // Encontrar índices das colunas (obrigatórias)
    const columnIndexes = {
      campaignName: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.campaignName) || ''),
      impressions: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.impressions) || ''),
      clicks: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.clicks) || ''),
      conversions: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.conversions) || ''),
      amountSpent: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.amountSpent) || ''),
      // Opcionais (retorna -1 se não encontrado)
      cpm: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.cpm) || ''),
      frequency: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.frequency) || ''),
      reach: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.reach) || ''),
      startDate: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.startDate) || ''),
      endDate: headers.indexOf(findColumn(headers, COLUMN_MAPPINGS.endDate) || ''),
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
