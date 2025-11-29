import { useState } from 'react';

interface CheckoutResponse {
  checkoutUrl: string;
  preferenceId: string;
  lote: string;
  preco: number;
}

interface CheckoutError {
  error: string;
}

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckout = async (email: string): Promise<CheckoutResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: CheckoutResponse | CheckoutError = await response.json();

      if (!response.ok) {
        const errorData = data as CheckoutError;
        setError(errorData.error || 'Erro ao criar checkout');
        return null;
      }

      // Track analytics event (Google Analytics, Meta Pixel, etc.)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'begin_checkout', {
          currency: 'BRL',
          value: (data as CheckoutResponse).preco,
          items: [
            {
              item_id: (data as CheckoutResponse).preferenceId,
              item_name: `Projeto 45 Graus - ${(data as CheckoutResponse).lote}`,
              price: (data as CheckoutResponse).preco,
              quantity: 1,
            },
          ],
        });
      }

      // Redirect to Mercado Pago checkout
      window.location.href = (data as CheckoutResponse).checkoutUrl;

      return data as CheckoutResponse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar solicitação';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckout,
    loading,
    error,
  };
}
