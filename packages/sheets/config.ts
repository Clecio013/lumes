import { z } from 'zod';

/**
 * Configuração do cliente Google Sheets
 */
export const SheetsConfigSchema = z.object({
  /**
   * Private Key do Service Account (JSON string com \n)
   */
  privateKey: z.string().min(1, 'Private key é obrigatória'),

  /**
   * Email do Service Account
   * @example "name@project-id.iam.gserviceaccount.com"
   */
  clientEmail: z.string().email('Client email inválido'),

  /**
   * ID da planilha (spreadsheet)
   * Extraído da URL: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
   */
  sheetId: z.string().min(1, 'Sheet ID é obrigatório'),

  /**
   * Nome da aba/sheet (opcional, padrão: primeira aba)
   */
  sheetName: z.string().optional(),
});

export type SheetsConfig = z.infer<typeof SheetsConfigSchema>;
