import { Browser, Page } from "puppeteer-core";
import { IPageConfig } from "../interfaces/page.interface";
import { setupRequestInterception } from "./requestInterceptor";
import { getDesktopUserAgent } from "./userAgent";
import { getBrowserHeaders } from "./headers";
import { DEFAULT_VIEWPORT } from "./viewport";
import { logger } from "@/utils/logger";

/**
 * Creates and configures a new Page instance inside a Browser context.
 * @param browser Active Browser instance
 * @param config Optional configuration options
 */
export async function createPage(browser: Browser, config: IPageConfig = {}): Promise<Page> {
  const page = await browser.newPage();
  await configurePage(page, config);
  return page;
}

/**
 * Configures an existing Page instance (headers, user agent, viewport, blocklists).
 * @param page The Page instance to configure
 * @param config The page setup configurations
 */
export async function configurePage(page: Page, config: IPageConfig = {}): Promise<void> {
  // 1. Set Viewport
  const viewport = config.viewport || DEFAULT_VIEWPORT;
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
  });

  // 2. Set User Agent
  const ua = config.userAgent || getDesktopUserAgent();
  await page.setUserAgent(ua);

  // 3. Set Extra Headers
  const headers = getBrowserHeaders(undefined, config.customHeaders);
  await page.setExtraHTTPHeaders(headers);

  // 4. Setup request interceptions
  if (config.interceptor) {
    await setupRequestInterception(page, config.interceptor);
  }
}

/**
 * Safely closes an open Page instance.
 * @param page The Page instance to close
 */
export async function closePage(page: Page): Promise<void> {
  try {
    if (page && !page.isClosed()) {
      await page.close();
    }
  } catch (error) {
    logger.warn("Failed to close page gracefully", { error: String(error) });
  }
}

/**
 * Resets a page by navigating to about:blank or closing and recreating.
 * @param page The active Page instance
 */
export async function resetPage(page: Page): Promise<void> {
  if (page && !page.isClosed()) {
    // Clear cookies/caches by going to empty screen
    await page.goto("about:blank", { waitUntil: "domcontentloaded" });
  }
}
