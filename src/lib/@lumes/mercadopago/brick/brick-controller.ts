/**
 * Controller para gerenciar o lifecycle do Payment Brick
 *
 * Responsabilidades:
 * - Verificar se SDK está carregado
 * - Inicializar Mercado Pago instance
 * - Renderizar o Brick em um container específico
 * - Gerenciar cleanup (unmount)
 */

import type {
  PaymentBrickSettings,
  MercadoPagoInstance,
  BricksBuilder,
  BrickController,
} from './types';

export class PaymentBrickController {
  private mpInstance: MercadoPagoInstance | null = null;
  private brickController: BrickController | null = null;
  private publicKey: string;

  constructor(publicKey: string) {
    if (!publicKey) {
      throw new Error('[PaymentBrickController] Public key é obrigatória');
    }
    this.publicKey = publicKey;
  }

  /**
   * Verifica se o SDK do Mercado Pago está carregado
   */
  private isSdkLoaded(): boolean {
    return typeof window !== 'undefined' && typeof window.MercadoPago !== 'undefined';
  }

  /**
   * Aguarda o SDK carregar (útil para SSR/Next.js)
   */
  private async waitForSdk(timeout: number = 10000): Promise<void> {
    if (this.isSdkLoaded()) {
      return;
    }

    const startTime = Date.now();

    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.isSdkLoaded()) {
          clearInterval(interval);
          resolve();
          return;
        }

        if (Date.now() - startTime > timeout) {
          clearInterval(interval);
          reject(new Error('[PaymentBrickController] Timeout aguardando SDK do Mercado Pago'));
        }
      }, 100);
    });
  }

  /**
   * Inicializa a instância do Mercado Pago
   */
  private initializeMercadoPago(): MercadoPagoInstance {
    if (!this.isSdkLoaded()) {
      throw new Error(
        '[PaymentBrickController] SDK do Mercado Pago não está carregado. ' +
        'Certifique-se de incluir: <script src="https://sdk.mercadopago.com/js/v2"></script>'
      );
    }

    try {
      this.mpInstance = new window.MercadoPago(this.publicKey, {
        locale: 'pt-BR',
      });
      return this.mpInstance;
    } catch (error) {
      throw new Error(
        `[PaymentBrickController] Erro ao inicializar Mercado Pago: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Renderiza o Payment Brick em um container
   *
   * @param containerId ID do elemento HTML onde o Brick será renderizado
   * @param settings Configurações do Brick (use PaymentBrickBuilder para criar)
   * @returns Controller do Brick (para unmount/update)
   */
  async render(
    containerId: string,
    settings: PaymentBrickSettings
  ): Promise<BrickController> {
    try {
      // 1. Aguardar SDK carregar (caso ainda não tenha carregado)
      await this.waitForSdk();

      // 2. Inicializar Mercado Pago instance (se ainda não foi)
      if (!this.mpInstance) {
        this.mpInstance = this.initializeMercadoPago();
      }

      // 3. Verificar se container existe
      if (typeof document !== 'undefined') {
        const container = document.getElementById(containerId);
        if (!container) {
          throw new Error(
            `[PaymentBrickController] Container com ID "${containerId}" não encontrado no DOM`
          );
        }
      }

      // 4. Obter bricks builder
      const bricksBuilder: BricksBuilder = this.mpInstance.bricks();

      // 5. Criar e renderizar o Payment Brick
      console.log('[PaymentBrickController] Renderizando Payment Brick...');
      this.brickController = await bricksBuilder.create('payment', containerId, settings);

      console.log('[PaymentBrickController] ✅ Payment Brick renderizado com sucesso');
      return this.brickController;
    } catch (error) {
      console.error('[PaymentBrickController] Erro ao renderizar Brick:', error);
      throw new Error(
        `[PaymentBrickController] Falha ao renderizar: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Remove o Brick do DOM e limpa recursos
   */
  unmount(): void {
    if (this.brickController) {
      try {
        this.brickController.unmount();
        console.log('[PaymentBrickController] Brick removido do DOM');
      } catch (error) {
        console.error('[PaymentBrickController] Erro ao fazer unmount:', error);
      } finally {
        this.brickController = null;
      }
    }
  }

  /**
   * Atualiza valor do pagamento
   */
  updateAmount(amount: number): void {
    if (!this.brickController) {
      throw new Error('[PaymentBrickController] Brick não foi renderizado ainda');
    }

    try {
      this.brickController.update({ amount });
      console.log('[PaymentBrickController] Valor atualizado:', amount);
    } catch (error) {
      console.error('[PaymentBrickController] Erro ao atualizar valor:', error);
      throw error;
    }
  }

  /**
   * Verifica se o Brick está renderizado
   */
  isRendered(): boolean {
    return this.brickController !== null;
  }
}

/**
 * Factory para criar controller com public key do ambiente
 */
export function createPaymentBrickController(publicKey?: string): PaymentBrickController {
  const key = publicKey || process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;

  if (!key) {
    throw new Error(
      '[createPaymentBrickController] Public key não encontrada. ' +
      'Defina NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY no .env.local'
    );
  }

  return new PaymentBrickController(key);
}
