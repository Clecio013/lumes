import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

/**
 * GET /api/checkout/check-payment?payment_id=123
 *
 * Verifica o status de um pagamento no Mercado Pago
 * Usado para polling de pagamento PIX
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('payment_id');

    if (!paymentId) {
      return NextResponse.json(
        { success: false, error: 'payment_id não informado' },
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

    // Buscar pagamento
    const result = await payment.get({ id: paymentId });

    console.log('[Check Payment] Status:', {
      id: result.id,
      status: result.status,
      payment_type_id: result.payment_type_id,
    });

    return NextResponse.json({
      success: true,
      paymentId: result.id,
      status: result.status,
      statusDetail: result.status_detail,
      paymentTypeId: result.payment_type_id,
      paymentMethodId: result.payment_method_id,
    });
  } catch (error: any) {
    console.error('[Check Payment] Erro:', error);

    const errorMessage =
      error?.cause?.[0]?.description || error?.message || 'Erro ao verificar pagamento';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
