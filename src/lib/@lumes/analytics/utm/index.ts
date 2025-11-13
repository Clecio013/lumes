/**
 * @lumes/analytics - UTM Tracking
 */

// Components & Hooks
export { UTMTracker } from './utm-tracker';
export { useUTM } from './use-utm';

// Core functions
export {
  extractUTMsFromURL,
  hasUTMsInURL,
  captureAndSaveUTMs,
  getUTMs,
} from './utm-capture';

export {
  saveUTMsToCookie,
  getUTMsFromCookie,
  clearUTMsCookie,
  hasUTMsCookie,
} from './utm-storage';

// Types
export type { UTMParams, UTMConfig } from './types';
export { DEFAULT_UTM_CONFIG } from './types';
