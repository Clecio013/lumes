/**
 * Analytics Adapters - UTM Integration Tests
 *
 * Integration tests verifying UTMs are correctly passed to Meta Pixel and GA4
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { sendToGA4, isGA4Available } from './google-analytics';
import { sendToMetaPixel, isMetaPixelAvailable } from './meta-pixel';
import {
  saveUTMsToCookie,
  clearUTMsCookie,
} from '@/lib/@lumes/analytics/utm/utm-storage';
import type { TrackedEvent } from '../core/types';
import type { UTMParams } from '@/lib/@lumes/analytics/utm/types';

// Mock window global objects
const mockGtag = jest.fn();
const mockFbq = jest.fn();

describe('Analytics Adapters - UTM Integration', () => {
  beforeEach(() => {
    // Setup window.gtag and window.fbq
    (window as any).gtag = mockGtag;
    (window as any).fbq = mockFbq;

    // Clear cookies and mocks
    clearUTMsCookie();
    mockGtag.mockClear();
    mockFbq.mockClear();
  });

  afterEach(() => {
    clearUTMsCookie();
    delete (window as any).gtag;
    delete (window as any).fbq;
  });

  describe('Google Analytics 4 - UTM Integration', () => {
    it('should include UTMs in GA4 events when cookie exists', () => {
      const utms: UTMParams = {
        source: 'meta',
        medium: 'paid',
        campaign: 'black45-autoridade',
        content: 'video-autoridade',
        term: 'frio-sp-rj',
      };
      saveUTMsToCookie(utms);

      const event: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: {
          location: 'hero',
        },
      };

      const result = sendToGA4(event);

      expect(result.sent).toBe(true);
      expect(mockGtag).toHaveBeenCalledWith('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: 'hero',
        value: undefined,
        // UTMs with GA4 naming convention
        campaign_source: 'meta',
        campaign_medium: 'paid',
        campaign_name: 'black45-autoridade',
        campaign_content: 'video-autoridade',
        campaign_term: 'frio-sp-rj',
        // Event params
        location: 'hero',
      });
    });

    it('should handle events without UTMs gracefully (no cookie)', () => {
      // No UTMs saved
      clearUTMsCookie();

      const event: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: {
          location: 'footer',
        },
      };

      const result = sendToGA4(event);

      expect(result.sent).toBe(true);
      expect(mockGtag).toHaveBeenCalledWith('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: 'footer',
        value: undefined,
        // No UTM params included
        location: 'footer',
      });
    });

    it('should include partial UTMs (some null values)', () => {
      const utms: UTMParams = {
        source: 'email',
        medium: null,
        campaign: 'newsletter',
        content: null,
        term: null,
      };
      saveUTMsToCookie(utms);

      const event: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: {
          location: 'hero',
        },
      };

      const result = sendToGA4(event);

      expect(result.sent).toBe(true);
      expect(mockGtag).toHaveBeenCalledWith('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: 'hero',
        value: undefined,
        // Partial UTMs (null values included)
        campaign_source: 'email',
        campaign_medium: null,
        campaign_name: 'newsletter',
        campaign_content: null,
        campaign_term: null,
        location: 'hero',
      });
    });

    it('should preserve UTMs across multiple events', () => {
      const utms: UTMParams = {
        source: 'meta',
        medium: 'paid',
        campaign: 'black45',
        content: null,
        term: null,
      };
      saveUTMsToCookie(utms);

      // Event 1: WhatsApp click
      const event1: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: { location: 'hero' },
      };
      sendToGA4(event1);

      // Event 2: Another WhatsApp click
      const event2: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: { location: 'footer' },
      };
      sendToGA4(event2);

      // Both should have same UTMs
      expect(mockGtag).toHaveBeenCalledTimes(2);

      // First call
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'whatsapp_click', expect.objectContaining({
        campaign_source: 'meta',
        campaign_medium: 'paid',
        campaign_name: 'black45',
      }));

      // Second call
      expect(mockGtag).toHaveBeenNthCalledWith(2, 'event', 'whatsapp_click', expect.objectContaining({
        campaign_source: 'meta',
        campaign_medium: 'paid',
        campaign_name: 'black45',
      }));
    });
  });

  describe('Meta Pixel - UTM Integration', () => {
    it('should include UTMs in Meta Pixel events when cookie exists', () => {
      const utms: UTMParams = {
        source: 'meta',
        medium: 'paid',
        campaign: 'black45-objecoes',
        content: 'video-objecoes',
        term: 'frio-sp-rj',
      };
      saveUTMsToCookie(utms);

      const event: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: {
          location: 'hero',
        },
      };

      const result = sendToMetaPixel(event);

      expect(result.sent).toBe(true);

      // Meta Pixel uses utm_* naming (not campaign_*)
      expect(mockFbq).toHaveBeenCalledWith('trackCustom', 'WhatsAppClick', expect.objectContaining({
        utm_source: 'meta',
        utm_medium: 'paid',
        utm_campaign: 'black45-objecoes',
        utm_content: 'video-objecoes',
        utm_term: 'frio-sp-rj',
        location: 'hero',
      }));

      expect(mockFbq).toHaveBeenCalledWith('track', 'Lead', expect.objectContaining({
        utm_source: 'meta',
        utm_medium: 'paid',
        utm_campaign: 'black45-objecoes',
        utm_content: 'video-objecoes',
        utm_term: 'frio-sp-rj',
        location: 'hero',
      }));
    });

    it('should handle events without UTMs gracefully (no cookie)', () => {
      clearUTMsCookie();

      const event: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: {
          location: 'footer',
        },
      };

      const result = sendToMetaPixel(event);

      expect(result.sent).toBe(true);

      // No UTM params included (but config params still present)
      expect(mockFbq).toHaveBeenCalledWith('trackCustom', 'WhatsAppClick', expect.objectContaining({
        location: 'footer',
      }));

      expect(mockFbq).toHaveBeenCalledWith('track', 'Lead', expect.objectContaining({
        location: 'footer',
      }));
    });

    it('should include partial UTMs (some null values)', () => {
      const utms: UTMParams = {
        source: 'google',
        medium: null,
        campaign: 'organic',
        content: null,
        term: null,
      };
      saveUTMsToCookie(utms);

      const event: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: {
          location: 'hero',
        },
      };

      const result = sendToMetaPixel(event);

      expect(result.sent).toBe(true);
      expect(mockFbq).toHaveBeenCalledWith('trackCustom', 'WhatsAppClick', expect.objectContaining({
        utm_source: 'google',
        utm_medium: null,
        utm_campaign: 'organic',
        utm_content: null,
        utm_term: null,
        location: 'hero',
      }));
    });

    it('should send UTMs with InitiateCheckout event', () => {
      const utms: UTMParams = {
        source: 'meta',
        medium: 'paid',
        campaign: 'black45-autoridade',
        content: 'video-autoridade',
        term: 'frio-sp-rj',
      };
      saveUTMsToCookie(utms);

      const event: TrackedEvent = {
        name: 'initiate_checkout',
        category: 'conversion',
        timestamp: Date.now(),
        params: {
          location: 'oferta-section',
          value: 397,
        },
      };

      const result = sendToMetaPixel(event);

      expect(result.sent).toBe(true);
      expect(mockFbq).toHaveBeenCalledWith('track', 'InitiateCheckout', expect.objectContaining({
        utm_source: 'meta',
        utm_medium: 'paid',
        utm_campaign: 'black45-autoridade',
        utm_content: 'video-autoridade',
        utm_term: 'frio-sp-rj',
        value: 397,
        currency: 'BRL',
        content_name: 'Black 45 Graus',
        content_category: 'programa',
      }));
    });

    it('should preserve UTMs across multiple Meta events', () => {
      const utms: UTMParams = {
        source: 'meta',
        medium: 'paid',
        campaign: 'black45',
        content: null,
        term: null,
      };
      saveUTMsToCookie(utms);

      // Event 1: WhatsApp click (hero)
      const event1: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: { location: 'hero' },
      };
      sendToMetaPixel(event1);

      // Event 2: WhatsApp click (footer)
      const event2: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: { location: 'footer' },
      };
      sendToMetaPixel(event2);

      // Both should have same UTMs
      const calls = mockFbq.mock.calls;

      // Verify all calls have UTMs
      calls.forEach((call) => {
        const params = call[2] as any;
        expect(params.utm_source).toBe('meta');
        expect(params.utm_medium).toBe('paid');
        expect(params.utm_campaign).toBe('black45');
      });
    });
  });

  describe('Cross-Platform UTM Consistency', () => {
    it('should send same UTMs to both GA4 and Meta Pixel', () => {
      const utms: UTMParams = {
        source: 'meta',
        medium: 'paid',
        campaign: 'black45-autoridade',
        content: 'video-autoridade',
        term: 'frio-sp-rj',
      };
      saveUTMsToCookie(utms);

      const event: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: {
          location: 'hero',
        },
      };

      // Send to both platforms
      sendToGA4(event);
      sendToMetaPixel(event);

      // GA4 should receive campaign_* naming
      expect(mockGtag).toHaveBeenCalledWith('event', 'whatsapp_click', expect.objectContaining({
        campaign_source: 'meta',
        campaign_medium: 'paid',
        campaign_name: 'black45-autoridade',
        campaign_content: 'video-autoridade',
        campaign_term: 'frio-sp-rj',
      }));

      // Meta should receive utm_* naming
      expect(mockFbq).toHaveBeenCalledWith('trackCustom', 'WhatsAppClick', expect.objectContaining({
        utm_source: 'meta',
        utm_medium: 'paid',
        utm_campaign: 'black45-autoridade',
        utm_content: 'video-autoridade',
        utm_term: 'frio-sp-rj',
      }));

      // Values should match (just different naming)
      const ga4Call = mockGtag.mock.calls[0][2] as any;
      const metaCall = mockFbq.mock.calls[0][2] as any;

      expect(ga4Call.campaign_source).toBe(metaCall.utm_source);
      expect(ga4Call.campaign_medium).toBe(metaCall.utm_medium);
      expect(ga4Call.campaign_name).toBe(metaCall.utm_campaign);
      expect(ga4Call.campaign_content).toBe(metaCall.utm_content);
      expect(ga4Call.campaign_term).toBe(metaCall.utm_term);
    });

    it('should handle null UTMs consistently across platforms', () => {
      // All UTMs are null
      clearUTMsCookie();

      const event: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: { location: 'hero' },
      };

      sendToGA4(event);
      sendToMetaPixel(event);

      // GA4 should not include campaign_* params
      const ga4Params = mockGtag.mock.calls[0][2] as any;
      expect(ga4Params.campaign_source).toBeUndefined();
      expect(ga4Params.campaign_medium).toBeUndefined();

      // Meta should not include utm_* params
      const metaParams = mockFbq.mock.calls[0][2] as any;
      expect(metaParams.utm_source).toBeUndefined();
      expect(metaParams.utm_medium).toBeUndefined();
    });
  });

  describe('Real-World Scenarios', () => {
    it('should attribute conversion to correct campaign after 7 days', () => {
      // Day 1: User clicks Meta ad (UTMs saved)
      const utms: UTMParams = {
        source: 'meta',
        medium: 'paid',
        campaign: 'black45-autoridade',
        content: 'video-autoridade',
        term: 'frio-sp-rj',
      };
      saveUTMsToCookie(utms);

      // Day 7: User converts (UTMs still in cookie)
      const conversionEvent: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: {
          location: 'oferta-section',
        },
      };

      sendToGA4(conversionEvent);
      sendToMetaPixel(conversionEvent);

      // Both platforms should attribute to original campaign
      expect(mockGtag).toHaveBeenCalledWith('event', 'whatsapp_click', expect.objectContaining({
        campaign_source: 'meta',
        campaign_name: 'black45-autoridade',
      }));

      expect(mockFbq).toHaveBeenCalledWith('trackCustom', 'WhatsAppClick', expect.objectContaining({
        utm_source: 'meta',
        utm_campaign: 'black45-autoridade',
      }));
    });

    it('should track complete funnel with UTMs: click → checkout', () => {
      const utms: UTMParams = {
        source: 'meta',
        medium: 'paid',
        campaign: 'black45',
        content: null,
        term: null,
      };
      saveUTMsToCookie(utms);

      // Step 1: CTA click
      const clickEvent: TrackedEvent = {
        name: 'whatsapp_click',
        category: 'conversion',
        timestamp: Date.now(),
        params: { location: 'hero' },
      };
      sendToGA4(clickEvent);
      sendToMetaPixel(clickEvent);

      // Step 2: Checkout initiated
      const checkoutEvent: TrackedEvent = {
        name: 'initiate_checkout',
        category: 'conversion',
        timestamp: Date.now(),
        params: { value: 397 },
      };
      sendToGA4(checkoutEvent);
      sendToMetaPixel(checkoutEvent);

      // All events should have consistent UTMs
      const ga4Calls = mockGtag.mock.calls;
      const metaCalls = mockFbq.mock.calls;

      // Verify all GA4 calls have campaign
      ga4Calls.forEach((call) => {
        const params = call[2] as any;
        expect(params.campaign_source).toBe('meta');
        expect(params.campaign_name).toBe('black45');
      });

      // Verify all Meta calls have UTM
      metaCalls.forEach((call) => {
        const params = call[2] as any;
        expect(params.utm_source).toBe('meta');
        expect(params.utm_campaign).toBe('black45');
      });
    });
  });

  describe('Availability Checks', () => {
    it('should check GA4 availability correctly', () => {
      expect(isGA4Available()).toBe(true);

      delete (window as any).gtag;
      expect(isGA4Available()).toBe(false);
    });

    it('should check Meta Pixel availability correctly', () => {
      expect(isMetaPixelAvailable()).toBe(true);

      delete (window as any).fbq;
      expect(isMetaPixelAvailable()).toBe(false);
    });
  });
});
