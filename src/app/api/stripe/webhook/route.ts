import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { StripeClient, WebhookHandler } from '@/lib/@lumes/stripe';
import { EmailClient } from '@/lib/@lumes/email';
import { SheetsClient } from '@/lib/@lumes/sheets';
import ConfirmacaoCompra from '@/lib/@lumes/email/templates/confirmacao-compra';
import { formatPrice } from '@/app/projeto45dias/lib/batches-config';

/**
 * POST /api/stripe/webhook
 *
 * Processa webhooks do Stripe
 * - checkout.session.completed: Salva no Google Sheets e envia email
 * - payment_intent.succeeded: Log de confirmação de pagamento
 */
export async function POST(req: NextRequest) {
  try {
    // Ler body como texto (necessário para validação de assinatura)
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      console.error('[Stripe Webhook] ❌ Assinatura não fornecida');
      return NextResponse.json(
        { error: 'Assinatura não fornecida' },
        { status: 400 }
      );
    }

    console.log('[Stripe Webhook] Recebido webhook');

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

        console.log('[Stripe Webhook] Checkout completo:', {
          sessionId: session.id,
          email: session.customer_email,
          amount: session.amount_total,
          paymentStatus: session.payment_status,
        });

        // Só processar se pagamento foi aprovado
        if (session.payment_status !== 'paid') {
          console.log('[Stripe Webhook] ⚠️ Pagamento não aprovado ainda:', session.payment_status);
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
            console.log('[Stripe Webhook] ⚠️ Pagamento já existe no Sheets (duplicata evitada):', paymentIntentId);
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

          console.log('[Stripe Webhook] Dados extraídos:', {
            customerName,
            customerEmail,
            customerPhone,
            amountTotal,
          });

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

          console.log('[Stripe Webhook] ✅ Linha criada no Google Sheets');

          // 5. Enviar email de confirmação (apenas se tiver email válido)
          if (customerEmail && customerEmail.includes('@')) {
            try {
              const emailClient = EmailClient.create({
                provider: 'resend',
                apiKey: process.env.RESEND_API_KEY!,
                from: 'contato@seyune.com.br',
              });

              const firstName = customerName.split(' ')[0];

              // Em desenvolvimento (Resend free), só pode enviar para email do dono da conta
              // Em produção, enviar para o cliente real
              const isDevelopment = process.env.NODE_ENV === 'development';
              const emailTo = isDevelopment
                ? 'clecio.almeida@lumesdigital.com.br' // Email do dono (teste)
                : customerEmail; // Email real do cliente

              await emailClient.send({
                to: emailTo,
                subject: `✅ [${isDevelopment ? 'TESTE' : ''}] Sua vaga está garantida no Projeto 45 Graus!`,
                react: ConfirmacaoCompra({
                  nome: firstName,
                  preco: formatPrice(amountTotal),
                  linkWhatsApp: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK!,
                }),
              });

              console.log('[Stripe Webhook] ✅ Email de confirmação enviado para:', emailTo, isDevelopment ? '(modo teste)' : '');
            } catch (emailError) {
              console.error('[Stripe Webhook] ⚠️ Erro ao enviar email (mas pagamento foi salvo):', emailError);
              // Não fazer throw - pagamento já foi salvo no Sheets
            }
          } else {
            console.log('[Stripe Webhook] ⚠️ Email do cliente não disponível, pulando envio de email');
          }
        } catch (error) {
          console.error('[Stripe Webhook] Erro ao processar checkout:', error);
          // Não fazer throw - Stripe vai retentar se retornarmos erro
        }
      },

      'payment_intent.succeeded': async (event) => {
        const paymentIntent = event.data as Stripe.PaymentIntent;
        console.log('[Stripe Webhook] Payment Intent aprovado:', {
          id: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          status: paymentIntent.status,
        });
      },

      'payment_intent.payment_failed': async (event) => {
        const paymentIntent = event.data as Stripe.PaymentIntent;
        console.log('[Stripe Webhook] Payment Intent falhou:', {
          id: paymentIntent.id,
          lastError: paymentIntent.last_payment_error?.message,
        });
      },
    });

    await handler.handle(body, signature);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Erro geral:', error);

    // Retornar erro 400 se for erro de assinatura
    if (error instanceof Error && error.name === 'StripeWebhookError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Retornar 200 para outros erros (evitar retentativas infinitas)
    return NextResponse.json({ received: true });
  }
}
