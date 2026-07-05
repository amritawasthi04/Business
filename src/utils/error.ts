import { responseUtil } from "./response";
import { logger } from "./logger";
import { NextResponse } from "next/server";

/**
 * Base custom exception for operational application errors.
 */
export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details: Record<string, any>;

  /**
   * Constructor for AppError.
   * @param message Human readable message description
   * @param status HTTP status code
   * @param code Application specific error code
   * @param details Additional error metadata
   */
  constructor(
    message: string,
    status: number = 500,
    code: string = "INTERNAL_SERVER_ERROR",
    details: Record<string, any> = {}
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Maps standard throwables into unified NextResponse objects.
 * Logs error details.
 * @param error Raw error object
 */
export function handleApiError(error: any): NextResponse {
  if (error instanceof AppError) {
    logger.warn(`Operational Error [${error.code}]: ${error.message}`, {
      status: error.status,
      details: error.details,
    });
    return responseUtil.error(error.message, { code: error.code, ...error.details }, error.status);
  }

  logger.error("Unhandled Exception caught in API Handler", error);
  
  // Do not expose stack traces / internal exceptions in production
  const isProduction = process.env.NODE_ENV === "production";
  const message = isProduction ? "An unexpected server error occurred" : error?.message || String(error);
  const errorObj = isProduction ? {} : { stack: error?.stack };

  return responseUtil.error(message, errorObj, 500);
}
