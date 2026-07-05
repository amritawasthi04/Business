import { ENV } from "./env";

/**
 * Standard Application Configuration settings.
 */
export const APP_CONFIG = {
  name: ENV.APP_NAME,
  version: ENV.APP_VERSION,
  environment: ENV.NODE_ENV,
  nodeVersion: process.version,
  isProduction: ENV.NODE_ENV === "production",
  isDevelopment: ENV.NODE_ENV === "development",
  isTest: ENV.NODE_ENV === "test",
};
