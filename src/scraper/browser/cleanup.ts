import { Browser, Page } from "puppeteer-core";
import { logger } from "@/utils/logger";

/**
 * Releases memory handles and closes active Puppeteer pages.
 * @param page Active Page instance
 */
export async function releasePageResources(page: Page): Promise<void> {
  try {
    if (page && !page.isClosed()) {
      // Remove all event listeners to prevent memory leaks
      page.removeAllListeners("request");
      page.removeAllListeners("response");
      page.removeAllListeners("console");
      page.removeAllListeners("pageerror");
      
      await page.close();
      logger.info("Released resources for Puppeteer Page instance");
    }
  } catch (error) {
    logger.warn("Minor exception occurred during page resource release", { error: String(error) });
  }
}

/**
 * Gracefully shuts down browser instance and terminates Chromium.
 * @param browser Active Browser instance
 */
export async function closeBrowser(browser: Browser): Promise<void> {
  try {
    if (browser) {
      const pages = await browser.pages();
      // Safely close all pages first
      await Promise.all(pages.map((p) => releasePageResources(p)));
      await browser.close();
      logger.info("Browser engine successfully closed and terminated");
    }
  } catch (error) {
    logger.error("Error occurred while closing browser engine instance", error);
  }
}
