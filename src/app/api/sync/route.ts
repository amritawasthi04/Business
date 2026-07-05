import { NextRequest } from "next/server";
import { SyncService } from "@/services/sync.service";
import { responseUtil } from "@/utils/response";
import { handleApiError } from "@/utils/error";
import { logRequest } from "@/middleware/requestLogger";
import { safeJsonParse } from "@/utils/helpers";
import { AppError } from "@/utils/error";

const syncService = new SyncService();

/**
 * POST /api/sync
 * Triggers a sync session candidate (Phase 1 mock implementation).
 */
export async function POST(request: NextRequest) {
  try {
    logRequest(request);
    
    const rawBody = await request.text();
    const body = safeJsonParse<Record<string, any>>(rawBody, {});
    const url = body.url;

    if (!url) {
      throw new AppError("Parameter 'url' is required to trigger synchronization.", 400, "BAD_REQUEST");
    }

    const forceUpdate = !!body.forceUpdate;
    const triggerResult = await syncService.triggerSync(url, forceUpdate);

    // Standard Success format with returned details
    return responseUtil.success(triggerResult, triggerResult.message);
  } catch (error) {
    return handleApiError(error);
  }
}
export const dynamic = "force-dynamic";
