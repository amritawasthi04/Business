import puppeteer, { Browser } from "puppeteer-core";
import { IBrowserConfig } from "../interfaces/browser.interface";
import { getChromiumLaunchOptions } from "./chromium";
import { logger } from "@/utils/logger";

let activeBrowser: Browser | null = null;

/**
 * Launches a new Chromium Browser instance using environment-based launch parameters.
 * Reuses the active singleton instance if already launched and connected.
 * @param config Configuration options
 */
export async function launchBrowser(config: IBrowserConfig = { headless: true }): Promise<Browser> {
  // Check if active instance exists and is still connected
  if (activeBrowser && activeBrowser.connected) {
    logger.info("Reusing existing connected Browser instance");
    return activeBrowser;
  }

  logger.info("Initializing launch of a new browser engine instance");
  const launchOptions = await getChromiumLaunchOptions(config.headless);

  try {
    activeBrowser = await puppeteer.launch({
      executablePath: launchOptions.executablePath,
      args: launchOptions.args,
      defaultViewport: launchOptions.defaultViewport,
      headless: launchOptions.headless,
      timeout: config.launchTimeout || 30000,
    });
    
    logger.info("Browser engine successfully launched");
    return activeBrowser;
  } catch (error) {
    logger.error("Browser launch failed critical execution", error);
    throw error;
  }
}

/**
 * Returns the currently active browser instance or null if not initialized.
 */
export function getActiveBrowser(): Browser | null {
  return activeBrowser;
}

/**
 * Cleans the active reference.
 */
export function clearActiveBrowserReference(): void {
  activeBrowser = null;
}
