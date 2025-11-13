/**
 * @lumes/analytics - UTM Capture Tests
 *
 * Unit tests for UTM extraction and capture logic
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import {
  extractUTMsFromURL,
  captureAndSaveUTMs,
  getUTMs,
} from './utm-capture';
import {
  saveUTMsToCookie,
  getUTMsFromCookie,
  clearUTMsCookie,
  hasUTMsCookie,
} from './utm-storage';
import type { UTMParams, UTMConfig } from './types';

// Mock window.location using jsdom navigation
const mockLocation = (url: string) => {
  // @ts-ignore - jsdom specific
  delete window.location;
  // @ts-ignore
  window.location = new URL(url);
};

describe('UTM Capture', () => {
  beforeEach(() => {
    clearUTMsCookie();
    mockLocation('https://seyune.com.br/');
  });

  afterEach(() => {
    clearUTMsCookie();
  });

  describe('extractUTMsFromURL', () => {
    it('should extract all 5 UTM parameters from URL', () => {
      mockLocation(
        'https://seyune.com.br/consulta?utm_source=meta&utm_medium=cpc&utm_campaign=black45&utm_content=video&utm_term=frio'
      );

      const utms = extractUTMsFromURL();

      expect(utms).toEqual({
        source: 'meta',
        medium: 'cpc',
        campaign: 'black45',
        content: 'video',
        term: 'frio',
      });
    });

    it('should handle partial UTM parameters (some missing)', () => {
      mockLocation('https://seyune.com.br/?utm_source=google&utm_campaign=test');

      const utms = extractUTMsFromURL();

      expect(utms).toEqual({
        source: 'google',
        medium: null,
        campaign: 'test',
        content: null,
        term: null,
      });
    });

    it('should return all null if no UTM parameters in URL', () => {
      mockLocation('https://seyune.com.br/consulta');

      const utms = extractUTMsFromURL();

      expect(utms).toEqual({
        source: null,
        medium: null,
        campaign: null,
        content: null,
        term: null,
      });
    });

    it('should handle URL-encoded UTM values', () => {
      mockLocation(
        'https://seyune.com.br/?utm_source=email&utm_campaign=nutri%C3%A7%C3%A3o%20e%20sa%C3%BAde'
      );

      const utms = extractUTMsFromURL();

      expect(utms.source).toBe('email');
      expect(utms.campaign).toBe('nutrição e saúde');
    });

    it('should handle special characters in UTM values', () => {
      mockLocation(
        'https://seyune.com.br/?utm_source=meta&utm_content=button-cta-1&utm_term=black%2045'
      );

      const utms = extractUTMsFromURL();

      expect(utms.source).toBe('meta');
      expect(utms.content).toBe('button-cta-1');
      expect(utms.term).toBe('black 45');
    });

    it('should handle empty string UTM parameters', () => {
      mockLocation('https://seyune.com.br/?utm_source=&utm_campaign=test');

      const utms = extractUTMsFromURL();

      expect(utms.source).toBeNull();
      expect(utms.campaign).toBe('test');
    });

    it('should handle very long UTM values', () => {
      const longValue = 'a'.repeat(500);
      mockLocation(`https://seyune.com.br/?utm_campaign=${longValue}`);

      const utms = extractUTMsFromURL();

      expect(utms.campaign).toBe(longValue);
    });

    it('should handle multiple query parameters', () => {
      mockLocation(
        'https://seyune.com.br/?page=2&utm_source=meta&foo=bar&utm_campaign=test&baz=qux'
      );

      const utms = extractUTMsFromURL();

      expect(utms.source).toBe('meta');
      expect(utms.campaign).toBe('test');
    });

    it('should be case-sensitive for parameter names', () => {
      mockLocation('https://seyune.com.br/?UTM_SOURCE=meta&utm_source=google');

      const utms = extractUTMsFromURL();

      // Should only pick lowercase utm_source
      expect(utms.source).toBe('google');
    });
  });

  describe('captureAndSaveUTMs - First-Touch Attribution', () => {
    it('should save UTMs if no cookie exists (first-touch default)', () => {
      mockLocation('https://seyune.com.br/?utm_source=meta&utm_campaign=first');

      const result = captureAndSaveUTMs();

      expect(result).toBe(true);
      expect(hasUTMsCookie()).toBe(true);

      const saved = getUTMsFromCookie();
      expect(saved?.source).toBe('meta');
      expect(saved?.campaign).toBe('first');
    });

    it('should NOT overwrite existing cookie in first-touch mode', () => {
      // Save initial UTMs
      mockLocation('https://seyune.com.br/?utm_source=meta&utm_campaign=first');
      captureAndSaveUTMs();

      // Try to save new UTMs
      mockLocation('https://seyune.com.br/?utm_source=google&utm_campaign=second');
      const result = captureAndSaveUTMs({ firstTouch: true });

      expect(result).toBe(false); // Should return false (not saved)

      // Cookie should still have first UTMs
      const saved = getUTMsFromCookie();
      expect(saved?.source).toBe('meta');
      expect(saved?.campaign).toBe('first');
    });

    it('should preserve first-touch even with better UTMs later', () => {
      // First visit: partial UTMs
      mockLocation('https://seyune.com.br/?utm_source=email');
      captureAndSaveUTMs();

      // Second visit: complete UTMs
      mockLocation(
        'https://seyune.com.br/?utm_source=meta&utm_medium=cpc&utm_campaign=best&utm_content=video'
      );
      captureAndSaveUTMs({ firstTouch: true });

      // Should keep first (partial) UTMs
      const saved = getUTMsFromCookie();
      expect(saved?.source).toBe('email');
      expect(saved?.medium).toBeNull();
      expect(saved?.campaign).toBeNull();
    });
  });

  describe('captureAndSaveUTMs - Last-Touch Attribution', () => {
    it('should overwrite existing cookie in last-touch mode', () => {
      // Save initial UTMs
      mockLocation('https://seyune.com.br/?utm_source=meta&utm_campaign=first');
      captureAndSaveUTMs();

      // Save new UTMs with last-touch
      mockLocation('https://seyune.com.br/?utm_source=google&utm_campaign=second');
      const result = captureAndSaveUTMs({ firstTouch: false });

      expect(result).toBe(true); // Should return true (saved)

      // Cookie should have new UTMs
      const saved = getUTMsFromCookie();
      expect(saved?.source).toBe('google');
      expect(saved?.campaign).toBe('second');
    });

    it('should update UTMs on every visit in last-touch mode', () => {
      const config: UTMConfig = { firstTouch: false };

      // Visit 1
      mockLocation('https://seyune.com.br/?utm_source=meta&utm_campaign=v1');
      captureAndSaveUTMs(config);
      expect(getUTMsFromCookie()?.campaign).toBe('v1');

      // Visit 2
      mockLocation('https://seyune.com.br/?utm_source=google&utm_campaign=v2');
      captureAndSaveUTMs(config);
      expect(getUTMsFromCookie()?.campaign).toBe('v2');

      // Visit 3
      mockLocation('https://seyune.com.br/?utm_source=email&utm_campaign=v3');
      captureAndSaveUTMs(config);
      expect(getUTMsFromCookie()?.campaign).toBe('v3');
    });
  });

  describe('captureAndSaveUTMs - Edge Cases', () => {
    it('should not save if URL has no UTMs and no cookie exists', () => {
      mockLocation('https://seyune.com.br/consulta');

      const result = captureAndSaveUTMs();

      expect(result).toBe(false);
      expect(hasUTMsCookie()).toBe(false);
    });

    it('should not save if URL has empty UTMs', () => {
      mockLocation('https://seyune.com.br/?utm_source=&utm_campaign=');

      const result = captureAndSaveUTMs();

      expect(result).toBe(false);
      expect(hasUTMsCookie()).toBe(false);
    });

    it('should save partial UTMs (some parameters missing)', () => {
      mockLocation('https://seyune.com.br/?utm_source=meta');

      const result = captureAndSaveUTMs();

      expect(result).toBe(true);

      const saved = getUTMsFromCookie();
      expect(saved?.source).toBe('meta');
      expect(saved?.campaign).toBeNull();
    });

    it('should use custom cookie name from config', () => {
      mockLocation('https://seyune.com.br/?utm_source=meta&utm_campaign=test');

      const config: UTMConfig = {
        cookieName: 'custom_utms',
      };

      captureAndSaveUTMs(config);

      expect(hasUTMsCookie(config)).toBe(true);
      expect(hasUTMsCookie()).toBe(false); // Default cookie should not exist
    });
  });

  describe('getUTMs - Priority Chain', () => {
    it('should return UTMs from cookie if exists (priority 1)', () => {
      // Save UTMs to cookie
      const cookieUTMs: UTMParams = {
        source: 'meta',
        medium: 'cpc',
        campaign: 'from-cookie',
        content: null,
        term: null,
      };
      saveUTMsToCookie(cookieUTMs);

      // Set different UTMs in URL
      mockLocation('https://seyune.com.br/?utm_source=google&utm_campaign=from-url');

      const utms = getUTMs();

      // Should return cookie UTMs (higher priority)
      expect(utms?.source).toBe('meta');
      expect(utms?.campaign).toBe('from-cookie');
    });

    it('should fallback to URL UTMs if no cookie (priority 2)', () => {
      // No cookie
      clearUTMsCookie();

      // UTMs in URL
      mockLocation('https://seyune.com.br/?utm_source=google&utm_campaign=from-url');

      const utms = getUTMs();

      // Should return URL UTMs
      expect(utms?.source).toBe('google');
      expect(utms?.campaign).toBe('from-url');
    });

    it('should return null if no cookie and no URL UTMs (priority 3)', () => {
      clearUTMsCookie();
      mockLocation('https://seyune.com.br/consulta');

      const utms = getUTMs();

      expect(utms).toBeNull();
    });

    it('should prefer non-empty cookie over URL', () => {
      const cookieUTMs: UTMParams = {
        source: 'email',
        medium: 'newsletter',
        campaign: 'summer',
        content: 'button-1',
        term: 'promo',
      };
      saveUTMsToCookie(cookieUTMs);

      mockLocation(
        'https://seyune.com.br/?utm_source=meta&utm_medium=cpc&utm_campaign=black45'
      );

      const utms = getUTMs();

      expect(utms).toEqual(cookieUTMs);
    });

    it('should use custom cookie name in getUTMs', () => {
      const config: UTMConfig = {
        cookieName: 'my_utms',
      };

      const cookieUTMs: UTMParams = {
        source: 'custom',
        medium: null,
        campaign: null,
        content: null,
        term: null,
      };

      saveUTMsToCookie(cookieUTMs, config);

      const utms = getUTMs(config);

      expect(utms?.source).toBe('custom');
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete user journey: first visit → navigation → conversion', () => {
      // Step 1: User clicks ad with UTMs
      mockLocation(
        'https://seyune.com.br/consulta?utm_source=meta&utm_medium=cpc&utm_campaign=black45-autoridade&utm_content=video-autoridade&utm_term=frio-sp-rj'
      );

      // Step 2: UTMs are captured and saved
      const captured = captureAndSaveUTMs({ firstTouch: true });
      expect(captured).toBe(true);

      // Step 3: User navigates to different page (no UTMs in URL)
      mockLocation('https://seyune.com.br/sobre');

      // Step 4: UTMs should still be available from cookie
      const utms = getUTMs();
      expect(utms?.source).toBe('meta');
      expect(utms?.campaign).toBe('black45-autoridade');
      expect(utms?.term).toBe('frio-sp-rj');

      // Step 5: User converts (UTMs persist)
      expect(hasUTMsCookie()).toBe(true);
    });

    it('should handle user returning after 3 days (within 7-day window)', () => {
      // Day 1: First visit
      mockLocation('https://seyune.com.br/?utm_source=meta&utm_campaign=black45');
      captureAndSaveUTMs();

      // Day 4: User returns directly (no UTMs in URL)
      mockLocation('https://seyune.com.br/');

      // UTMs should still be in cookie
      const utms = getUTMs();
      expect(utms?.source).toBe('meta');
      expect(utms?.campaign).toBe('black45');
    });

    it('should not overwrite original campaign if user clicks different ad (first-touch)', () => {
      // Visit 1: Meta ad
      mockLocation('https://seyune.com.br/?utm_source=meta&utm_campaign=black45');
      captureAndSaveUTMs({ firstTouch: true });

      // Visit 2: Google ad (later)
      mockLocation('https://seyune.com.br/?utm_source=google&utm_campaign=organic');
      captureAndSaveUTMs({ firstTouch: true });

      // Should preserve first campaign (Meta)
      const utms = getUTMs();
      expect(utms?.source).toBe('meta');
      expect(utms?.campaign).toBe('black45');
    });
  });
});
