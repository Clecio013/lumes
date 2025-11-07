import type { ReactElement } from 'react';

/**
 * Parâmetros para envio de email
 */
export interface EmailParams {
  /** Email do destinatário */
  to: string;

  /** Assunto do email */
  subject: string;

  /** HTML do email (string) */
  html?: string;

  /** Componente React Email (será renderizado para HTML) */
  react?: ReactElement;

  /** Email do remetente (sobrescreve padrão do config) */
  from?: string;

  /** CC (cópia) */
  cc?: string | string[];

  /** BCC (cópia oculta) */
  bcc?: string | string[];

  /** Reply-To */
  replyTo?: string;

  /** Anexos (opcional, depende do provider) */
  attachments?: EmailAttachment[];

  /** Tags para organização (opcional, depende do provider) */
  tags?: { name: string; value: string }[];
}

/**
 * Anexo de email
 */
export interface EmailAttachment {
  /** Nome do arquivo */
  filename: string;

  /** Conteúdo do arquivo (base64 ou buffer) */
  content: string | Buffer;

  /** Tipo MIME */
  contentType?: string;
}

/**
 * Resultado do envio de email
 */
export interface EmailResult {
  /** ID do email no provider */
  id: string;

  /** Se o envio foi bem-sucedido */
  success: boolean;

  /** Mensagem de erro (se houver) */
  error?: string;
}
