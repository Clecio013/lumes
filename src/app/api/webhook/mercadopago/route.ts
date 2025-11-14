import { NextResponse } from 'next/server';
import { MercadoPagoClient } from '@/lib/@lumes/mercadopago';
import { EmailClient } from '@/lib/@lumes/email';
import { SheetsClient } from '@/lib/@lumes/sheets';
import { MetaConversionsClient } from '@/lib/@lumes/meta-conversions-api';
import ConfirmacaoCompra from '@/lib/@lumes/email/templates/confirmacao-compra';
import { formatPrice } from '@/app/projeto45dias/lib/batches-config';

/**
 * POST /api/webhook/mercadopago
 *
 * Processa notificações de pagamento do Mercado Pago
 * Versão simplificada: apenas salva dados quando approved
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log('[Webhook MP] Recebido:', JSON.stringify(body, null, 2));

    // Extrair headers para validação
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    // Criar cliente Mercado Pago
    const mpClient = MercadoPagoClient.create({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
      sandbox: false, // Sempre false quando usar credenciais APP_USR
    });

    // Processar webhook com validação de assinatura
    await mpClient.webhook().handle(body, {
      onApproved: async (payment) => {
        console.log('[Webhook MP] Pagamento aprovado:', payment.id);

        try {
          // 0. Verificar se payment já existe (evitar duplicatas)
          const sheetsClient = SheetsClient.create({
            privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY!,
            clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
            sheetId: process.env.GOOGLE_SHEETS_SHEET_ID!,
            sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1',
          });

          const existingRow = await sheetsClient.findRowByColumn({
            searchColumn: 'Payment ID',
            searchValue: String(payment.id),
          });

          if (existingRow) {
            console.log('[Webhook MP] ⚠️ Payment já existe no Sheets (duplicata evitada):', payment.id);
            return; // Não processar novamente
          }

          // 1. Extrair dados do metadata (enviados pela API de process-payment)
          const metadata = payment.metadata || {};

          // Dados pessoais completos vindos do metadata
          const nome = metadata.full_name || payment.payer?.name || 'Nome não informado';

          const email = payment.payer?.email || payment.external_reference || '';

          const telefone = metadata.phone || payment.payer?.phone?.number || '-';

          // Nascimento formatado (YYYY-MM-DD → DD/MM/YYYY)
          const nascimentoRaw = metadata.birthdate || '';
          const nascimento = nascimentoRaw
            ? new Date(nascimentoRaw).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
            : '-';

          // 2. Extrair splits do metadata
          const precoTotal = metadata.preco_total || payment.transaction_amount || 0;
          const splitLumes = metadata.split_lumes || (precoTotal * 0.2);
          const splitAmauri = metadata.split_amauri || (precoTotal * 0.4);
          const splitSeyune = metadata.split_seyune || (precoTotal * 0.4);

          // 3. Salvar na planilha Google Sheets (10 colunas)
          await sheetsClient.addRow({
            Data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            Nome: nome,
            Email: email,
            Telefone: telefone,
            Nascimento: nascimento, // Agora salva diretamente do metadata
            'Preço Total': `R$ ${precoTotal.toFixed(2)}`,
            'Lumes (20%)': `R$ ${splitLumes.toFixed(2)}`,
            'Amauri (40%)': `R$ ${splitAmauri.toFixed(2)}`,
            'Seyune (40%)': `R$ ${splitSeyune.toFixed(2)}`,
            'Payment ID': String(payment.id),
          });

          console.log('[Webhook MP] ✅ Linha criada no Google Sheets');

          // 4. Enviar email de confirmação
          const emailClient = EmailClient.create({
            provider: 'resend',
            apiKey: process.env.RESEND_API_KEY!,
            from: 'Seyune - Black 45 <noreply@seyune.com.br>',
          });

          const firstName = nome.split(' ')[0];

          await emailClient.send({
            to: email,
            subject: '✅ Sua vaga está garantida no Projeto 45 Graus!',
            react: ConfirmacaoCompra({
              nome: firstName,
              preco: formatPrice(precoTotal),
              linkWhatsApp: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK!,
            }),
          });

          console.log('[Webhook MP] ✅ Email de confirmação enviado para:', email);

          // 5. Enviar evento Purchase para Meta Conversions API (server-side tracking)
          if (process.env.NEXT_PUBLIC_META_PIXEL_ID && process.env.META_CONVERSIONS_API_TOKEN && email) {
            try {
              const metaClient = MetaConversionsClient.create({
                pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
                accessToken: process.env.META_CONVERSIONS_API_TOKEN,
                testEventCode: process.env.META_TEST_EVENT_CODE, // Optional, for testing
              });

              const eventTime = Math.floor(Date.now() / 1000);
              const eventSourceUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://seyune.com.br'}/projeto45dias`;

              console.log('[Webhook MP] Enviando evento Purchase para Meta Conversions API');

              const metaResult = await metaClient.sendEvent({
                event_name: 'Purchase',
                event_time: eventTime,
                event_source_url: eventSourceUrl,
                action_source: 'website',
                event_id: String(payment.id), // For deduplication with client-side pixel
                user_data: {
                  email: email,
                  phone: telefone !== '-' ? telefone : undefined,
                  firstName: nome.split(' ')[0],
                  lastName: nome.split(' ').slice(1).join(' ') || undefined,
                  country: 'br',
                },
                custom_data: {
                  currency: 'BRL',
                  value: precoTotal,
                  content_name: 'Black 45 Graus',
                  content_category: 'programa',
                  content_ids: ['black-45-graus'],
                  order_id: String(payment.id),
                  num_items: 1,
                },
              });

              console.log('[Webhook MP] ✅ Evento Purchase enviado para Meta:', {
                paymentId: payment.id,
                fbtrace_id: metaResult.fbtrace_id,
                events_received: metaResult.response?.events_received,
              });
            } catch (metaError) {
              console.error('[Webhook MP] ❌ Falha ao enviar evento Purchase para Meta:', metaError);
              // Não fazer throw - pagamento já foi processado
            }
          } else {
            console.warn('[Webhook MP] ⚠️ Meta Conversions API não configurada ou email ausente, pulando evento Purchase');
          }
        } catch (error) {
          console.error('[Webhook MP] Erro ao processar pagamento aprovado:', error);
          // Não fazer throw aqui para não falhar o webhook
          // MP vai retentar se retornarmos erro
        }
      },

      onPending: async (payment) => {
        console.log('[Webhook MP] Pagamento pendente:', payment.id);
        // Não fazemos nada - aguardamos aprovação
      },

      onRejected: async (payment) => {
        console.log('[Webhook MP] Pagamento rejeitado:', payment.id);
        // Não fazemos nada - pagamento falhou
      },
    }, headers);

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('[Webhook MP] Erro geral:', error);

    // Retornar 200 mesmo com erro para evitar retentativas infinitas
    // Em produção, considere logar em serviço de monitoramento
    return new NextResponse('OK', { status: 200 });
  }
}
