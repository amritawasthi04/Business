/**
 * Standard format for successful API responses.
 */
export interface ISuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
}

/**
 * Standard format for failed API responses.
 */
export interface IErrorResponse {
  success: false;
  message: string;
  error: Record<string, any>;
}
