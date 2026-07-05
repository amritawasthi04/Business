import { NextRequest, NextResponse } from "next/server";
import { launchBrowser, closeBrowser } from "@/scraper/browser/browser";
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
  let browserInstance;
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
    browserInstance = await launchBrowser({ headless: true });

    // 2. Open and load target page
    const loadResult = await loadPage(browserInstance, {
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
      message: "Browser engine working successfully.",
      data: {
        title: result.title,
        url: result.url,
        status: result.status,
        loadTimeMs: result.loadTime,
        pageReady: true,
        browser: {
          engine: "Chromium",
          headless: true,
        },
      },
    });
  } catch (error) {
    if (pageInstance) {
      try {
        await releasePageResources(pageInstance);
      } catch (_) {}
    }
    return handleApiError(error);
  } finally {
    // 5. Close browser to release resources
    try {
      await closeBrowser();
    } catch (_) {}
  }
}
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * GET /api/browser/test
 * Friendly endpoint helper response for browser visits.
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: "Method Not Allowed. Please send a POST request with a JSON body containing a 'url' parameter to perform browser engine tests.",
    },
    { status: 405 }
  );
}


