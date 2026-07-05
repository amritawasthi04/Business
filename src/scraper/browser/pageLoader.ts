import { Browser, Page } from "puppeteer-core";
import { IPageLoadConfig, IPageLoadResult, ILoadedPageWrapper } from "@/interfaces/loader.interface";
import { createPage, closePage } from "./page";
import { autoScroll } from "./autoScroll";
import { delay } from "../utils/delay";
import { validator } from "@/utils/validator";
import { logger } from "@/utils/logger";
import { AppError } from "@/utils/error";

/**
 * High level routine coordinating page load workflows:
 * Open URL -> Wait DOMContentLoaded -> Wait Network Idle -> Auto Scroll -> Optional Delay -> Return Page and metadata.
 * @param browser Active Browser instance
 * @param config Load setup configuration
 */
export async function loadPage(
  browser: Browser,
  config: IPageLoadConfig
): Promise<ILoadedPageWrapper> {
  const {
    url,
    timeout = 30000,
    waitUntil = "domcontentloaded",
    autoScroll: triggerScroll = true,
    scrollDistance = 250,
    scrollDelay = 500,
    maxScrolls = 20,
    actionDelay = 1000,
    extraDelay,
    pageConfig = {},
  } = config;

  logger.info(`Starting page loading sequence for: ${url}`);
  
  // 0. Validate URL
  if (!validator.isValidUrl(url)) {
    logger.error(`Invalid URL provided: ${url}`);
    throw new AppError(`Invalid URL provided: ${url}`, 400, "BAD_REQUEST");
  }

  const startTime = Date.now();
  
  // 1. Create page
  const page = await createPage(browser, pageConfig);
  let status = 200;

  try {
    // 2. Navigate and wait for configured load lifecycle event
    const response = await page.goto(url, {
      waitUntil,
      timeout,
    });

    if (response) {
      status = response.status();
    }

    // 3. Wait for Network Idle (soft-fail if it times out to prevent hangs on persistent websocket connections)
    try {
      await page.waitForNetworkIdle({ timeout: Math.min(5000, timeout) });
    } catch (_) {
      logger.debug("Network idle timeout reached, proceeding with loading sequence.");
    }

    // 4. Auto scroll if requested
    if (triggerScroll) {
      await autoScroll(page, scrollDistance, scrollDelay, maxScrolls);
    }

    // 5. Apply action delay / extra delay
    const finalDelay = extraDelay !== undefined ? extraDelay : actionDelay;
    if (finalDelay > 0) {
      await delay(finalDelay);
    }

    // 6. Gather page metadata
    const title = await page.title();
    const html = await page.content();
    const loadTime = Date.now() - startTime;

    logger.info(`Page loaded successfully in ${loadTime}ms`, { url, status, title });

    const result: IPageLoadResult = {
      url: page.url(),
      status,
      title,
      html,
      loadTime,
    };

    return {
      page,
      result,
    };
  } catch (error) {
    logger.error(`Failed loading page: ${url}`, error);
    // Ensure page is cleaned up if initialization sequence crashes
    await closePage(page);
    throw error;
  }
}

