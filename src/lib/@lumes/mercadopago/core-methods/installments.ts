/**
 * Installments Manager - Gerenciamento de Parcelas
 *
 * Busca opções de parcelamento dinamicamente da API do Mercado Pago
 * com base no valor e BIN (primeiros 6 dígitos) do cartão.
 */

import type { InstallmentsResponse, InstallmentOption, MercadoPagoSDK } from './types';

/**
 * Gerenciador de parcelas do Mercado Pago
 *
 * Permite buscar opções de parcelamento dinamicamente com base no valor
 * e no BIN (primeiros 6 dígitos) do cartão.
 *
 * @example
 * ```typescript
 * const manager = new InstallmentsManager(publicKey);
 *
 * // Buscar parcelas após usuário digitar número do cartão
 * const options = await manager.getInstallments({
 *   amount: 397.00,
 *   bin: '411111', // Primeiros 6 dígitos do cartão
 * });
 *
 * console.log(options); // [{ installments: 1, installment_amount: 397, ... }, ...]
 * ```
 */
export class InstallmentsManager {
  private mp: MercadoPagoSDK | null = null;
  private publicKey: string;

  constructor(publicKey: string) {
    this.publicKey = publicKey;
  }

  /**
   * Inicializa o SDK do Mercado Pago (necessário no browser)
   */
  private initializeSDK(): void {
    if (typeof window === 'undefined') {
      throw new Error('InstallmentsManager só pode ser usado no browser');
    }

    if (!window.MercadoPago) {
      throw new Error('SDK do Mercado Pago não carregado. Adicione o script na página.');
    }

    if (!this.mp) {
      this.mp = new window.MercadoPago(this.publicKey, { locale: 'pt-BR' }) as unknown as MercadoPagoSDK;
    }
  }

  /**
   * Busca opções de parcelamento da API do Mercado Pago
   *
   * @param amount - Valor do pagamento (em reais, ex: 397.00)
   * @param bin - Primeiros 6 dígitos do cartão
   * @param paymentMethodId - ID do método de pagamento (opcional, será detectado automaticamente se omitido)
   * @returns Promise com array de opções de parcelamento
   *
   * @throws Error se SDK não estiver inicializado ou se API falhar
   *
   * @example
   * ```typescript
   * const options = await manager.getInstallments({
   *   amount: 397.00,
   *   bin: '411111',
   * });
   * ```
   */
  async getInstallments(params: {
    amount: number;
    bin: string;
    paymentMethodId?: string;
  }): Promise<InstallmentOption[]> {
    this.initializeSDK();

    if (!this.mp) {
      throw new Error('SDK não inicializado');
    }

    try {
      if (typeof this.mp.getInstallments !== 'function') {
        throw new Error('Método getInstallments não disponível no SDK do Mercado Pago');
      }

      const response = await this.mp.getInstallments({
        amount: params.amount.toString(),
        bin: params.bin,
        payment_method_id: params.paymentMethodId,
      });

      if (!response || response.length === 0) {
        return [];
      }

      // A API retorna um array com um objeto contendo payer_costs
      const installmentsData = response[0];
      const payerCosts = installmentsData.payer_costs || [];

      return payerCosts;
    } catch (error) {
      console.error('[InstallmentsManager] Erro ao buscar parcelas:', error);
      // Retornar array vazio em vez de lançar erro
      return [];
    }
  }

  /**
   * Detecta o BIN do cartão a partir de um evento do card field
   *
   * Útil para detectar automaticamente quando o usuário digita o número do cartão
   * e buscar as parcelas disponíveis.
   *
   * @param cardField - Card field do número do cartão
   * @param onBinDetected - Callback chamado quando BIN é detectado (primeiros 6 dígitos)
   *
   * @example
   * ```typescript
   * const cardNumberField = mp.fields.create('cardNumber');
   * cardNumberField.mount('cardNumber');
   *
   * manager.detectBinFromCardField(cardNumberField, async (bin) => {
   *   const options = await manager.getInstallments({ amount: 397, bin });
   *   setInstallmentOptions(options);
   * });
   * ```
   */
  detectBinFromCardField(
    cardField: any,
    onBinDetected: (bin: string, paymentMethodId: string) => void
  ): void {
    cardField.on('binChange', (event: any) => {
      if (event.bin && event.bin.length >= 6) {
        // Pegar apenas os primeiros 6 dígitos (BIN padrão)
        const bin = event.bin.substring(0, 6);
        const paymentMethodId = event.paymentMethodId || '';
        onBinDetected(bin, paymentMethodId);
      }
    });
  }
}

/**
 * Factory function para criar InstallmentsManager
 *
 * @param publicKey - Public Key do Mercado Pago
 * @returns Instância de InstallmentsManager
 *
 * @example
 * ```typescript
 * const manager = createInstallmentsManager(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);
 * ```
 */
export function createInstallmentsManager(publicKey: string): InstallmentsManager {
  return new InstallmentsManager(publicKey);
}
