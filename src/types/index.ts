/**
 * Application environment mode.
 */
export type EnvironmentMode = "development" | "production" | "test";

/**
 * Standard utility signature for async handlers.
 */
export type AsyncHandler<T = any, R = any> = (arg: T) => Promise<R>;
