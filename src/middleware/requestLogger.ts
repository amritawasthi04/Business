import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logger } from "@/utils/logger";

/**
 * Middleware helper function to log details of incoming API requests.
 * @param request NextRequest instance
 */
export function logRequest(request: NextRequest): void {
  const { method, url } = request;
  const path = new URL(url).pathname;

  logger.info(`Incoming Request: ${method} ${path}`, {
    method,
    path,
    url,
    userAgent: request.headers.get("user-agent") || undefined,
    ip: request.headers.get("x-forwarded-for") || undefined,
  });
}

/**
 * Standard Next.js middleware execution wrapper.
 * Can be imported and called inside Next.js global middleware.ts.
 */
export function requestLoggerMiddleware(request: NextRequest): NextResponse {
  logRequest(request);
  return NextResponse.next();
}
export type { NextRequest };
