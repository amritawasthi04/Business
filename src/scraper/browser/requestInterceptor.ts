import { Page, HTTPRequest } from "puppeteer-core";
import { IRequestInterceptorConfig } from "../interfaces/page.interface";

/**
 * Configure request interception to selectively block assets like images, styles, fonts, or scripts.
 * Reduces bandwidth usage and request run duration.
 * @param page Active Page instance
 * @param config Interceptor configuration flags
 */
export async function setupRequestInterception(
  page: Page,
  config: IRequestInterceptorConfig = {}
): Promise<void> {
  const {
    blockImages = false,
    blockFonts = false,
    blockAnalytics = false,
    blockTracking = false,
    blockMedia = false,
    blockStylesheets = false,
  } = config;

  const hasBlocks =
    blockImages || blockFonts || blockAnalytics || blockTracking || blockMedia || blockStylesheets;

  if (!hasBlocks) {
    return;
  }

  await page.setRequestInterception(true);

  page.on("request", (req: HTTPRequest) => {
    const resourceType = req.resourceType();
    const url = req.url().toLowerCase();

    // Block Images
    if (blockImages && resourceType === "image") {
      req.abort();
      return;
    }

    // Block Media (videos, audio clips)
    if (blockMedia && (resourceType === "media" || resourceType === "websocket")) {
      req.abort();
      return;
    }

    // Block Web Fonts
    if (blockFonts && resourceType === "font") {
      req.abort();
      return;
    }

    // Block CSS stylesheets
    if (blockStylesheets && resourceType === "stylesheet") {
      req.abort();
      return;
    }

    // Block Trackers and Analytics
    if (blockTracking || blockAnalytics) {
      const blocklist = [
        "google-analytics",
        "doubleclick",
        "facebook.net",
        "googleadservices",
        "hotjar",
        "mixpanel",
        "segment",
        "sentry",
        "telemetry",
      ];
      
      const isTracker = blocklist.some((domain) => url.includes(domain));
      if (isTracker) {
        req.abort();
        return;
      }
    }

    req.continue();
  });
}
export type { HTTPRequest };
