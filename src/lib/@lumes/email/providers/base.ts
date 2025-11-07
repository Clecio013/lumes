import type { EmailParams, EmailResult } from '../types';

/**
 * Interface base para providers de email (Adapter Pattern)
 *
 * Qualquer provider (Resend, SendGrid, Mailgun, etc) deve implementar esta interface
 */
export interface IEmailProvider {
  /**
   * Envia um email
   *
   * @param params - Parâmetros do email
   * @returns Promise com resultado do envio
   */
  send(params: EmailParams): Promise<EmailResult>;
}
