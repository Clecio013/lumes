import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

/**
 * Interface para dados pessoais do cliente
 */
interface PersonalData {
  fullName: string;
  email: string;
  phone: string;
  birthdate: string; // YYYY-MM-DD
  cpf: string;
}

/**
 * Interface para pagamento com cartão (Core Methods)
 */
interface CardPaymentRequest {
  paymentMethod: 'card';
  token: string; // Card token do Core Methods
  installments: number;
  amount: number;
  personalData: PersonalData;
}

/**
 * Interface para pagamento com PIX
 */
interface PixPaymentRequest {
  paymentMethod: 'pix';
  amount: number;
  personalData: PersonalData;
}

type PaymentRequest = CardPaymentRequest | PixPaymentRequest;

/**
 * POST /api/checkout/process-payment
 *
 * Processa pagamentos usando Core Methods:
 * - Cartão: cria pagamento usando token gerado no front
 * - PIX: gera QR Code e retorna para exibição
 *
 * O webhook depois cuida de:
 * - Salvar no Google Sheets
 * - Enviar email de confirmação
 */
export async function POST(req: NextRequest) {
  try {
    const requestData: PaymentRequest = await req.json();

    console.log('[Process Payment] Recebido:', {
      paymentMethod: requestData.paymentMethod,
      amount: requestData.amount,
      email: requestData.personalData.email,
    });

    // Validar dados essenciais
    if (!requestData.paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Método de pagamento não informado' },
        { status: 400 }
      );
    }

    if (!requestData.amount || requestData.amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valor do pagamento inválido' },
        { status: 400 }
      );
    }

    if (!requestData.personalData?.email) {
      return NextResponse.json(
        { success: false, error: 'Email do pagador não informado' },
        { status: 400 }
      );
    }

    if (!requestData.personalData?.cpf) {
      return NextResponse.json(
        { success: false, error: 'CPF do pagador não informado' },
        { status: 400 }
      );
    }

    // Inicializar cliente Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
      options: {
        timeout: 5000,
      },
    });

    const payment = new Payment(client);

    // Separar nome completo em first_name e last_name
    const nameParts = requestData.personalData.fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || nameParts[0];

    // Preparar dados base do pagamento
    const paymentData: any = {
      transaction_amount: requestData.amount,
      description: 'Projeto 45 Graus - Programa de Transformação',
      payer: {
        email: requestData.personalData.email,
        first_name: firstName,
        last_name: lastName,
        identification: {
          type: 'CPF',
          number: requestData.personalData.cpf.replace(/\D/g, ''),
        },
      },
      // Metadata com dados completos do cliente (para o webhook salvar)
      metadata: {
        preco_total: requestData.amount,
        split_lumes: requestData.amount * 0.2,
        split_amauri: requestData.amount * 0.4,
        split_seyune: requestData.amount * 0.4,
        // Dados pessoais completos
        full_name: requestData.personalData.fullName,
        phone: requestData.personalData.phone.replace(/\D/g, ''),
        birthdate: requestData.personalData.birthdate,
        cpf: requestData.personalData.cpf.replace(/\D/g, ''),
      },
      // Notification URL (webhook)
      notification_url: `${process.env.NEXT_PUBLIC_URL}/api/webhook/mercadopago`,
      // URLs de redirecionamento
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/projeto45dias/obrigado`,
        failure: `${process.env.NEXT_PUBLIC_URL}/projeto45dias/erro`,
        pending: `${process.env.NEXT_PUBLIC_URL}/projeto45dias/obrigado`,
      },
      auto_return: 'approved',
      // External reference (email + timestamp)
      external_reference: `${requestData.personalData.email}_${Date.now()}`,
    };

    // Processar baseado no método de pagamento
    if (requestData.paymentMethod === 'card') {
      // Pagamento com cartão
      if (!requestData.token) {
        return NextResponse.json(
          { success: false, error: 'Token do cartão não informado' },
          { status: 400 }
        );
      }

      paymentData.payment_method_id = 'credit_card';
      paymentData.token = requestData.token;
      paymentData.installments = requestData.installments || 1;

      console.log('[Process Payment] Processando cartão com token');
    } else if (requestData.paymentMethod === 'pix') {
      // Pagamento com PIX
      paymentData.payment_method_id = 'pix';

      console.log('[Process Payment] Gerando PIX');
    }

    // Criar pagamento
    const result = await payment.create({ body: paymentData });

    console.log('[Process Payment] Pagamento criado:', {
      id: result.id,
      status: result.status,
      payment_type_id: result.payment_type_id,
      payment_method_id: result.payment_method_id,
    });

    // Preparar resposta
    const response: any = {
      success: true,
      paymentId: result.id,
      status: result.status,
      statusDetail: result.status_detail,
      paymentTypeId: result.payment_type_id,
      paymentMethodId: result.payment_method_id,
    };

    // Para PIX, incluir dados do QR Code
    if (
      requestData.paymentMethod === 'pix' &&
      result.point_of_interaction?.transaction_data
    ) {
      const transactionData = result.point_of_interaction.transaction_data;

      response.qrCode = transactionData.qr_code_base64;
      response.qrCodeText = transactionData.qr_code;
      response.ticketUrl = transactionData.ticket_url;

      // Calcular expiração (30 minutos)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 30);
      response.expiresAt = expiresAt.toISOString();
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('[Process Payment] Erro:', error);

    // Extrair mensagem de erro do Mercado Pago se disponível
    const errorMessage =
      error?.cause?.[0]?.description || error?.message || 'Erro ao processar pagamento';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
