import { NextRequest } from "next/server";
import { HealthService } from "@/services/health.service";
import { responseUtil } from "@/utils/response";
import { handleApiError } from "@/utils/error";
import { logRequest } from "@/middleware/requestLogger";

const healthService = new HealthService();

/**
 * GET /api/health
 * Standard health check endpoint returning system operational metadata.
 */
export async function GET(request: NextRequest) {
  try {
    logRequest(request);
    const healthStatus = await healthService.checkHealth();
    return responseUtil.success(healthStatus, "Health check completed successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
export const dynamic = "force-dynamic";
