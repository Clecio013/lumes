/**
 * Gerenciador de Card Fields (iframes seguros) do Mercado Pago
 *
 * Responsabilidades:
 * - Inicializar SDK do Mercado Pago
 * - Criar e montar card fields (número, validade, CVV)
 * - Gerenciar lifecycle (mount, unmount)
 * - Listeners de eventos (binChange, validityChange)
 */

import type { MercadoPagoSDK, CardField, CardFieldType, CardFieldOptions } from './types';

export class CardFieldsManager {
  private sdk: MercadoPagoSDK | null = null;
  private fields: Map<CardFieldType, CardField> = new Map();
  private publicKey: string;

  constructor(publicKey: string) {
    if (!publicKey) {
      throw new Error('[CardFieldsManager] Public key é obrigatória');
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
          reject(new Error('[CardFieldsManager] Timeout aguardando SDK do Mercado Pago'));
        }
      }, 100);
    });
  }

  /**
   * Inicializa o SDK do Mercado Pago
   */
  async initialize(): Promise<void> {
    if (this.sdk) {
      return; // Já inicializado
    }

    // Aguardar SDK carregar
    await this.waitForSdk();

    if (!this.isSdkLoaded()) {
      throw new Error(
        '[CardFieldsManager] SDK do Mercado Pago não está carregado. ' +
        'Certifique-se de incluir: <script src="https://sdk.mercadopago.com/js/v2"></script>'
      );
    }

    try {
      this.sdk = new window.MercadoPago(this.publicKey, {
        locale: 'pt-BR',
      }) as unknown as MercadoPagoSDK;
      console.log('[CardFieldsManager] SDK inicializado com sucesso');
    } catch (error) {
      throw new Error(
        `[CardFieldsManager] Erro ao inicializar Mercado Pago: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Cria e monta um card field em um container
   *
   * @param type Tipo do field ('cardNumber', 'expirationDate', 'securityCode')
   * @param elementId ID do elemento HTML onde o field será montado
   * @param options Opções de customização (placeholder, style)
   */
  async createField(
    type: CardFieldType,
    elementId: string,
    options?: CardFieldOptions
  ): Promise<CardField> {
    // Garantir que SDK está inicializado
    if (!this.sdk) {
      await this.initialize();
    }

    if (!this.sdk) {
      throw new Error('[CardFieldsManager] SDK não inicializado');
    }

    // Verificar se container existe
    if (typeof document !== 'undefined') {
      const container = document.getElementById(elementId);
      if (!container) {
        throw new Error(`[CardFieldsManager] Container com ID "${elementId}" não encontrado no DOM`);
      }
    }

    try {
      // Criar field
      const field = this.sdk.fields.create(type, options);

      // Montar no container
      field.mount(elementId);

      // Armazenar referência
      this.fields.set(type, field);

      console.log(`[CardFieldsManager] Field "${type}" montado em #${elementId}`);

      return field;
    } catch (error) {
      throw new Error(
        `[CardFieldsManager] Erro ao criar field "${type}": ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Cria todos os card fields de uma vez
   *
   * @param containers Mapeamento de tipo → elementId
   * @param options Opções globais ou por field
   */
  async createAllFields(
    containers: {
      cardNumber: string;
      expirationDate: string;
      securityCode: string;
    },
    options?: {
      global?: CardFieldOptions;
      cardNumber?: CardFieldOptions;
      expirationDate?: CardFieldOptions;
      securityCode?: CardFieldOptions;
    }
  ): Promise<void> {
    // Criar field de número do cartão
    await this.createField('cardNumber', containers.cardNumber, {
      ...options?.global,
      ...options?.cardNumber,
      placeholder: options?.cardNumber?.placeholder || 'Número do cartão',
    });

    // Criar field de data de validade
    await this.createField('expirationDate', containers.expirationDate, {
      ...options?.global,
      ...options?.expirationDate,
      placeholder: options?.expirationDate?.placeholder || 'MM/AA',
    });

    // Criar field de CVV
    await this.createField('securityCode', containers.securityCode, {
      ...options?.global,
      ...options?.securityCode,
      placeholder: options?.securityCode?.placeholder || 'CVV',
    });

    console.log('[CardFieldsManager] Todos os fields criados com sucesso');
  }

  /**
   * Retorna a instância do SDK (para usar getInstallments, etc.)
   */
  getSDK(): MercadoPagoSDK {
    if (!this.sdk) {
      throw new Error('[CardFieldsManager] SDK não inicializado. Chame initialize() primeiro.');
    }
    return this.sdk;
  }

  /**
   * Retorna um field específico
   */
  getField(type: CardFieldType): CardField | undefined {
    return this.fields.get(type);
  }

  /**
   * Remove todos os fields do DOM e limpa recursos
   */
  unmountAll(): void {
    this.fields.forEach((field, type) => {
      try {
        field.unmount();
        console.log(`[CardFieldsManager] Field "${type}" removido`);
      } catch (error) {
        console.error(`[CardFieldsManager] Erro ao remover field "${type}":`, error);
      }
    });

    this.fields.clear();
  }

  /**
   * Adiciona listener de evento em um field
   */
  onFieldEvent(
    type: CardFieldType,
    event: 'blur' | 'focus' | 'ready' | 'validityChange' | 'binChange',
    callback: (data: any) => void
  ): void {
    const field = this.fields.get(type);
    if (!field) {
      throw new Error(`[CardFieldsManager] Field "${type}" não existe`);
    }
    field.on(event, callback);
  }
}

/**
 * Factory para criar CardFieldsManager com public key do ambiente
 */
export function createCardFieldsManager(publicKey?: string): CardFieldsManager {
  const key = publicKey || process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;

  if (!key) {
    throw new Error(
      '[createCardFieldsManager] Public key não encontrada. ' +
      'Defina NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY no .env.local'
    );
  }

  return new CardFieldsManager(key);
}
