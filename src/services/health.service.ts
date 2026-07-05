import { IHealthStatus } from "@/interfaces/health.interface";
import { APP_CONFIG } from "@/configs/app.config";
import { formatUptime } from "@/utils/helpers";

/**
 * Service to manage and compute system health status metrics.
 */
export class HealthService {
  /**
   * Evaluates application components and compiles an overall system health profile.
   */
  async checkHealth(): Promise<IHealthStatus> {
    const uptimeSeconds = process.uptime();
    const uptimeFormatted = formatUptime(uptimeSeconds);

    // TODO: Under Phase 2+, verify active connection capability with Firestore and Storage
    return {
      status: "healthy",
      uptime: uptimeFormatted,
      timestamp: new Date().toISOString(),
      environment: APP_CONFIG.environment,
      version: APP_CONFIG.version,
    };
  }
}
