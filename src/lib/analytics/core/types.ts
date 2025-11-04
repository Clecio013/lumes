/**
 * Analytics Core Types
 *
 * Tipos compartilhados por todo o sistema de analytics
 */

// ============================================================================
// EVENT NAMES
// ============================================================================

export type EventName =
  // Conversão
  | "whatsapp_click"
  | "schedule_click"
  // Engajamento
  | "cta_click"
  | "faq_open"
  | "faq_close"
  | "social_click"
  // Comportamento
  | "scroll_depth"
  | "section_view"
  | "header_visible";

export type EventCategory = "conversion" | "engagement" | "behavior";

// ============================================================================
// TRACKED EVENT
// ============================================================================

export interface TrackedEvent {
  /** Nome do evento */
  name: EventName;

  /** Categoria do evento */
  category: EventCategory;

  /** Parâmetros customizados do evento */
  params: Record<string, unknown>;

  /** Timestamp do evento */
  timestamp: number;
}

// ============================================================================
// ADAPTER RESULT
// ============================================================================

export interface AdapterResult {
  /** Se o adapter conseguiu enviar o evento */
  sent: boolean;

  /** Nome da plataforma (ga4, meta, etc) */
  platform: string;

  /** Erro, se houver */
  error?: string;
}

export interface TrackingResult {
  /** Evento que foi rastreado */
  event: TrackedEvent;

  /** Resultados de cada adapter */
  results: AdapterResult[];
}

// ============================================================================
// PLATFORM CONFIG
// ============================================================================

export interface PlatformConfig {
  /** Se este evento deve ser enviado para esta plataforma */
  enabled: boolean;

  /** Nome do evento na plataforma (pode ser diferente do EventName) */
  eventName?: string;

  /** Parâmetros extras específicos da plataforma */
  params?: Record<string, unknown>;
}

export interface EventConfig {
  /** Categoria padrão do evento */
  category: EventCategory;

  /** Configuração por plataforma */
  platforms: {
    ga4?: PlatformConfig;
    meta?: PlatformConfig & {
      /** Eventos Meta podem ter múltiplos (ex: WhatsAppClick + Lead) */
      events?: string[];
    };
  };
}

// ============================================================================
// TRACK EVENT PARAMS (Input do usuário)
// ============================================================================

export interface TrackEventParams {
  /** Nome do evento */
  name: EventName;

  /** Categoria (opcional, usa default do config) */
  category?: EventCategory;

  /** Location/origem do evento */
  location?: string;

  /** Valor numérico do evento */
  value?: number;

  /** Parâmetros extras */
  [key: string]: unknown;
}

// ============================================================================
// ADAPTER INTERFACE
// ============================================================================

export interface AnalyticsAdapter {
  /** Nome da plataforma */
  name: string;

  /** Enviar evento para a plataforma */
  send: (event: TrackedEvent) => AdapterResult;

  /** Verificar se a plataforma está disponível */
  isAvailable: () => boolean;
}
