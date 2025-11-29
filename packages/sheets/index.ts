/**
 * @lumes/sheets
 *
 * Biblioteca para integração com Google Sheets
 * Facilita leitura e escrita em planilhas via Service Account
 *
 * @example
 * ```typescript
 * import { SheetsClient } from '@lumes/sheets';
 *
 * const client = SheetsClient.create({
 *   privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY!,
 *   clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
 *   sheetId: process.env.GOOGLE_SHEETS_SHEET_ID!
 * });
 *
 * // Adicionar linha
 * await client.addRow({
 *   data: '2025-11-06',
 *   nome: 'João Silva',
 *   email: 'joao@example.com'
 * });
 *
 * // Atualizar linha
 * await client.updateRowByColumn({
 *   searchColumn: 'email',
 *   searchValue: 'joao@example.com',
 *   updates: { status: 'completed' }
 * });
 * ```
 */

// Client (Factory)
export { SheetsClient } from './client';

// Config
export type { SheetsConfig } from './config';

// Types
export type {
  SheetRow,
  AddRowParams,
  UpdateRowByColumnParams,
  SheetOperationResult,
} from './types';

// Errors
export {
  SheetsError,
  SheetsConfigError,
  SheetsAddRowError,
  SheetsUpdateRowError,
  SheetsReadError,
} from './errors';
