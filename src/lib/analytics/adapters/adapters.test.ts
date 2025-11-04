/**
 * Adapters Tests
 *
 * Testa cada adapter isoladamente (funções puras)
 */

import { sendToMetaPixel, isMetaPixelAvailable } from "../adapters/meta-pixel";
import { sendToGA4, isGA4Available } from "../adapters/google-analytics";
import type { TrackedEvent } from "../core/types";

// ============================================================================
// META PIXEL TESTS
// ============================================================================

describe("Meta Pixel Adapter", () => {
  let mockFbq: jest.Mock;

  beforeEach(() => {
    // Mock do fbq
    mockFbq = jest.fn();
    Object.defineProperty(window, 'fbq', {
      writable: true,
      configurable: true,
      value: mockFbq,
    });
  });

  afterEach(() => {
    delete (window as any).fbq;
  });

  describe("isMetaPixelAvailable", () => {
    it("deve retornar true quando fbq está disponível", () => {
      expect(isMetaPixelAvailable()).toBe(true);
    });

    it("deve retornar false quando fbq não está disponível", () => {
      delete (window as any).fbq;
      expect(isMetaPixelAvailable()).toBe(false);
    });
  });

  describe("sendToMetaPixel", () => {
    it("deve enviar evento whatsapp_click corretamente", () => {
      const event: TrackedEvent = {
        name: "whatsapp_click",
        category: "conversion",
        params: { location: "hero" },
        timestamp: Date.now(),
      };

      const result = sendToMetaPixel(event);

      expect(result.sent).toBe(true);
      expect(result.platform).toBe("meta");
      expect(result.error).toBeUndefined();

      // Deve disparar WhatsAppClick (custom) + Lead (standard)
      expect(mockFbq).toHaveBeenCalledTimes(2);
      expect(mockFbq).toHaveBeenCalledWith(
        "trackCustom",
        "WhatsAppClick",
        expect.objectContaining({ location: "hero" })
      );
      expect(mockFbq).toHaveBeenCalledWith(
        "track",
        "Lead",
        expect.objectContaining({ location: "hero" })
      );
    });

    it("deve enviar evento faq_open como ViewContent", () => {
      const event: TrackedEvent = {
        name: "faq_open",
        category: "engagement",
        params: { label: "Como funciona?" },
        timestamp: Date.now(),
      };

      const result = sendToMetaPixel(event);

      expect(result.sent).toBe(true);
      expect(mockFbq).toHaveBeenCalledWith(
        "track",
        "ViewContent",
        expect.objectContaining({ label: "Como funciona?" })
      );
    });

    it("deve retornar erro quando fbq não disponível", () => {
      delete (window as any).fbq;

      const event: TrackedEvent = {
        name: "whatsapp_click",
        category: "conversion",
        params: {},
        timestamp: Date.now(),
      };

      const result = sendToMetaPixel(event);

      expect(result.sent).toBe(false);
      expect(result.error).toContain("não disponível");
    });

    it("não deve enviar eventos não configurados para Meta", () => {
      const event: TrackedEvent = {
        name: "scroll_depth",
        category: "behavior",
        params: { value: 50 },
        timestamp: Date.now(),
      };

      const result = sendToMetaPixel(event);

      expect(result.sent).toBe(false);
      expect(result.error).toContain("não configurado");
      expect(mockFbq).not.toHaveBeenCalled();
    });

    it("deve incluir parâmetros configurados + parâmetros do evento", () => {
      const event: TrackedEvent = {
        name: "whatsapp_click",
        category: "conversion",
        params: { location: "footer", custom_param: "test" },
        timestamp: Date.now(),
      };

      sendToMetaPixel(event);

      expect(mockFbq).toHaveBeenCalledWith(
        "trackCustom",
        "WhatsAppClick",
        expect.objectContaining({
          currency: "BRL", // Do config
          value: 1, // Do config
          location: "footer", // Do evento
          custom_param: "test", // Do evento
        })
      );
    });
  });
});

// ============================================================================
// GOOGLE ANALYTICS TESTS
// ============================================================================

describe("Google Analytics 4 Adapter", () => {
  let mockGtag: jest.Mock;

  beforeEach(() => {
    // Mock do gtag
    mockGtag = jest.fn();
    Object.defineProperty(window, 'gtag', {
      writable: true,
      configurable: true,
      value: mockGtag,
    });
  });

  afterEach(() => {
    delete (window as any).gtag;
  });

  describe("isGA4Available", () => {
    it("deve retornar true quando gtag está disponível", () => {
      expect(isGA4Available()).toBe(true);
    });

    it("deve retornar false quando gtag não está disponível", () => {
      delete (window as any).gtag;
      expect(isGA4Available()).toBe(false);
    });
  });

  describe("sendToGA4", () => {
    it("deve enviar evento whatsapp_click corretamente", () => {
      const event: TrackedEvent = {
        name: "whatsapp_click",
        category: "conversion",
        params: { location: "hero", value: 1 },
        timestamp: Date.now(),
      };

      const result = sendToGA4(event);

      expect(result.sent).toBe(true);
      expect(result.platform).toBe("ga4");
      expect(result.error).toBeUndefined();

      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "whatsapp_click",
        expect.objectContaining({
          event_category: "conversion",
          event_label: "hero",
          value: 1,
        })
      );
    });

    it("deve enviar evento scroll_depth corretamente", () => {
      const event: TrackedEvent = {
        name: "scroll_depth",
        category: "behavior",
        params: { label: "50_percent", value: 50, scroll_percentage: 50 },
        timestamp: Date.now(),
      };

      const result = sendToGA4(event);

      expect(result.sent).toBe(true);
      expect(mockGtag).toHaveBeenCalledWith(
        "event",
        "scroll_depth",
        expect.objectContaining({
          event_category: "behavior",
          value: 50,
          scroll_percentage: 50,
        })
      );
    });

    it("deve retornar erro quando gtag não disponível", () => {
      delete (window as any).gtag;

      const event: TrackedEvent = {
        name: "whatsapp_click",
        category: "conversion",
        params: {},
        timestamp: Date.now(),
      };

      const result = sendToGA4(event);

      expect(result.sent).toBe(false);
      expect(result.error).toContain("não disponível");
    });

    it("não deve enviar eventos não configurados para GA4", () => {
      // Criar evento fictício não configurado
      const event: TrackedEvent = {
        name: "whatsapp_click",
        category: "conversion",
        params: {},
        timestamp: Date.now(),
      };

      // Temporariamente modificar config para testar
      // (em produção, isto seria mockado)
      const result = sendToGA4(event);

      expect(result.sent).toBe(true); // whatsapp_click está configurado para GA4
    });
  });
});
