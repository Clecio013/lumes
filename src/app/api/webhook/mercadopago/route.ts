import { NextResponse } from 'next/server';
import { MercadoPagoClient } from '@/lib/@lumes/mercadopago';
import { EmailClient } from '@/lib/@lumes/email';
import { SheetsClient } from '@/lib/@lumes/sheets';
import ConfirmacaoCompra from '@/lib/@lumes/email/templates/confirmacao-compra';

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
          // 1. Extrair dados do payer (Mercado Pago)
          const payer = payment.payer as any; // Type assertion para acessar propriedades dinâmicas
          const nome = payer?.first_name && payer?.last_name
            ? `${payer.first_name} ${payer.last_name}`
            : payer?.name || 'Nome não informado';

          const email = payer?.email || payment.external_reference || '';

          const telefone = payer?.phone?.number || '-';

          // 2. Extrair splits do metadata
          const precoTotal = payment.metadata?.preco_total || payment.transaction_amount || 0;
          const splitLumes = payment.metadata?.split_lumes || (precoTotal * 0.2);
          const splitAmauri = payment.metadata?.split_amauri || (precoTotal * 0.4);
          const splitSeyune = payment.metadata?.split_seyune || (precoTotal * 0.4);

          // 3. Salvar na planilha Google Sheets (10 colunas)
          const sheetsClient = SheetsClient.create({
            privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY!,
            clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
            sheetId: process.env.GOOGLE_SHEETS_SHEET_ID!,
            sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1',
          });

          await sheetsClient.addRow({
            Data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            Nome: nome,
            Email: email,
            Telefone: telefone,
            Nascimento: '-', // Será preenchido depois na página de obrigado
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
            from: 'Projeto 45 Graus <noreply@seyune.com>',
          });

          const firstName = nome.split(' ')[0];

          await emailClient.send({
            to: email,
            subject: '✅ Sua vaga está garantida no Projeto 45 Graus!',
            react: ConfirmacaoCompra({
              nome: firstName,
              lote: '', // Não usamos mais lote
              preco: `R$ ${precoTotal.toFixed(2)}`,
              linkObrigado: `${process.env.NEXT_PUBLIC_URL}/projeto45dias/obrigado?payment_id=${payment.id}`,
              linkWhatsApp: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK!,
            }),
          });

          console.log('[Webhook MP] ✅ Email de confirmação enviado para:', email);
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
