/**
 * Types para Mercado Pago Bricks
 * Baseado na documentação oficial: https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks
 */

// ============================================================================
// Payment Brick Types
// ============================================================================

/**
 * Dados do formulário enviados pelo Payment Brick ao fazer submit
 */
export interface PaymentBrickFormData {
  /**
   * Token gerado pelo MP (representa os dados do cartão de forma segura)
   * Usado apenas para pagamentos com cartão
   */
  token?: string;

  /**
   * ID do método de pagamento escolhido
   * Ex: 'pix', 'visa', 'master', 'bolbradesco'
   */
  payment_method_id: string;

  /**
   * Tipo de método de pagamento
   * Ex: 'credit_card', 'debit_card', 'bank_transfer', 'ticket'
   */
  payment_type_id?: string;

  /**
   * Valor da transação (em reais, não centavos)
   */
  transaction_amount: number;

  /**
   * Número de parcelas (apenas para cartão de crédito)
   */
  installments?: number;

  /**
   * ID do emissor do cartão
   */
  issuer_id?: string;

  /**
   * Dados do pagador
   */
  payer: {
    email: string;
    identification?: {
      type: string; // 'CPF' ou 'CNPJ'
      number: string;
    };
    first_name?: string;
    last_name?: string;
  };

  /**
   * Informações adicionais de cobrança (PIX, boleto)
   */
  additional_info?: {
    items?: Array<{
      id?: string;
      title: string;
      description?: string;
      quantity: number;
      unit_price: number;
    }>;
  };
}

/**
 * Configurações de inicialização do Payment Brick
 */
export interface PaymentBrickInitialization {
  /**
   * Valor do pagamento (obrigatório)
   */
  amount: number;

  /**
   * Dados pré-preenchidos do pagador (opcional)
   */
  payer?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    identification?: {
      type: string;
      number: string;
    };
  };
}

/**
 * Customização visual do Payment Brick
 */
export interface PaymentBrickCustomization {
  visual?: {
    /**
     * Estilo visual do Brick
     */
    style?: {
      /**
       * Tema do formulário
       * - 'default': tema padrão do MP
       * - 'dark': tema escuro
       * - 'bootstrap': compatível com Bootstrap
       * - 'flat': design flat
       */
      theme?: 'default' | 'dark' | 'bootstrap' | 'flat';

      /**
       * Variáveis CSS customizadas
       */
      customVariables?: {
        textPrimaryColor?: string;
        textSecondaryColor?: string;
        inputBackgroundColor?: string;
        formBackgroundColor?: string;
        baseColor?: string;
        baseColorFirstVariant?: string;
        baseColorSecondVariant?: string;
        errorColor?: string;
        successColor?: string;
        outlinePrimaryColor?: string;
        outlineSecondaryColor?: string;
        buttonTextColor?: string;
        fontSizeExtraSmall?: string;
        fontSizeSmall?: string;
        fontSizeMedium?: string;
        fontSizeLarge?: string;
        fontSizeExtraLarge?: string;
        fontWeightNormal?: string;
        fontWeightSemiBold?: string;
        formInputsTextTransform?: string;
        inputVerticalPadding?: string;
        inputHorizontalPadding?: string;
        inputFocusedBoxShadow?: string;
        inputErrorFocusedBoxShadow?: string;
        inputBorderWidth?: string;
        inputFocusedBorderWidth?: string;
        borderRadiusSmall?: string;
        borderRadiusMedium?: string;
        borderRadiusLarge?: string;
        borderRadiusFull?: string;
      };
    };

    /**
     * Ocultar elementos específicos do Brick
     */
    hideFormTitle?: boolean;
    hidePaymentButton?: boolean;
    hideRedirectionPanel?: boolean;
  };

  /**
   * Configuração de métodos de pagamento habilitados
   */
  paymentMethods?: {
    /**
     * Tipos de cartão de crédito aceitos
     * - 'all': todos
     * - array de IDs: apenas específicos (ex: ['visa', 'master'])
     */
    creditCard?: 'all' | string[];

    /**
     * Tipos de cartão de débito aceitos
     */
    debitCard?: 'all' | string[];

    /**
     * Boleto bancário
     */
    ticket?: 'all' | string[];

    /**
     * PIX
     */
    bankTransfer?: 'all' | string[];

    /**
     * Conta Mercado Pago
     */
    mercadoPago?: 'all' | string[];

    /**
     * Número máximo de parcelas (apenas cartão de crédito)
     */
    maxInstallments?: number;

    /**
     * Número mínimo de parcelas
     */
    minInstallments?: number;
  };
}

/**
 * Callbacks do Payment Brick
 */
export interface PaymentBrickCallbacks {
  /**
   * Chamado quando o formulário é enviado
   * @param formData Dados do formulário (já tokenizados)
   * @returns Promise que resolve quando processamento terminar
   */
  onSubmit: (formData: PaymentBrickFormData) => Promise<void>;

  /**
   * Chamado quando o Brick termina de carregar
   */
  onReady?: () => void;

  /**
   * Chamado quando ocorre um erro
   */
  onError?: (error: BrickError) => void;

  /**
   * Chamado quando dados do formulário mudam
   */
  onBinChange?: (bin: string) => void;
}

/**
 * Configurações completas do Payment Brick
 */
export interface PaymentBrickSettings {
  initialization: PaymentBrickInitialization;
  customization?: PaymentBrickCustomization;
  callbacks: PaymentBrickCallbacks;
}

// ============================================================================
// Brick Controller Types
// ============================================================================

/**
 * Instância do controller do Brick retornada pelo SDK
 */
export interface BrickController {
  /**
   * Destrói o Brick (remove do DOM e limpa listeners)
   */
  unmount: () => void;

  /**
   * Atualiza valor do pagamento
   */
  update: (updates: { amount?: number }) => void;
}

/**
 * Erro retornado pelo Brick
 */
export interface BrickError {
  type: string;
  message: string;
  cause?: unknown;
}

// ============================================================================
// Mercado Pago SDK Types (declarações globais)
// ============================================================================

/**
 * Instância principal do SDK do Mercado Pago
 */
export interface MercadoPagoInstance {
  bricks: () => BricksBuilder;
}

/**
 * Builder de Bricks
 */
export interface BricksBuilder {
  create: (
    brickType: 'payment' | 'cardPayment' | 'statusScreen' | 'wallet',
    containerId: string,
    settings: PaymentBrickSettings
  ) => Promise<BrickController>;
}

/**
 * Classe global do Mercado Pago SDK
 */
declare global {
  interface Window {
    MercadoPago: new (publicKey: string, options?: { locale?: string }) => MercadoPagoInstance;
  }
}

export {};
