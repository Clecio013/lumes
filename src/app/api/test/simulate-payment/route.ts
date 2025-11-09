import { NextResponse } from 'next/server';
import { SheetsClient } from '@/lib/@lumes/sheets';
import { EmailClient } from '@/lib/@lumes/email';
import ConfirmacaoCompra from '@/lib/@lumes/email/templates/confirmacao-compra';

/**
 * GET /api/test/simulate-payment
 *
 * Simula um pagamento aprovado para testes locais
 * NÃO USAR EM PRODUÇÃO!
 */
export async function GET() {
  // Verificar se está em desenvolvimento
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Endpoint de teste não disponível em produção' },
      { status: 403 }
    );
  }

  try {
    // Dados fictícios do pagamento
    const fakePaymentId = Math.floor(Math.random() * 1000000000);
    const fakeEmail = `teste${Date.now()}@example.com`;
    const fakeNome = 'Maria Silva Teste';
    const fakeTelefone = '(11) 98765-4321';
    const precoTotal = 397;
    const splitLumes = precoTotal * 0.2;
    const splitAmauri = precoTotal * 0.4;
    const splitSeyune = precoTotal * 0.4;

    console.log('[Test] Simulando pagamento aprovado com dados:');
    console.log('[Test] Payment ID:', fakePaymentId);
    console.log('[Test] Email:', fakeEmail);

    // 1. Salvar na planilha Google Sheets
    const sheetsClient = SheetsClient.create({
      privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY!,
      clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
      sheetId: process.env.GOOGLE_SHEETS_SHEET_ID!,
      sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME || 'Sheet1',
    });

    await sheetsClient.addRow({
      Data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      Nome: fakeNome,
      Email: fakeEmail,
      Telefone: fakeTelefone,
      Nascimento: '-', // Será preenchido depois
      'Preço Total': `R$ ${precoTotal.toFixed(2)}`,
      'Lumes (20%)': `R$ ${splitLumes.toFixed(2)}`,
      'Amauri (40%)': `R$ ${splitAmauri.toFixed(2)}`,
      'Seyune (40%)': `R$ ${splitSeyune.toFixed(2)}`,
      'Payment ID': String(fakePaymentId),
    });

    console.log('[Test] ✅ Linha criada no Google Sheets');

    // 2. Enviar email de confirmação (opcional - comentado por padrão)
    // Descomente se quiser testar envio de email também
    /*
    const emailClient = EmailClient.create({
      provider: 'resend',
      apiKey: process.env.RESEND_API_KEY!,
      from: 'Projeto 45 Graus <noreply@seyune.com>',
    });

    await emailClient.send({
      to: fakeEmail,
      subject: '✅ [TESTE] Sua vaga está garantida no Projeto 45 Graus!',
      react: ConfirmacaoCompra({
        nome: 'Maria',
        lote: '',
        preco: `R$ ${precoTotal.toFixed(2)}`,
        linkObrigado: `${process.env.NEXT_PUBLIC_URL}/projeto45dias/obrigado?payment_id=${fakePaymentId}`,
        linkWhatsApp: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK!,
      }),
    });

    console.log('[Test] ✅ Email enviado');
    */

    return NextResponse.json({
      success: true,
      message: 'Pagamento simulado com sucesso!',
      data: {
        paymentId: fakePaymentId,
        email: fakeEmail,
        nome: fakeNome,
        linkObrigado: `${process.env.NEXT_PUBLIC_URL}/projeto45dias/obrigado?payment_id=${fakePaymentId}`,
      },
      instructions: {
        step1: 'Dados salvos no Google Sheets ✅',
        step2: `Acesse: ${process.env.NEXT_PUBLIC_URL}/projeto45dias/obrigado?payment_id=${fakePaymentId}`,
        step3: 'Preencha a data de nascimento no formulário',
        step4: 'Verifique se a planilha foi atualizada',
      },
    });
  } catch (error) {
    console.error('[Test] Erro ao simular pagamento:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao simular pagamento',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
