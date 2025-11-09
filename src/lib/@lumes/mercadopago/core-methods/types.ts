/**
 * Types para Mercado Pago Core Methods (Checkout Transparente)
 *
 * Core Methods usa iframes seguros para campos sensíveis do cartão,
 * mantendo PCI compliance simplificado (SAQ-A).
 */

// ============================================================================
// Card Fields (Iframes Seguros)
// ============================================================================

/**
 * Tipos de campos que podem ser criados como iframes seguros
 */
export type CardFieldType = 'cardNumber' | 'expirationDate' | 'securityCode';

/**
 * Opções de customização de um card field
 */
export interface CardFieldOptions {
  /**
   * Placeholder do campo
   */
  placeholder?: string;

  /**
   * Classes CSS customizadas
   */
  style?: {
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    '::placeholder'?: {
      color?: string;
    };
  };
}

/**
 * Instância de um card field (retornado por mp.fields.create())
 */
export interface CardField {
  /**
   * Monta o field em um container DOM
   */
  mount: (elementId: string) => void;

  /**
   * Remove o field do DOM
   */
  unmount: () => void;

  /**
   * Adiciona listener de eventos
   */
  on: (event: 'blur' | 'focus' | 'ready' | 'validityChange' | 'binChange', callback: (data: any) => void) => void;
}

// ============================================================================
// Card Token
// ============================================================================

/**
 * Dados necessários para criar token de cartão
 */
export interface CardTokenData {
  /**
   * Nome do titular do cartão
   */
  cardholderName: string;

  /**
   * Tipo de identificação (CPF ou CNPJ)
   */
  identificationType: 'CPF' | 'CNPJ';

  /**
   * Número da identificação
   */
  identificationNumber: string;
}

/**
 * Token de cartão gerado (resposta de createCardToken)
 */
export interface CardToken {
  /**
   * ID do token (enviar para backend)
   */
  id: string;

  /**
   * Primeiros 6 dígitos do cartão (BIN)
   */
  first_six_digits: string;

  /**
   * Últimos 4 dígitos do cartão
   */
  last_four_digits: string;

  /**
   * Método de pagamento detectado (visa, master, etc.)
   */
  payment_method_id: string;

  /**
   * Mês de expiração
   */
  expiration_month: number;

  /**
   * Ano de expiração
   */
  expiration_year: number;

  /**
   * Nome do titular
   */
  cardholder: {
    name: string;
    identification: {
      type: string;
      number: string;
    };
  };
}

/**
 * Erro ao criar token
 */
export interface CardTokenError {
  /**
   * Código do erro
   */
  code: string;

  /**
   * Mensagem de erro
   */
  message: string;

  /**
   * Detalhes adicionais
   */
  cause?: Array<{
    code: string;
    description: string;
  }>;
}

// ============================================================================
// Installments (Parcelas)
// ============================================================================

/**
 * Opção de parcelamento disponível
 */
export interface InstallmentOption {
  /**
   * Número de parcelas
   */
  installments: number;

  /**
   * Valor de cada parcela
   */
  installment_amount: number;

  /**
   * Valor total (com juros, se houver)
   */
  total_amount: number;

  /**
   * Taxa de juros (%)
   */
  installment_rate: number;

  /**
   * Label recomendado para exibir
   * Ex: "3x de R$ 133,00"
   */
  recommended_message: string;
}

/**
 * Resposta da API de parcelas
 */
export interface InstallmentsResponse {
  /**
   * ID do método de pagamento
   */
  payment_method_id: string;

  /**
   * Opções de parcelamento disponíveis
   */
  payer_costs: InstallmentOption[];
}

// ============================================================================
// Payment Data (Payload completo para criar pagamento)
// ============================================================================

/**
 * Dados pessoais do pagador
 */
export interface PayerData {
  fullName: string;
  email: string;
  phone: string;
  birthdate: string; // YYYY-MM-DD
  cpf: string;
}

/**
 * Dados do pagamento com cartão
 */
export interface CardPaymentData extends PayerData {
  paymentMethod: 'card';
  cardToken: string;
  installments: number;
}

/**
 * Dados do pagamento com PIX
 */
export interface PixPaymentData extends PayerData {
  paymentMethod: 'pix';
}

/**
 * Union type de dados de pagamento
 */
export type PaymentData = CardPaymentData | PixPaymentData;

// ============================================================================
// PIX Response
// ============================================================================

/**
 * Dados do QR Code PIX retornados pela API
 */
export interface PixQRCodeData {
  /**
   * QR Code em formato Base64 (imagem)
   */
  qr_code_base64: string;

  /**
   * Código PIX copia-e-cola
   */
  qr_code: string;

  /**
   * URL do ticket (página do MP com QR Code)
   */
  ticket_url?: string;
}

/**
 * Resposta de pagamento PIX
 */
export interface PixPaymentResponse {
  /**
   * ID do pagamento
   */
  id: number;

  /**
   * Status (sempre 'pending' para PIX não pago)
   */
  status: 'pending';

  /**
   * Dados do QR Code
   */
  point_of_interaction: {
    transaction_data: PixQRCodeData;
  };

  /**
   * Data de expiração do PIX
   */
  date_of_expiration?: string;
}

// ============================================================================
// SDK Types (Global)
// ============================================================================

/**
 * Interface do MP Fields (Core Methods)
 */
export interface MPFields {
  /**
   * Cria um card field (iframe seguro)
   */
  create: (type: CardFieldType, options?: CardFieldOptions) => CardField;

  /**
   * Cria token de cartão
   */
  createCardToken: (data: CardTokenData) => Promise<CardToken>;
}

/**
 * Interface completa do SDK Mercado Pago (Core Methods)
 */
export interface MercadoPagoSDK {
  /**
   * Core Methods fields
   */
  fields: MPFields;

  /**
   * Obter métodos de pagamento disponíveis
   */
  getPaymentMethods: (filters?: { bin?: string }) => Promise<any[]>;

  /**
   * Obter opções de parcelamento
   */
  getInstallments: (params: {
    amount: string;
    bin: string;
    payment_method_id?: string;
  }) => Promise<InstallmentsResponse[]>;

  /**
   * Obter issuers (emissores) do cartão
   */
  getIssuers: (params: { payment_method_id: string; bin: string }) => Promise<any[]>;
}

// Nota: A declaração global de window.MercadoPago já existe no SDK oficial
// Estamos usando type assertion (as unknown as MercadoPagoSDK) onde necessário
