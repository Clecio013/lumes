import { google } from 'googleapis';
import type { SheetsConfig } from './config';
import { SheetsConfigSchema } from './config';
import type { SheetRow, AddRowParams, UpdateRowByColumnParams, FindRowByColumnParams, SheetOperationResult } from './types';
import { SheetsConfigError, SheetsAddRowError, SheetsUpdateRowError, SheetsReadError } from './errors';

/**
 * Cliente para Google Sheets
 *
 * Abstrai operações de leitura/escrita em planilhas
 *
 * @example
 * ```typescript
 * const sheetsClient = SheetsClient.create({
 *   privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY!,
 *   clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
 *   sheetId: process.env.GOOGLE_SHEETS_SHEET_ID!
 * });
 *
 * await sheetsClient.addRow({
 *   nome: 'João',
 *   email: 'joao@example.com'
 * });
 * ```
 */
export class SheetsClient {
  private sheets;
  private config: SheetsConfig;

  private constructor(config: SheetsConfig) {
    this.config = config;

    // Configurar autenticação com Service Account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: config.clientEmail,
        private_key: config.privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  /**
   * Cria uma nova instância do cliente Google Sheets
   *
   * @param config - Configuração do cliente
   * @returns Instância configurada do cliente
   * @throws {SheetsConfigError} Se configuração for inválida
   */
  static create(config: SheetsConfig): SheetsClient {
    try {
      const validated = SheetsConfigSchema.parse(config);
      return new SheetsClient(validated);
    } catch (error) {
      throw new SheetsConfigError('Configuração inválida do Google Sheets', error);
    }
  }

  /**
   * Adiciona uma linha ao final da planilha
   *
   * @param row - Objeto com dados da linha (chave = nome da coluna)
   * @param sheetName - Nome da aba (opcional)
   * @returns Promise com resultado da operação
   * @throws {SheetsAddRowError} Se falhar ao adicionar linha
   *
   * @example
   * ```typescript
   * await client.addRow({
   *   data: '2025-11-06',
   *   nome: 'João Silva',
   *   email: 'joao@example.com',
   *   status: 'approved'
   * });
   * ```
   */
  async addRow(row: SheetRow, sheetName?: string): Promise<SheetOperationResult> {
    try {
      const targetSheet = sheetName || this.config.sheetName || 'Sheet1';

      // Buscar header (primeira linha) para ordem das colunas
      const headerResponse = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.config.sheetId,
        range: `${targetSheet}!1:1`,
      });

      const headers = headerResponse.data.values?.[0] || [];

      if (headers.length === 0) {
        throw new SheetsAddRowError('Planilha sem header (primeira linha vazia)');
      }

      // Montar valores na ordem das colunas do header
      const values = headers.map(header => {
        const value = row[header];
        return value !== undefined ? String(value) : '';
      });

      // Adicionar linha
      const appendResponse = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.config.sheetId,
        range: `${targetSheet}!A:A`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [values],
        },
      });

      return {
        success: true,
        rowIndex: appendResponse.data.updates?.updatedRows || undefined,
      };
    } catch (error) {
      if (error instanceof SheetsAddRowError) {
        throw error;
      }

      throw new SheetsAddRowError('Falha ao adicionar linha no Google Sheets', error);
    }
  }

  /**
   * Atualiza linha buscando por valor em coluna específica
   *
   * @param params - Parâmetros da atualização
   * @returns Promise com resultado da operação
   * @throws {SheetsUpdateRowError} Se falhar ao atualizar
   *
   * @example
   * ```typescript
   * await client.updateRowByColumn({
   *   searchColumn: 'ID MP',
   *   searchValue: '123456789',
   *   updates: {
   *     nascimento: '1990-01-15',
   *     celular: '(11) 98765-4321'
   *   }
   * });
   * ```
   */
  async updateRowByColumn(params: UpdateRowByColumnParams): Promise<SheetOperationResult> {
    try {
      const targetSheet = params.sheetName || this.config.sheetName || 'Sheet1';

      // Buscar todos os dados da planilha
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.config.sheetId,
        range: `${targetSheet}!A:Z`,
      });

      const rows = response.data.values || [];

      if (rows.length === 0) {
        throw new SheetsUpdateRowError('Planilha vazia');
      }

      const headers = rows[0];
      const searchColumnIndex = headers.indexOf(params.searchColumn);

      if (searchColumnIndex === -1) {
        throw new SheetsUpdateRowError(`Coluna "${params.searchColumn}" não encontrada`);
      }

      // Buscar linha que contém o valor
      let targetRowIndex = -1;
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][searchColumnIndex] === String(params.searchValue)) {
          targetRowIndex = i;
          break;
        }
      }

      if (targetRowIndex === -1) {
        throw new SheetsUpdateRowError(
          `Linha com ${params.searchColumn}="${params.searchValue}" não encontrada`
        );
      }

      // Montar updates
      const updateRequests = Object.entries(params.updates).map(([column, value]) => {
        const columnIndex = headers.indexOf(column);

        if (columnIndex === -1) {
          console.warn(`[Sheets] Coluna "${column}" não encontrada, ignorando`);
          return null;
        }

        // Converter índice para letra (A, B, C, ...)
        const columnLetter = String.fromCharCode(65 + columnIndex);
        const range = `${targetSheet}!${columnLetter}${targetRowIndex + 1}`;

        return {
          range,
          values: [[String(value)]],
        };
      }).filter(Boolean);

      // Executar batch update
      if (updateRequests.length > 0) {
        await this.sheets.spreadsheets.values.batchUpdate({
          spreadsheetId: this.config.sheetId,
          requestBody: {
            data: updateRequests as any,
            valueInputOption: 'USER_ENTERED',
          },
        });
      }

      return {
        success: true,
        rowIndex: targetRowIndex + 1,
      };
    } catch (error) {
      if (error instanceof SheetsUpdateRowError) {
        throw error;
      }

      throw new SheetsUpdateRowError('Falha ao atualizar linha no Google Sheets', error);
    }
  }

  /**
   * Busca linha por valor em coluna específica
   *
   * @param params - Parâmetros da busca
   * @returns Promise com dados da linha encontrada (ou null)
   * @throws {SheetsReadError} Se falhar ao buscar
   *
   * @example
   * ```typescript
   * const row = await client.findRowByColumn({
   *   searchColumn: 'Payment ID',
   *   searchValue: '123456789'
   * });
   *
   * if (row) {
   *   console.log(row['Nome'], row['Email']);
   * }
   * ```
   */
  async findRowByColumn(params: FindRowByColumnParams): Promise<SheetRow | null> {
    try {
      const targetSheet = params.sheetName || this.config.sheetName || 'Sheet1';

      // Buscar todos os dados da planilha
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.config.sheetId,
        range: `${targetSheet}!A:Z`,
      });

      const rows = response.data.values || [];

      if (rows.length === 0) {
        return null;
      }

      const headers = rows[0];
      const searchColumnIndex = headers.indexOf(params.searchColumn);

      if (searchColumnIndex === -1) {
        throw new SheetsReadError(`Coluna "${params.searchColumn}" não encontrada`);
      }

      // Buscar linha que contém o valor
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][searchColumnIndex] === String(params.searchValue)) {
          // Montar objeto SheetRow mapeando headers -> valores
          const rowData: SheetRow = {};

          headers.forEach((header, index) => {
            rowData[header] = rows[i][index] || '';
          });

          return rowData;
        }
      }

      // Não encontrou
      return null;
    } catch (error) {
      if (error instanceof SheetsReadError) {
        throw error;
      }

      throw new SheetsReadError('Falha ao buscar linha no Google Sheets', error);
    }
  }

  /**
   * Retorna configuração imutável do cliente
   */
  getConfig(): Readonly<SheetsConfig> {
    return Object.freeze({ ...this.config });
  }
}
