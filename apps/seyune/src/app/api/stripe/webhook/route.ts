import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { StripeClient, WebhookHandler } from '@lumes/stripe';
import { EmailClient } from '@lumes/email';
import { SheetsClient } from '@lumes/sheets';
import { LoggerClient } from '@lumes/logger';
import { MetaConversionsClient } from '@lumes/meta-conversions-api';
import { TelegramClient } from '@lumes/telegram';
import ConfirmacaoCompra from '@lumes/email/templates/confirmacao-compra';
import { formatPrice } from '@/app/projeto45dias/lib/batches-config';

/**
 * POST /api/stripe/webhook
 *
 * Processa webhooks do Stripe
 * - checkout.session.completed: Salva no Google Sheets e envia email
 * - payment_intent.succeeded: Log de confirmação de pagamento
 */
export async function POST(req: NextRequest) {
  // Create logger with request ID for tracing
  const logger = LoggerClient.createForWebhook('stripe');

  try {
    // Ler body como texto (necessário para validação de assinatura)
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      logger.error('Missing webhook signature');
      return NextResponse.json(
        { error: 'Assinatura não fornecida' },
        { status: 400 }
      );
    }

    logger.info({ signature: signature.substring(0, 20) + '...' }, 'Webhook received');

    // Validar variáveis de ambiente
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY não configurada');
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('STRIPE_WEBHOOK_SECRET não configurada');
    }

    // Criar cliente Stripe
    const stripeClient = StripeClient.create({
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    });

    // Processar webhook
    const handler = WebhookHandler.create(stripeClient, {
      'checkout.session.completed': async (event) => {
        const session = event.data as Stripe.Checkout.Session;

        logger.info({
          sessionId: session.id,
          email: session.customer_email,
          amount: session.amount_total,
          paymentStatus: session.payment_status,
        }, 'Checkout session completed');

        // Só processar se pagamento foi aprovado
        if (session.payment_status !== 'paid') {
          logger.warn({ paymentStatus: session.payment_status }, 'Payment not yet paid, skipping');
          return;
        }

        try {
          // 1. Verificar duplicata no Google Sheets
          const sheetsClient = SheetsClient.create({
            privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY!,
            clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
            sheetId: process.env.GOOGLE_SHEETS_SHEET_ID!,
            sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1',
          });

          // Usar Payment Intent como ID único (compatível com estrutura do MP)
          const paymentIntentId = session.payment_intent as string || session.id;

          const existingRow = await sheetsClient.findRowByColumn({
            searchColumn: 'Payment ID',
            searchValue: paymentIntentId,
          });

          if (existingRow) {
            logger.warn({ paymentId: paymentIntentId }, 'Duplicate payment detected, skipping');
            return;
          }

          // 2. Extrair dados do session
          const customerEmail = session.customer_email || session.customer_details?.email || '';
          const amountTotal = (session.amount_total || 0) / 100; // Converter centavos para reais

          // Calcular splits (20% Lumes, 40% Seyune, 40% Amauri)
          const splitLumes = amountTotal * 0.2;
          const splitSeyune = amountTotal * 0.4;
          const splitAmauri = amountTotal * 0.4;

          // 3. Buscar detalhes do customer (do Stripe Checkout)
          let customerName = 'Cliente';
          let customerPhone = '-';

          if (session.customer_details) {
            customerName = session.customer_details.name || 'Cliente';
            customerPhone = session.customer_details.phone || '-';
          }

          logger.info({
            customerName,
            customerEmail,
            customerPhone,
            amountTotal,
          }, 'Customer data extracted');

          // 4. Salvar na planilha Google Sheets (mesma estrutura do Mercado Pago)
          await sheetsClient.addRow({
            Data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            Nome: customerName,
            Email: customerEmail,
            Telefone: customerPhone,
            Nascimento: '-', // Será preenchido depois na página de obrigado
            'Preço Total': `R$ ${amountTotal.toFixed(2)}`,
            'Lumes (20%)': `R$ ${splitLumes.toFixed(2)}`,
            'Amauri (40%)': `R$ ${splitAmauri.toFixed(2)}`,
            'Seyune (40%)': `R$ ${splitSeyune.toFixed(2)}`,
            'Payment ID': paymentIntentId, // Compatível com estrutura do MP
          });

          logger.info({ paymentId: paymentIntentId, customerEmail }, 'Payment saved to Google Sheets');

          // 5. Enviar evento Purchase para Meta Conversions API (server-side tracking)
          if (process.env.NEXT_PUBLIC_META_PIXEL_ID && process.env.META_CONVERSIONS_API_TOKEN && customerEmail) {
            try {
              const metaClient = MetaConversionsClient.create({
                pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
                accessToken: process.env.META_CONVERSIONS_API_TOKEN,
                testEventCode: process.env.META_TEST_EVENT_CODE, // Optional, for testing
              });

              const eventTime = Math.floor(Date.now() / 1000);
              const eventSourceUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://seyune.com.br'}/projeto45dias`;

              logger.info({ paymentId: paymentIntentId, customerEmail }, 'Sending Purchase event to Meta Conversions API');

              const metaResult = await metaClient.sendEvent({
                event_name: 'Purchase',
                event_time: eventTime,
                event_source_url: eventSourceUrl,
                action_source: 'website',
                event_id: paymentIntentId, // For deduplication with client-side pixel
                user_data: {
                  email: customerEmail,
                  phone: customerPhone !== '-' ? customerPhone : undefined,
                  firstName: customerName.split(' ')[0],
                  lastName: customerName.split(' ').slice(1).join(' ') || undefined,
                  clientIpAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined,
                  clientUserAgent: req.headers.get('user-agent') || undefined,
                  country: 'br',
                },
                custom_data: {
                  currency: 'BRL',
                  value: amountTotal,
                  content_name: 'Black 45 Graus',
                  content_category: 'programa',
                  content_ids: ['black-45-graus'],
                  order_id: paymentIntentId,
                  num_items: 1,
                },
              });

              logger.info({
                paymentId: paymentIntentId,
                customerEmail,
                fbtrace_id: metaResult.fbtrace_id,
                events_received: metaResult.response?.events_received,
              }, 'Purchase event sent to Meta successfully');
            } catch (metaError) {
              logger.error({
                err: metaError,
                paymentId: paymentIntentId,
                customerEmail,
              }, 'Failed to send Purchase event to Meta Conversions API');
              // Não fazer throw - pagamento já foi processado
            }
          } else {
            logger.warn('Meta Conversions API not configured or missing customer email, skipping Purchase event');
          }

          // 6. Enviar email de confirmação (apenas se tiver email válido)
          if (customerEmail && customerEmail.includes('@')) {
            try {
              const emailClient = EmailClient.create({
                provider: 'resend',
                apiKey: process.env.RESEND_API_KEY!,
                from: 'Seyune - Black 45 <noreply@seyune.com.br>',
              });

              const firstName = customerName.split(' ')[0];
              const subject = '✅ Sua vaga está garantida no Projeto 45 Graus!';

              logger.info({ to: customerEmail, subject }, 'Sending confirmation email');

              const result = await emailClient.send({
                to: customerEmail,
                subject,
                react: ConfirmacaoCompra({
                  nome: firstName,
                  preco: formatPrice(amountTotal),
                  linkWhatsApp: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK!,
                }),
              });

              logger.info({ to: customerEmail, emailId: result.id }, 'Confirmation email sent successfully');
            } catch (emailError) {
              logger.error({
                err: emailError,
                to: customerEmail,
                subject: '✅ Sua vaga está garantida no Projeto 45 Graus!',
                paymentId: paymentIntentId,
              }, 'Failed to send confirmation email');
              // Não fazer throw - pagamento já foi salvo no Sheets
            }
          } else {
            logger.warn({ email: customerEmail }, 'Invalid or missing customer email, skipping email send');
          }

          // 7. Enviar notificação no Telegram
          if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
            try {
              const telegramClient = TelegramClient.create({
                botToken: process.env.TELEGRAM_BOT_TOKEN,
              });

              await telegramClient.sendPurchaseNotification(
                process.env.TELEGRAM_CHAT_ID,
                {
                  nome: customerName,
                  valor: formatPrice(amountTotal),
                }
              );

              logger.info({ paymentId: paymentIntentId, customerName }, 'Telegram notification sent');
            } catch (telegramError) {
              logger.error({
                err: telegramError,
                paymentId: paymentIntentId,
              }, 'Failed to send Telegram notification');
              // Não fazer throw - pagamento já foi processado
            }
          }
        } catch (error) {
          logger.error({ err: error, sessionId: session.id }, 'Error processing checkout session');
          // Não fazer throw - Stripe vai retentar se retornarmos erro
        }
      },

      'payment_intent.succeeded': async (event) => {
        const paymentIntent = event.data as Stripe.PaymentIntent;
        logger.info({
          id: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          status: paymentIntent.status,
        }, 'Payment intent succeeded');
      },

      'payment_intent.payment_failed': async (event) => {
        const paymentIntent = event.data as Stripe.PaymentIntent;
        logger.warn({
          id: paymentIntent.id,
          lastError: paymentIntent.last_payment_error?.message,
        }, 'Payment intent failed');
      },
    });

    await handler.handle(body, signature);

    logger.info('Webhook processed successfully');
    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error({ err: error }, 'Webhook processing failed');

    // Retornar erro 400 se for erro de assinatura
    if (error instanceof Error && error.name === 'StripeWebhookError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Retornar 200 para outros erros (evitar retentativas infinitas)
    return NextResponse.json({ received: true });
  }
}
