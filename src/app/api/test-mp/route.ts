import { NextResponse } from 'next/server';
import MercadoPago, { Preference } from 'mercadopago';

/**
 * POST /api/test-mp
 *
 * Teste direto com SDK do Mercado Pago (sem abstrações)
 */
export async function POST() {
  try {
    console.log('[Test MP] Iniciando teste...');
    console.log('[Test MP] Access Token:', process.env.MERCADO_PAGO_ACCESS_TOKEN?.substring(0, 15) + '...');
    console.log('[Test MP] NODE_ENV:', process.env.NODE_ENV);

    // Criar cliente
    const client = new MercadoPago({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
    });

    console.log('[Test MP] Cliente criado');

    // Criar preferência
    const preference = new Preference(client);

    const body = {
      items: [
        {
          id: 'test-item',
          title: 'Teste Mercado Pago',
          description: 'Item de teste',
          quantity: 1,
          unit_price: 10.00,
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/pending`,
      },
      auto_return: 'approved' as const,
    };

    console.log('[Test MP] Request body:', JSON.stringify(body, null, 2));

    const response = await preference.create({ body });

    console.log('[Test MP] Sucesso!');
    console.log('[Test MP] Response:', {
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    });

    return NextResponse.json({
      success: true,
      preference: {
        id: response.id,
        init_point: response.init_point,
        sandbox_init_point: response.sandbox_init_point,
      },
    });
  } catch (error: any) {
    console.error('[Test MP] ERRO:', error);
    console.error('[Test MP] Error message:', error.message);
    console.error('[Test MP] Error cause:', error.cause);
    console.error('[Test MP] Error stack:', error.stack);

    if (error.cause) {
      console.error('[Test MP] Cause details:', JSON.stringify(error.cause, null, 2));
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.cause || error,
      },
      { status: 500 }
    );
  }
}
