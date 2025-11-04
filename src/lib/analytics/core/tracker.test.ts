/**
 * Tracker Tests
 *
 * Testa a lógica central de tracking (integração entre adapters)
 */

import { trackEvent, getActiveAdapters, getActivePlatforms } from "../core/tracker";

describe("Core Tracker", () => {
  let mockFbq: jest.Mock;
  let mockGtag: jest.Mock;

  beforeEach(() => {
    // Mock das plataformas
    mockFbq = jest.fn();
    mockGtag = jest.fn();
    Object.defineProperty(window, 'fbq', {
      writable: true,
      configurable: true,
      value: mockFbq,
    });
    Object.defineProperty(window, 'gtag', {
      writable: true,
      configurable: true,
      value: mockGtag,
    });
  });

  afterEach(() => {
    delete (window as any).fbq;
    delete (window as any).gtag;
    jest.clearAllMocks();
  });

  describe("trackEvent", () => {
    it("deve rastrear evento whatsapp_click em ambas plataformas", () => {
      const result = trackEvent({
        name: "whatsapp_click",
        location: "hero",
        value: 1,
      });

      expect(result.event.name).toBe("whatsapp_click");
      expect(result.event.category).toBe("conversion");
      expect(result.event.params).toEqual({
        location: "hero",
        value: 1,
      });

      // Deve ter 2 resultados (GA4 + Meta)
      expect(result.results).toHaveLength(2);

      // GA4
      const ga4Result = result.results.find((r) => r.platform === "ga4");
      expect(ga4Result?.sent).toBe(true);
      expect(mockGtag).toHaveBeenCalled();

      // Meta
      const metaResult = result.results.find((r) => r.platform === "meta");
      expect(metaResult?.sent).toBe(true);
      expect(mockFbq).toHaveBeenCalledTimes(2); // WhatsAppClick + Lead
    });

    it("deve rastrear evento scroll_depth apenas no GA4", () => {
      const result = trackEvent({
        name: "scroll_depth",
        label: "50_percent",
        value: 50,
        scroll_percentage: 50,
      });

      expect(result.event.name).toBe("scroll_depth");
      expect(result.event.category).toBe("behavior");

      // Deve ter apenas 1 resultado (GA4)
      const ga4Result = result.results.find((r) => r.platform === "ga4");
      expect(ga4Result?.sent).toBe(true);
      expect(mockGtag).toHaveBeenCalled();

      // Meta NÃO deve ser chamado
      expect(mockFbq).not.toHaveBeenCalled();
    });

    it("deve rastrear evento faq_open em ambas plataformas", () => {
      const result = trackEvent({
        name: "faq_open",
        label: "Como funciona?",
        question_text: "Como funciona?",
      });

      expect(result.event.name).toBe("faq_open");
      expect(result.event.category).toBe("engagement");

      // GA4
      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "faq_open",
        expect.objectContaining({
          event_category: "engagement",
          label: "Como funciona?",
        })
      );

      // Meta (ViewContent)
      expect(mockFbq).toHaveBeenCalledWith(
        "track",
        "ViewContent",
        expect.anything()
      );
    });

    it("deve permitir sobrescrever categoria", () => {
      const result = trackEvent({
        name: "whatsapp_click",
        category: "engagement", // Override
        location: "test",
      });

      expect(result.event.category).toBe("engagement");
    });

    it("deve lançar erro para evento não configurado", () => {
      expect(() => {
        trackEvent({
          name: "invalid_event" as any,
        });
      }).toThrow("não está configurado");
    });

    it("deve adicionar timestamp automaticamente", () => {
      const before = Date.now();
      const result = trackEvent({
        name: "whatsapp_click",
        location: "test",
      });
      const after = Date.now();

      expect(result.event.timestamp).toBeGreaterThanOrEqual(before);
      expect(result.event.timestamp).toBeLessThanOrEqual(after);
    });

    it("deve lidar com plataformas indisponíveis gracefully", () => {
      // Remove fbq
      delete (window as any).fbq;

      const result = trackEvent({
        name: "whatsapp_click",
        location: "test",
      });

      // GA4 ainda deve funcionar
      const ga4Result = result.results.find((r) => r.platform === "ga4");
      expect(ga4Result?.sent).toBe(true);

      // Meta deve ter erro mas não quebrar
      const metaResult = result.results.find((r) => r.platform === "meta");
      expect(metaResult?.sent).toBe(false);
      expect(metaResult?.error).toBeTruthy();
    });
  });

  describe("getActiveAdapters", () => {
    it("deve retornar adapters disponíveis", () => {
      const adapters = getActiveAdapters();
      expect(adapters.length).toBeGreaterThan(0);
    });

    it("deve retornar array vazio se nenhum adapter disponível", () => {
      delete (window as any).fbq;
      delete (window as any).gtag;

      const adapters = getActiveAdapters();
      expect(adapters).toHaveLength(0);
    });
  });

  describe("getActivePlatforms", () => {
    it("deve retornar nomes das plataformas ativas", () => {
      const platforms = getActivePlatforms();
      expect(platforms).toContain("ga4");
      expect(platforms).toContain("meta");
    });

    it("deve retornar apenas plataformas disponíveis", () => {
      delete (window as any).fbq;

      const platforms = getActivePlatforms();
      expect(platforms).toContain("ga4");
      expect(platforms).not.toContain("meta");
    });
  });
});
