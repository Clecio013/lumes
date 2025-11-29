/**
 * @lumes/tracking
 *
 * Sistema modular e testável de tracking de eventos
 * - GA4, Meta Pixel
 * - Componentes React (AnalyticsProvider, MetaPixel, etc)
 * - Hook useTracking
 */

// Core
export * from "./core";

// Config
export * from "./config/events";

// Adapters (caso precise usar diretamente)
export * from "./adapters";

// Components (React)
export * from "./components";

// Hooks
export * from "./hooks/useTracking";
