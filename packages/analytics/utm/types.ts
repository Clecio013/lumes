/**
 * @lumes/analytics - UTM Types
 */

export interface UTMParams {
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  content?: string | null;
  term?: string | null;
}

export interface UTMConfig {
  cookieName?: string;
  maxAge?: number;         // Seconds
  path?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
  firstTouch?: boolean;    // true = não sobrescrever, false = last-touch
}

export const DEFAULT_UTM_CONFIG: Required<UTMConfig> = {
  cookieName: 'seyune_utms',
  maxAge: 604800,         // 7 dias
  path: '/',
  sameSite: 'Lax',
  secure: true,           // HTTPS apenas (prod)
  firstTouch: true,       // First-touch attribution
};
