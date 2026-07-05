/**
 * System and routing constants for Phase 1.
 */
export const CONSTANTS = {
  /** API Path Prefixes */
  API_PREFIX: "/api",
  
  /** Scraper/Sync constraints */
  SYNC_LIMITS: {
    maxRetries: 3,
    concurrencyLimit: 2,
  },
  
  /** Content validation patterns */
  PATTERNS: {
    url: /^https?:\/\/[^\s$.?#].[^\s]*$/i,
    justdialUrl: /justdial\.com/i,
  },
};
