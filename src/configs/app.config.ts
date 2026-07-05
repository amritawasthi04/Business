/**
 * Standard Application Configuration settings.
 */
export const APP_CONFIG = {
  get name() {
    return process.env.APP_NAME || "BusinessScraper";
  },
  get version() {
    return process.env.APP_VERSION || "1.0.0";
  },
  get environment() {
    return process.env.NODE_ENV || "development";
  },
  nodeVersion: process.version,
  get isProduction() {
    return (process.env.NODE_ENV || "development") === "production";
  },
  get isDevelopment() {
    return (process.env.NODE_ENV || "development") === "development";
  },
  get isTest() {
    return (process.env.NODE_ENV || "development") === "test";
  },
};

