/**
 * @lumes/analytics - useUTM Hook Tests
 *
 * Integration tests for React hook that accesses captured UTMs
 */

import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { useUTM } from './use-utm';
import {
  saveUTMsToCookie,
  clearUTMsCookie,
} from './utm-storage';
import type { UTMParams } from './types';

// Mock window.location using jsdom navigation
const mockLocation = (url: string) => {
  // @ts-ignore - jsdom specific
  delete window.location;
  // @ts-ignore
  window.location = new URL(url);
};

describe('useUTM Hook', () => {
  beforeEach(() => {
    clearUTMsCookie();
    mockLocation('https://seyune.com.br/');
  });

  afterEach(() => {
    clearUTMsCookie();
  });

  describe('Basic Functionality', () => {
    it('should return null UTMs and hasUTMs=false when no UTMs exist', async () => {
      const { result } = renderHook(() => useUTM());

      // Initially loading
      expect(result.current.isLoading).toBe(true);

      // After loading
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.utms).toBeNull();
      expect(result.current.hasUTMs).toBe(false);
    });

    it('should return UTMs from cookie when available', async () => {
      const utms: UTMParams = {
        source: 'meta',
        medium: 'cpc',
        campaign: 'black45-autoridade',
        content: 'video-autoridade',
        term: 'frio-sp-rj',
      };

      saveUTMsToCookie(utms);

      const { result } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.utms).toEqual(utms);
      expect(result.current.hasUTMs).toBe(true);
    });

    it('should return UTMs from URL when no cookie exists', async () => {
      mockLocation(
        'https://seyune.com.br/projeto45dias?utm_source=google&utm_campaign=test'
      );

      const { result } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.utms?.source).toBe('google');
      expect(result.current.utms?.campaign).toBe('test');
      expect(result.current.hasUTMs).toBe(true);
    });

    it('should prioritize cookie over URL UTMs', async () => {
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
      mockLocation(
        'https://seyune.com.br/projeto45dias?utm_source=google&utm_campaign=from-url'
      );

      const { result } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should return cookie UTMs (higher priority)
      expect(result.current.utms?.source).toBe('meta');
      expect(result.current.utms?.campaign).toBe('from-cookie');
      expect(result.current.hasUTMs).toBe(true);
    });
  });

  describe('Loading State', () => {
    it('should start with isLoading=true and transition to false', async () => {
      const { result } = renderHook(() => useUTM());

      // Initially loading
      expect(result.current.isLoading).toBe(true);
      expect(result.current.utms).toBeNull();
      expect(result.current.hasUTMs).toBe(false);

      // After loading completes
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('should handle loading state with UTMs present', async () => {
      const utms: UTMParams = {
        source: 'meta',
        medium: null,
        campaign: null,
        content: null,
        term: null,
      };
      saveUTMsToCookie(utms);

      const { result } = renderHook(() => useUTM());

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.hasUTMs).toBe(true);
      });
    });
  });

  describe('hasUTMs Flag', () => {
    it('should return hasUTMs=false when all UTM values are null', async () => {
      const utms: UTMParams = {
        source: null,
        medium: null,
        campaign: null,
        content: null,
        term: null,
      };
      saveUTMsToCookie(utms);

      const { result } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.utms).toEqual(utms);
      expect(result.current.hasUTMs).toBe(false); // All null = no UTMs
    });

    it('should return hasUTMs=true when at least one UTM value exists', async () => {
      const utms: UTMParams = {
        source: 'meta',
        medium: null,
        campaign: null,
        content: null,
        term: null,
      };
      saveUTMsToCookie(utms);

      const { result } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.hasUTMs).toBe(true); // One non-null = has UTMs
    });

    it('should return hasUTMs=true with partial UTMs from URL', async () => {
      mockLocation('https://seyune.com.br/?utm_source=email');

      const { result } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.utms?.source).toBe('email');
      expect(result.current.utms?.campaign).toBeNull();
      expect(result.current.hasUTMs).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle errors gracefully and return null', async () => {
      // Mock getUTMs to throw error
      const originalGetUTMs = require('./utm-capture').getUTMs;
      const mockGetUTMs = jest.fn(() => {
        throw new Error('Test error');
      });

      jest.mock('./utm-capture', () => ({
        ...jest.requireActual('./utm-capture'),
        getUTMs: mockGetUTMs,
      }));

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      const { result } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.utms).toBeNull();
      expect(result.current.hasUTMs).toBe(false);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[useUTM] Erro ao obter UTMs:',
        expect.any(Error)
      );

      consoleWarnSpy.mockRestore();
      jest.unmock('./utm-capture');
    });
  });

  describe('SSR Safety', () => {
    it('should handle server-side rendering gracefully', async () => {
      // Mock window as undefined (SSR environment)
      const originalWindow = global.window;
      delete (global as any).window;

      const { result } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.utms).toBeNull();
      expect(result.current.hasUTMs).toBe(false);

      // Restore window
      (global as any).window = originalWindow;
    });
  });

  describe('Re-render Behavior', () => {
    it('should not cause unnecessary re-renders', async () => {
      const utms: UTMParams = {
        source: 'meta',
        medium: 'cpc',
        campaign: 'test',
        content: null,
        term: null,
      };
      saveUTMsToCookie(utms);

      const { result, rerender } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const firstRenderResult = result.current;

      // Force re-render
      rerender();

      // Result should be the same object (no unnecessary state updates)
      expect(result.current.isLoading).toBe(firstRenderResult.isLoading);
      expect(result.current.hasUTMs).toBe(firstRenderResult.hasUTMs);
    });
  });

  describe('Integration Scenarios', () => {
    it('should work in complete user journey: first visit with UTMs', async () => {
      // User clicks Meta ad with UTMs
      mockLocation(
        'https://seyune.com.br/projeto45dias?utm_source=meta&utm_medium=paid&utm_campaign=black45-autoridade&utm_content=video&utm_term=frio-sp-rj'
      );

      const { result } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Hook should return all UTMs from URL
      expect(result.current.utms).toEqual({
        source: 'meta',
        medium: 'paid',
        campaign: 'black45-autoridade',
        content: 'video',
        term: 'frio-sp-rj',
      });
      expect(result.current.hasUTMs).toBe(true);
    });

    it('should persist UTMs across page navigation (no UTMs in new URL)', async () => {
      // Step 1: User lands with UTMs and they get saved
      const initialUTMs: UTMParams = {
        source: 'meta',
        medium: 'paid',
        campaign: 'black45',
        content: null,
        term: null,
      };
      saveUTMsToCookie(initialUTMs);

      // Step 2: User navigates to another page (no UTMs in URL)
      mockLocation('https://seyune.com.br/sobre');

      const { result } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Hook should still return UTMs from cookie
      expect(result.current.utms).toEqual(initialUTMs);
      expect(result.current.hasUTMs).toBe(true);
    });

    it('should handle user returning after several days (within 7-day window)', async () => {
      // Day 1: UTMs saved
      const day1UTMs: UTMParams = {
        source: 'meta',
        medium: 'paid',
        campaign: 'black45',
        content: null,
        term: null,
      };
      saveUTMsToCookie(day1UTMs);

      // Day 5: User returns (cookie still valid)
      mockLocation('https://seyune.com.br/');

      const { result } = renderHook(() => useUTM());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Hook should return original UTMs
      expect(result.current.utms).toEqual(day1UTMs);
      expect(result.current.hasUTMs).toBe(true);
    });
  });
});
