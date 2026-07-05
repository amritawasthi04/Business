/**
 * Configuration options for the Chromium browser launch instance.
 */
export interface IBrowserConfig {
  /** Run browser in headless mode */
  headless: boolean;
  
  /** Optional proxy server URI */
  proxyUrl?: string;
  
  /** Explicitly override Vercel execution context check */
  isVercel?: boolean;
  
  /** Milliseconds timeout during initialization */
  launchTimeout?: number;
}

/**
 * Configuration settings for isolated context profiles.
 */
export interface IBrowserContextConfig {
  /** Optional cookie payload keys to inject */
  cookies?: Array<{
    name: string;
    value: string;
    domain: string;
    path?: string;
    expires?: number;
    httpOnly?: boolean;
    secure?: boolean;
  }>;
  
  /** Browser language locale target (e.g. 'en-US') */
  locale?: string;
  
  /** Browser system timezone override (e.g. 'America/New_York') */
  timezone?: string;
  
  /** Screen viewport configuration options */
  viewport?: {
    width: number;
    height: number;
    deviceScaleFactor?: number;
    isMobile?: boolean;
    hasTouch?: boolean;
  };
}
