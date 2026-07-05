/**
 * Configuration options for the Puppeteer and Chromium execution context.
 */
export const PUPPETEER_CONFIG = {
  headless: true,
  launchTimeout: 30000,
  defaultViewport: {
    width: 1920,
    height: 1080,
  },
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-web-security",
    "--disable-features=IsolateOrigins,site-per-process",
  ],
};
