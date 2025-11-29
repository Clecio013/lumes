/**
 * Representa uma linha da planilha como objeto chave-valor
 *
 * @example
 * ```typescript
 * const row: SheetRow = {
 *   nome: 'João Silva',
 *   email: 'joao@example.com',
 *   data: '2025-11-06'
 * };
 * ```
 */
export type SheetRow = Record<string, string | number | boolean>;

/**
 * Parâmetros para adicionar uma linha
 */
export interface AddRowParams {
  /** Dados da linha (objeto chave-valor) */
  row: SheetRow;

  /** Nome da aba (sobrescreve config padrão) */
  sheetName?: string;
}

/**
 * Parâmetros para atualizar linha por coluna
 */
export interface UpdateRowByColumnParams {
  /** Nome da coluna para buscar */
  searchColumn: string;

  /** Valor a buscar na coluna */
  searchValue: string | number;

  /** Objeto com colunas a atualizar */
  updates: SheetRow;

  /** Nome da aba (sobrescreve config padrão) */
  sheetName?: string;
}

/**
 * Parâmetros para buscar linha por coluna
 */
export interface FindRowByColumnParams {
  /** Nome da coluna para buscar */
  searchColumn: string;

  /** Valor a buscar na coluna */
  searchValue: string | number;

  /** Nome da aba (sobrescreve config padrão) */
  sheetName?: string;
}

/**
 * Resultado da operação
 */
export interface SheetOperationResult {
  /** Se operação foi bem-sucedida */
  success: boolean;

  /** Linha afetada (índice base-1, incluindo header) */
  rowIndex?: number;

  /** Mensagem de erro (se houver) */
  error?: string;
}
