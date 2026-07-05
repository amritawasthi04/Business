import { Page } from "puppeteer-core";
import { logger } from "@/utils/logger";

/**
 * Automates smooth scrolling on the target page.
 * Loads lazy-loaded content, images, and maps.
 * Stops when the page bottom is reached or when iterations match the limit.
 * @param page The active Page instance
 * @param distance Distance in pixels to scroll per step
 * @param delayMs Interval delay in milliseconds between steps
 * @param maxScrolls Max scroll attempts limit
 */
export async function autoScroll(
  page: Page,
  distance: number = 200,
  delayMs: number = 500,
  maxScrolls: number = 40
): Promise<void> {
  logger.info(`Initiating autoScroll on path: ${page.url()}`);

  try {
    await page.evaluate(
      async (scrollDistance, intervalMs, scrollsLimit) => {
        await new Promise<void>((resolve) => {
          let totalHeight = 0;
          let iterations = 0;
          
          const timer = setInterval(() => {
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            window.scrollBy(0, scrollDistance);
            totalHeight += scrollDistance;
            iterations++;

            // Stop scrolling if bottom reached or limit hit
            const atBottom = window.innerHeight + window.scrollY >= scrollHeight;
            if (atBottom || iterations >= scrollsLimit) {
              clearInterval(timer);
              resolve();
            }
          }, intervalMs);
        });
      },
      distance,
      delayMs,
      maxScrolls
    );
    logger.info("AutoScroll sequence completed successfully");
  } catch (error) {
    logger.warn("AutoScroll encountered a minor error", { error: String(error) });
  }
}
