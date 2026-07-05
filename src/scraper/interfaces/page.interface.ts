/**
 * Configuration options for request filtering and interception.
 */
export interface IRequestInterceptorConfig {
  blockImages?: boolean;
  blockFonts?: boolean;
  blockAnalytics?: boolean;
  blockTracking?: boolean;
  blockMedia?: boolean;
  blockStylesheets?: boolean;
}

/**
 * Detailed configuration setup parameters for page instances.
 */
export interface IPageConfig {
  /** Interceptor parameters to filter non-essential resource types */
  interceptor?: IRequestInterceptorConfig;
  
  /** Custom request headers to set on every outbound frame */
  customHeaders?: Record<string, string>;
  
  /** User Agent string override */
  userAgent?: string;
  
  /** Screen viewport override configuration */
  viewport?: {
    width: number;
    height: number;
  };
}
