import { NextResponse } from "next/server";

/**
 * Standard API Response payload interfaces.
 */
export interface IApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface IApiErrorResponse {
  success: false;
  message: string;
  error: Record<string, any>;
}

/**
 * Standardized API response helpers returning NextResponse objects.
 */
export const responseUtil = {
  /**
   * Generates a successful JSON response.
   * @param data Payload data
   * @param message Descriptive message
   * @param status HTTP status code (default 200)
   */
  success<T>(data: T, message: string = "Request completed successfully", status: number = 200): NextResponse<IApiSuccessResponse<T>> {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status }
    );
  },

  /**
   * Generates an error JSON response.
   * @param message Error description message
   * @param error Raw error payload details
   * @param status HTTP status code (default 500)
   */
  error(message: string = "An internal server error occurred", error: Record<string, any> = {}, status: number = 500): NextResponse<IApiErrorResponse> {
    return NextResponse.json(
      {
        success: false,
        message,
        error: error || {},
      },
      { status }
    );
  },
};
export type { responseUtil as ResponseUtil };
