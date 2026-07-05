import { NextRequest, NextResponse } from "next/server";
import { launchBrowser } from "@/scraper/browser/browser";
import { loadPage } from "@/scraper/browser/pageLoader";
import { releasePageResources } from "@/scraper/browser/cleanup";
import { safeJsonParse } from "@/utils/helpers";
import { AppError, handleApiError } from "@/utils/error";
import { logger } from "@/utils/logger";
import { logRequest } from "@/middleware/requestLogger";

/**
 * POST /api/browser/test
 * Utility testing endpoint to verify that Chromium and Puppeteer load processes operate correctly.
 */
export async function POST(request: NextRequest) {
  let pageInstance;
  try {
    logRequest(request);

    const rawBody = await request.text();
    const body = safeJsonParse<Record<string, any>>(rawBody, {});
    const url = body.url;

    if (!url) {
      throw new AppError("Parameter 'url' is required to perform browser test.", 400, "BAD_REQUEST");
    }

    logger.info(`Starting browser engine lifecycle test for: ${url}`);
    
    // 1. Launch browser instance
    const browser = await launchBrowser({ headless: true });

    // 2. Open and load target page
    const loadResult = await loadPage(browser, {
      url,
      timeout: 30000,
      autoScroll: false, // Keep it simple for testing endpoint
      actionDelay: 500,
    });

    pageInstance = loadResult.page;
    const { result } = loadResult;

    // 3. Close the page instance to release memory
    await releasePageResources(pageInstance);
    pageInstance = undefined;

    // 4. Return exact flat JSON structure requested in Phase 2
    return NextResponse.json({
      success: true,
      title: result.title,
      url: result.url,
      loadTime: `${result.loadTime}ms`,
      status: result.status,
    });
  } catch (error) {
    if (pageInstance) {
      try {
        await releasePageResources(pageInstance);
      } catch (_) {}
    }
    return handleApiError(error);
  }
}
export const dynamic = "force-dynamic";
