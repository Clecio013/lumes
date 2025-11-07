/**
 * @lumes/email
 *
 * Biblioteca para envio de emails
 * Suporta múltiplos providers via Adapter Pattern
 *
 * @example
 * ```typescript
 * import { EmailClient } from '@/lib/@lumes/email';
 *
 * const client = EmailClient.create({
 *   provider: 'resend',
 *   apiKey: process.env.RESEND_API_KEY!,
 *   from: 'noreply@seyune.com'
 * });
 *
 * await client.send({
 *   to: 'user@example.com',
 *   subject: 'Welcome',
 *   react: <WelcomeEmail />
 * });
 * ```
 */

// Client (Factory)
export { EmailClient } from './client';

// Config
export type { EmailConfig, EmailProvider } from './config';

// Types
export type { EmailParams, EmailResult, EmailAttachment } from './types';

// Errors
export {
  EmailError,
  EmailConfigError,
  EmailSendError,
  EmailProviderError,
} from './errors';
