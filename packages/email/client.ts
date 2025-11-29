import type { EmailConfig } from './config';
import { EmailConfigSchema } from './config';
import type { IEmailProvider } from './providers/base';
import { ResendAdapter } from './providers/resend';
import type { EmailParams, EmailResult } from './types';
import { EmailConfigError, EmailProviderError } from './errors';

/**
 * Cliente principal de email
 *
 * Factory Pattern: Cria instância apropriada do provider
 * Adapter Pattern: Abstrai diferenças entre providers
 *
 * @example
 * ```typescript
 * const emailClient = EmailClient.create({
 *   provider: 'resend',
 *   apiKey: process.env.RESEND_API_KEY!,
 *   from: 'Projeto 45 Graus <noreply@seyune.com>'
 * });
 *
 * await emailClient.send({
 *   to: 'cliente@example.com',
 *   subject: 'Bem-vindo!',
 *   react: <WelcomeEmail name="João" />
 * });
 * ```
 */
export class EmailClient {
  private constructor(private readonly provider: IEmailProvider) {}

  /**
   * Cria uma nova instância do cliente de email
   *
   * @param config - Configuração do cliente
   * @returns Instância configurada do cliente
   * @throws {EmailConfigError} Se configuração for inválida
   * @throws {EmailProviderError} Se provider não for suportado
   *
   * @example
   * ```typescript
   * const client = EmailClient.create({
   *   provider: 'resend',
   *   apiKey: process.env.RESEND_API_KEY!
   * });
   * ```
   */
  static create(config: EmailConfig): EmailClient {
    try {
      const validated = EmailConfigSchema.parse(config);

      // Criar adapter apropriado baseado no provider
      const provider = EmailClient.createProvider(validated);

      return new EmailClient(provider);
    } catch (error) {
      throw new EmailConfigError('Configuração inválida do email client', error);
    }
  }

  /**
   * Cria provider apropriado (Factory interno)
   */
  private static createProvider(config: EmailConfig): IEmailProvider {
    switch (config.provider) {
      case 'resend':
        return new ResendAdapter(config.apiKey, config.from);

      default:
        throw new EmailProviderError(
          `Provider ${config.provider} não é suportado`
        );
    }
  }

  /**
   * Envia um email
   *
   * @param params - Parâmetros do email
   * @returns Promise com resultado do envio
   *
   * @example
   * ```typescript
   * const result = await client.send({
   *   to: 'user@example.com',
   *   subject: 'Hello',
   *   html: '<p>Hello World</p>'
   * });
   *
   * console.log('Email enviado:', result.id);
   * ```
   */
  async send(params: EmailParams): Promise<EmailResult> {
    return this.provider.send(params);
  }
}
