import { NextResponse } from 'next/server';
import { MercadoPagoClient } from '@/lib/@lumes/mercadopago';
import { EmailClient } from '@/lib/@lumes/email';
import { SheetsClient } from '@/lib/@lumes/sheets';
import { decrementSlot } from '@/app/projeto45dias/lib/slots-manager';
import ConfirmacaoCompra from '@/lib/@lumes/email/templates/confirmacao-compra';

/**
 * POST /api/webhook/mercadopago
 *
 * Processa notificações de pagamento do Mercado Pago
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
          // 1. Decrementar vaga
          const loteId = payment.metadata.lote_id;
          await decrementSlot(loteId);
          console.log(`[Webhook MP] Vaga decrementada para lote ${loteId}`);

          // 2. Atualizar Google Sheets com dados do pagamento
          const sheetsClient = SheetsClient.create({
            privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY!,
            clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
            sheetId: process.env.GOOGLE_SHEETS_SHEET_ID!,
            sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1',
          });

          // Usar dados do metadata (coletados antes do pagamento)
          const userEmail = payment.metadata.user_email || payment.payer?.email || '';

          console.log('[Webhook MP] Atualizando linha existente para email:', userEmail);

          try {
            // Tentar atualizar linha existente (lead já foi salvo antes)
            await sheetsClient.updateRowByColumn({
              searchColumn: 'Email',
              searchValue: userEmail,
              updates: {
                'Status Lead': 'Completo',
                'Status Pagamento': payment.status || 'approved',
                'ID MP': String(payment.id),
                Link: `https://www.mercadopago.com.br/activities/${payment.id}`,
              },
            });

            console.log('[Webhook MP] ✅ Linha atualizada com sucesso');
          } catch (updateError: any) {
            // Se linha não existe (fallback - não deveria acontecer no novo fluxo)
            if (updateError.message?.includes('não encontrada')) {
              console.log('[Webhook MP] Linha não encontrada, criando nova (fallback)');

              // Formatar dados do metadata
              const phoneNumbers = payment.metadata.user_telefone?.replace(/\D/g, '') || '';

              const formattedPhone = phoneNumbers.length === 11
                ? `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2, 7)}-${phoneNumbers.slice(7)}`
                : phoneNumbers.length === 10
                ? `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2, 6)}-${phoneNumbers.slice(6)}`
                : phoneNumbers;

              const nascimento = payment.metadata.user_nascimento || '';
              const [year, month, day] = nascimento.split('-');
              const formattedDate = day && month && year ? `${day}/${month}/${year}` : '';

              await sheetsClient.addRow({
                Data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
                Nome: payment.metadata.user_nome || payment.payer?.name || 'Nome não informado',
                Email: userEmail,
                Telefone: formattedPhone,
                Nascimento: formattedDate,
                Lote: payment.metadata.lote_name || '',
                'Preço Total': `R$ ${payment.transaction_amount?.toFixed(2) || '0.00'}`,
                'Lumes (20%)': `R$ ${payment.metadata.split_lumes?.toFixed(2) || '0.00'}`,
                'Amauri (40%)': `R$ ${payment.metadata.split_amauri?.toFixed(2) || '0.00'}`,
                'Seyune (40%)': `R$ ${payment.metadata.split_seyune?.toFixed(2) || '0.00'}`,
                'Status Lead': 'Completo',
                'Status Pagamento': payment.status || 'approved',
                'WebDiet?': 'Não',
                'MFit?': 'Não',
                'Preference ID': payment.metadata.preference_id || '',
                'ID MP': String(payment.id),
                Link: `https://www.mercadopago.com.br/activities/${payment.id}`,
              });

              console.log('[Webhook MP] Linha criada (fallback)');
            } else {
              throw updateError;
            }
          }

          console.log('[Webhook MP] Google Sheets atualizado');

          // 3. Enviar email de confirmação
          const emailClient = EmailClient.create({
            provider: 'resend',
            apiKey: process.env.RESEND_API_KEY!,
            from: 'Projeto 45 Graus <noreply@seyune.com>',
          });

          // Usar nome do metadata
          const userName = payment.metadata.user_nome || payment.payer?.name || 'Cliente';
          const firstName = userName.split(' ')[0];

          await emailClient.send({
            to: userEmail,
            subject: '✅ Sua vaga está garantida no Projeto 45 Graus!',
            react: ConfirmacaoCompra({
              nome: firstName,
              lote: payment.metadata.lote_name || '',
              preco: `R$ ${payment.transaction_amount?.toFixed(2) || '0.00'}`,
              linkObrigado: `${process.env.NEXT_PUBLIC_URL}/projeto45dias/obrigado?payment_id=${payment.id}`,
              linkWhatsApp: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK!,
            }),
          });

          console.log('[Webhook MP] Email de confirmação enviado para:', userEmail);
        } catch (error) {
          console.error('[Webhook MP] Erro ao processar pagamento aprovado:', error);
          // Não fazer throw aqui para não falhar o webhook
          // MP vai retentar se retornarmos erro
        }
      },

      onPending: async (payment) => {
        console.log('[Webhook MP] Pagamento pendente:', payment.id);
        // Pode implementar lógica específica para pending se necessário
      },

      onRejected: async (payment) => {
        console.log('[Webhook MP] Pagamento rejeitado:', payment.id);
        // Pode implementar lógica específica para rejected se necessário
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
