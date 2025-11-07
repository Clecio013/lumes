import { Resend } from 'resend';
import { render } from '@react-email/components';
import type { IEmailProvider } from './base';
import type { EmailParams, EmailResult } from '../types';
import { EmailSendError } from '../errors';

/**
 * Adapter para Resend
 *
 * Implementa IEmailProvider usando o SDK da Resend
 */
export class ResendAdapter implements IEmailProvider {
  private client: Resend;
  private defaultFrom: string;

  constructor(apiKey: string, defaultFrom?: string) {
    this.client = new Resend(apiKey);
    this.defaultFrom = defaultFrom || 'noreply@example.com';
  }

  /**
   * Envia email via Resend
   *
   * @param params - Parâmetros do email
   * @returns Promise com resultado do envio
   * @throws {EmailSendError} Se falhar ao enviar
   */
  async send(params: EmailParams): Promise<EmailResult> {
    try {
      // Renderizar React component para HTML se fornecido
      const html = params.html || (params.react ? await render(params.react) : undefined);

      if (!html) {
        throw new EmailSendError('Email deve ter html ou react component');
      }

      // Enviar via Resend
      const result = await this.client.emails.send({
        from: params.from || this.defaultFrom,
        to: params.to,
        subject: params.subject,
        html,
        cc: params.cc,
        bcc: params.bcc,
        replyTo: params.replyTo,
        attachments: params.attachments?.map(att => ({
          filename: att.filename,
          content: att.content,
        })),
        tags: params.tags,
      });

      if (result.error) {
        throw new EmailSendError(
          `Resend API error: ${result.error.message}`,
          result.error
        );
      }

      return {
        id: result.data?.id || '',
        success: !!result.data,
      };
    } catch (error) {
      if (error instanceof EmailSendError) {
        throw error;
      }

      throw new EmailSendError('Falha ao enviar email via Resend', error);
    }
  }
}
