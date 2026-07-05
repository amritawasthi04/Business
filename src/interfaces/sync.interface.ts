/**
 * Parameters for the sync request body.
 */
export interface ISyncRequestParams {
  url: string;
  forceUpdate?: boolean;
}

/**
 * Result returned by the sync service trigger action.
 */
export interface ISyncTriggerResponse {
  success: boolean;
  message: string;
  phase: number;
}
