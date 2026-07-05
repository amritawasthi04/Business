import { Page } from "puppeteer-core";
import path from "path";
import os from "os";
import { logger } from "@/utils/logger";

/**
 * Captures screenshot of the active page viewport and saves it to standard system temp folder.
 * Mainly utilized for debugging selector mismatches or scraping crashes.
 * @param page Active Page instance
 * @param filename Custom output filename (default based on timestamp)
 */
export async function captureScreenshot(page: Page, filename?: string): Promise<string> {
  const name = filename || `screenshot_${Date.now()}.png`;
  const tempDir = os.tmpdir();
  const outputPath = path.join(tempDir, name);

  logger.info(`Capturing debug screenshot for page: ${page.url()}`);

  try {
    await page.screenshot({
      path: outputPath,
      type: "png",
      fullPage: false,
    });
    logger.info(`Screenshot successfully captured and stored at: ${outputPath}`);
    return outputPath;
  } catch (error) {
    logger.error("Failed to capture screenshot", error);
    throw error;
  }
}
