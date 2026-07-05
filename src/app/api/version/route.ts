import { NextRequest } from "next/server";
import { APP_CONFIG } from "@/configs/app.config";
import { responseUtil } from "@/utils/response";
import { handleApiError } from "@/utils/error";
import { logRequest } from "@/middleware/requestLogger";

/**
 * GET /api/version
 * Returns standard application and runtime versions.
 */
export async function GET(request: NextRequest) {
  try {
    logRequest(request);
    const versionInfo = {
      name: APP_CONFIG.name,
      version: APP_CONFIG.version,
      node: APP_CONFIG.nodeVersion,
      runtime: "Next.js",
    };
    return responseUtil.success(versionInfo, "Version info retrieved successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
export const dynamic = "force-dynamic";
