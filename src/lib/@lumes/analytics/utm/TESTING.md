# UTM Tracking - Testing Guide

## Overview

Comprehensive test suite validating the 7-day UTM attribution system for Meta Ads campaigns.

**Purpose:** Ensure campaign attribution works correctly even when conversion happens days after initial ad click.

---

## Test Coverage

### 1. Storage Layer (`utm-storage.test.ts`)

**What it tests:** Cookie operations for persisting UTMs

**Coverage:**
- ✅ Saving UTMs to cookie with correct JSON format
- ✅ Retrieving and parsing UTMs from cookie
- ✅ Clearing cookies
- ✅ Checking cookie existence
- ✅ Custom cookie names (multi-tenant support)
- ✅ Special characters and unicode handling
- ✅ Malformed data graceful failure
- ✅ Cookie attributes (maxAge, path, sameSite, secure)
- ✅ Overwriting existing cookies

**Key scenarios:**
```typescript
// Save complete UTMs
const utms = {
  source: 'meta',
  medium: 'cpc',
  campaign: 'black45-autoridade',
  content: 'video-autoridade',
  term: 'frio-sp-rj',
};
saveUTMsToCookie(utms);

// Retrieve later
const saved = getUTMsFromCookie();
expect(saved).toEqual(utms);
```

---

### 2. Capture Layer (`utm-capture.test.ts`)

**What it tests:** Extracting UTMs from URL and attribution logic

**Coverage:**
- ✅ Extracting all 5 UTM parameters from URL
- ✅ Handling partial UTMs (some missing)
- ✅ URL-encoded values
- ✅ Empty string parameters
- ✅ Case sensitivity
- ✅ Multiple query parameters
- ✅ **First-touch attribution** (preserve original campaign)
- ✅ **Last-touch attribution** (always update)
- ✅ Priority chain: Cookie → URL → null
- ✅ Complete user journey integration tests

**First-touch attribution (default):**
```typescript
// Visit 1: Save UTMs
mockLocation('https://seyune.com.br/?utm_source=meta&utm_campaign=first');
captureAndSaveUTMs(); // Saved

// Visit 2: Different UTMs (should NOT overwrite)
mockLocation('https://seyune.com.br/?utm_source=google&utm_campaign=second');
captureAndSaveUTMs({ firstTouch: true }); // Not saved

// Cookie still has first UTMs
const saved = getUTMsFromCookie();
expect(saved.campaign).toBe('first'); // ✅ First-touch preserved
```

**Last-touch attribution:**
```typescript
const config = { firstTouch: false };

// Visit 1
captureAndSaveUTMs(config); // campaign=v1

// Visit 2 (overwrites)
captureAndSaveUTMs(config); // campaign=v2

// Visit 3 (overwrites again)
captureAndSaveUTMs(config); // campaign=v3
```

---

### 3. React Hooks (`use-utm.test.ts`)

**What it tests:** React hook that exposes UTMs to components

**Coverage:**
- ✅ Loading state transitions (isLoading: true → false)
- ✅ Returning UTMs from cookie
- ✅ Returning UTMs from URL (fallback)
- ✅ Priority: Cookie > URL
- ✅ hasUTMs flag logic (true if at least one non-null)
- ✅ Error handling (graceful null return)
- ✅ SSR safety (no window access on server)
- ✅ No unnecessary re-renders
- ✅ Complete user journeys

**Usage in components:**
```typescript
function CheckoutButton() {
  const { utms, hasUTMs, isLoading } = useUTM();

  if (isLoading) return <Spinner />;

  if (hasUTMs) {
    console.log('Campaign:', utms.campaign); // "black45-autoridade"
  }
}
```

---

### 4. React Component (`utm-tracker.test.tsx`)

**What it tests:** Auto-capture component for app layout

**Coverage:**
- ✅ Renders as null (invisible)
- ✅ Captures UTMs on mount
- ✅ First-touch attribution (default)
- ✅ Last-touch attribution (config)
- ✅ Custom cookie names
- ✅ Debug mode logging
- ✅ SSR safety
- ✅ Multiple mounts handling
- ✅ Complete user journeys (ad click → browse → convert)

**Setup in app:**
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <UTMTracker /> {/* Auto-captures UTMs */}
        {children}
      </body>
    </html>
  );
}
```

---

### 5. Analytics Integration (`analytics-utm-integration.test.ts`)

**What it tests:** UTMs correctly passed to Meta Pixel and GA4

**Coverage:**
- ✅ UTMs included in GA4 events (campaign_* naming)
- ✅ UTMs included in Meta Pixel events (utm_* naming)
- ✅ Graceful handling when no UTMs exist
- ✅ Partial UTMs (some null values)
- ✅ UTMs preserved across multiple events
- ✅ Cross-platform consistency (same UTMs to both)
- ✅ Naming convention differences (campaign_ vs utm_)
- ✅ Real-world funnels: view → click → checkout
- ✅ 7-day attribution scenario

**GA4 event with UTMs:**
```typescript
// User clicked Meta ad 5 days ago (UTMs in cookie)
saveUTMsToCookie({
  source: 'meta',
  campaign: 'black45-autoridade',
  // ...
});

// Today: User converts
trackEvent({ name: 'whatsapp_click', location: 'hero' });

// GA4 receives:
gtag('event', 'whatsapp_click', {
  campaign_source: 'meta',          // ← UTM from cookie
  campaign_name: 'black45-autoridade', // ← UTM from cookie
  location: 'hero',
});
```

**Meta Pixel event with UTMs:**
```typescript
// Same scenario
fbq('track', 'Lead', {
  utm_source: 'meta',               // ← UTM from cookie
  utm_campaign: 'black45-autoridade', // ← UTM from cookie
  location: 'hero',
});
```

---

## Running Tests

### Run all tests
```bash
pnpm test
```

### Run specific test file
```bash
pnpm test utm-storage.test.ts
pnpm test utm-capture.test.ts
pnpm test use-utm.test.ts
pnpm test utm-tracker.test.tsx
pnpm test analytics-utm-integration.test.ts
```

### Run with coverage
```bash
pnpm test --coverage
```

**Coverage thresholds (Jest config):**
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

### Watch mode (development)
```bash
pnpm test --watch
```

---

## Test Architecture

### Principles

1. **Unit tests first:** Storage and capture logic
2. **Integration tests second:** React hooks and components
3. **End-to-end scenarios:** Complete user journeys
4. **Real-world focused:** Tests mirror actual usage patterns

### Mocking Strategy

**Window.location:**
```typescript
const mockLocation = (url: string) => {
  delete (window as any).location;
  window.location = new URL(url) as any;
};

mockLocation('https://seyune.com.br/?utm_source=meta');
```

**Analytics adapters:**
```typescript
const mockGtag = jest.fn();
const mockFbq = jest.fn();

(window as any).gtag = mockGtag;
(window as any).fbq = mockFbq;

// Verify calls
expect(mockGtag).toHaveBeenCalledWith('event', 'whatsapp_click', {
  campaign_source: 'meta',
  // ...
});
```

**React Testing Library:**
```typescript
const { result } = renderHook(() => useUTM());

await waitFor(() => {
  expect(result.current.isLoading).toBe(false);
});

expect(result.current.utms?.campaign).toBe('black45');
```

---

## Coverage Reports

### View HTML report
```bash
pnpm test --coverage
open coverage/index.html
```

### Understanding reports

**Green (>80%):** Well-tested code
**Yellow (50-80%):** Needs more tests
**Red (<50%):** Critical gaps

### Focus areas

1. **Storage layer:** Cookie operations (100% coverage expected)
2. **Capture layer:** URL parsing and attribution (100% coverage expected)
3. **React layer:** Hooks and components (90%+ coverage expected)
4. **Integration:** Analytics adapters (90%+ coverage expected)

---

## Real-World Test Scenarios

### Scenario 1: 7-Day Attribution Window

**Goal:** Verify conversion attributed to original campaign after 7 days

```typescript
it('should attribute conversion to correct campaign after 7 days', () => {
  // Day 1: User clicks Meta ad
  mockLocation('https://seyune.com.br/?utm_source=meta&utm_campaign=black45-autoridade');
  captureAndSaveUTMs();

  // Day 7: User converts (no UTMs in URL)
  mockLocation('https://seyune.com.br/projeto45dias');
  const conversionEvent = {
    name: 'whatsapp_click',
    location: 'oferta-section',
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
```

### Scenario 2: User Clicks Multiple Ads (First-Touch)

**Goal:** Preserve first campaign attribution

```typescript
it('should not overwrite original campaign if user clicks different ad', () => {
  // Visit 1: Meta ad
  mockLocation('https://seyune.com.br/?utm_source=meta&utm_campaign=black45-autoridade');
  captureAndSaveUTMs({ firstTouch: true });

  // Visit 2: Google ad (later)
  mockLocation('https://seyune.com.br/?utm_source=google&utm_campaign=organic');
  captureAndSaveUTMs({ firstTouch: true });

  // Should preserve first campaign (Meta)
  const utms = getUTMs();
  expect(utms?.source).toBe('meta');
  expect(utms?.campaign).toBe('black45-autoridade');
});
```

### Scenario 3: Complete Funnel

**Goal:** Track entire conversion funnel with consistent UTMs

```typescript
it('should track complete funnel with UTMs: view → click → checkout', () => {
  const utms = {
    source: 'meta',
    medium: 'paid',
    campaign: 'black45',
  };
  saveUTMsToCookie(utms);

  // Step 1: Page view
  trackEvent({ name: 'page_view' });

  // Step 2: CTA click
  trackEvent({ name: 'whatsapp_click', location: 'hero' });

  // Step 3: Checkout
  trackEvent({ name: 'initiate_checkout', value: 397 });

  // All events should have same UTMs
  const ga4Calls = mockGtag.mock.calls;
  ga4Calls.forEach((call) => {
    const params = call[2];
    expect(params.campaign_source).toBe('meta');
    expect(params.campaign_name).toBe('black45');
  });
});
```

---

## Adding New Tests

### 1. Unit test for new function

```typescript
// utm-storage.ts
export function hasExpiredUTMsCookie(): boolean {
  // implementation
}

// utm-storage.test.ts
describe('hasExpiredUTMsCookie', () => {
  it('should return false if cookie is fresh', () => {
    saveUTMsToCookie({ source: 'meta' });
    expect(hasExpiredUTMsCookie()).toBe(false);
  });

  it('should return true if cookie expired', () => {
    // Mock date 8 days in future
    jest.useFakeTimers();
    saveUTMsToCookie({ source: 'meta' });
    jest.advanceTimersByTime(8 * 24 * 60 * 60 * 1000); // 8 days
    expect(hasExpiredUTMsCookie()).toBe(true);
    jest.useRealTimers();
  });
});
```

### 2. Integration test for new feature

```typescript
// New feature: UTM rotation after 7 days (last-touch after expiry)
it('should allow new UTMs after 7-day expiry', () => {
  jest.useFakeTimers();

  // Day 1: Save initial UTMs
  saveUTMsToCookie({ source: 'meta', campaign: 'first' }, { firstTouch: true });

  // Day 8: Cookie expired, new UTMs should be saved
  jest.advanceTimersByTime(8 * 24 * 60 * 60 * 1000);
  mockLocation('https://seyune.com.br/?utm_source=google&utm_campaign=second');
  captureAndSaveUTMs({ firstTouch: true });

  const saved = getUTMsFromCookie();
  expect(saved?.campaign).toBe('second'); // New UTMs saved

  jest.useRealTimers();
});
```

---

## Troubleshooting Tests

### Test fails: "window is not defined"

**Cause:** Trying to access window in SSR context

**Fix:** Add client-side check
```typescript
if (typeof window === 'undefined') return;
```

### Test fails: "Cookie not found"

**Cause:** Cookie not persisted between test steps

**Fix:** Ensure beforeEach/afterEach cleanup
```typescript
beforeEach(() => {
  clearUTMsCookie();
});

afterEach(() => {
  clearUTMsCookie();
});
```

### Test fails: "Mock not called"

**Cause:** Event not configured or platform not available

**Fix:**
1. Verify event exists in `config/events.ts`
2. Mock `window.gtag` or `window.fbq`
3. Check `isAvailable()` returns true

### Test fails: "Timeout waiting for"

**Cause:** Async state update not completing

**Fix:** Use `waitFor` from Testing Library
```typescript
await waitFor(() => {
  expect(result.current.isLoading).toBe(false);
});
```

---

## Best Practices

### ✅ DO

- **Test real scenarios:** Mirror actual user behavior
- **Test edge cases:** Null values, empty strings, special chars
- **Test error paths:** Malformed data, missing config
- **Use descriptive names:** `should attribute conversion after 7 days`
- **Mock external dependencies:** window.location, gtag, fbq
- **Clean up after tests:** Clear cookies, restore mocks

### ❌ DON'T

- **Don't test implementation details:** Focus on behavior
- **Don't skip cleanup:** Causes flaky tests
- **Don't ignore coverage gaps:** <80% = red flag
- **Don't test third-party libs:** Trust gtag() and fbq() work
- **Don't use real URLs:** Mock window.location instead

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: pnpm install
      - run: pnpm test --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### Pre-commit hook

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "pnpm test --coverage --passWithNoTests"
    }
  }
}
```

---

## Monitoring Production

### Meta Events Manager

1. Go to Meta Events Manager
2. Select your Pixel
3. View "Test Events" tab
4. Verify UTM parameters in Purchase events:

```json
{
  "event_name": "Purchase",
  "custom_data": {
    "utm_source": "meta",
    "utm_campaign": "black45-autoridade",
    // ...
  }
}
```

### Google Analytics 4

1. Go to GA4 Reports → Acquisition → Traffic Acquisition
2. Add secondary dimension: "Campaign"
3. Verify conversions attributed to correct campaigns

---

## Debugging Production Issues

### Issue: Conversions not attributed to campaign

**Checklist:**
1. ✅ Cookie exists? (Check DevTools → Application → Cookies)
2. ✅ Cookie has valid JSON? (Paste value into JSON validator)
3. ✅ Cookie not expired? (Check Max-Age attribute)
4. ✅ UTMs in events? (Check Network tab for gtag/fbq calls)

**Debug code:**
```typescript
// Add to layout.tsx temporarily
useEffect(() => {
  const utms = getUTMs();
  console.log('🔍 UTMs:', utms);
}, []);
```

### Issue: Different campaigns in GA4 vs Meta

**Cause:** UTM overwritten between events (last-touch instead of first-touch)

**Fix:** Verify config
```typescript
<UTMTracker config={{ firstTouch: true }} />
```

---

## Next Steps

1. **Run tests:** `pnpm test --coverage`
2. **Review coverage:** Open `coverage/index.html`
3. **Add missing tests:** Focus on <80% coverage areas
4. **Monitor production:** Check Meta Events Manager + GA4
5. **Iterate:** Add tests for new features

---

**Last updated:** 2025-11-13
**Version:** 1.0
