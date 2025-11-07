/**
 * Informações do pagador
 */
export interface Payer {
  name: string;
  email: string;
  identification: {
    type: string;
    number: string;
  };
  phone: {
    number: string;
  };
}

/**
 * Status possíveis de um pagamento
 */
export type PaymentStatus = 'approved' | 'pending' | 'rejected' | 'cancelled' | 'refunded';

/**
 * Dados completos de um pagamento
 */
export interface Payment {
  /** ID único do pagamento no Mercado Pago */
  id: string;

  /** Status atual do pagamento */
  status: PaymentStatus;

  /** Valor da transação */
  transaction_amount: number;

  /** Informações do pagador */
  payer: Payer;

  /** Metadata customizado (lote, splits, etc) */
  metadata: Record<string, any>;

  /** Data de criação */
  date_created?: string;

  /** Data de aprovação */
  date_approved?: string;

  /** Método de pagamento usado */
  payment_method_id?: string;

  /** Tipo de pagamento */
  payment_type_id?: string;
}

/**
 * Preferência de checkout (link de pagamento)
 */
export interface CheckoutPreference {
  /** URL do checkout para redirecionar cliente */
  init_point: string;

  /** ID da preferência criada */
  id: string;

  /** URL do checkout para sandbox */
  sandbox_init_point?: string;
}

/**
 * Item do checkout
 */
export interface CheckoutItem {
  /** Título do produto/serviço */
  title: string;

  /** Preço unitário */
  unit_price: number;

  /** Quantidade */
  quantity: number;

  /** Descrição detalhada (opcional) */
  description?: string;

  /** ID do produto (opcional) */
  id?: string;
}

/**
 * URLs de retorno do checkout
 */
export interface BackUrls {
  /** URL de sucesso */
  success: string;

  /** URL de falha */
  failure: string;

  /** URL de pendente */
  pending: string;
}

/**
 * Body do webhook do Mercado Pago
 */
export interface WebhookBody {
  /** Tipo de notificação */
  type: string;

  /** Data da notificação */
  date_created: string;

  /** Dados da notificação */
  data: {
    /** ID do recurso (payment, merchant_order, etc) */
    id: string;
  };

  /** Ação que gerou a notificação */
  action: string;

  /** ID do usuário */
  user_id: string;
}
