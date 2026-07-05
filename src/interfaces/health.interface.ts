/**
 * Interface representing the service health check status response.
 */
export interface IHealthStatus {
  status: "healthy" | "unhealthy" | "degraded";
  uptime: string;
  timestamp: string;
  environment: string;
  version: string;
}
