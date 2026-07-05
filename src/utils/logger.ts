/**
 * Standard log levels.
 */
export type LogLevel = "info" | "warn" | "error" | "debug";

/**
 * Reusable structured console logger utility.
 */
export const logger = {
  info(message: string, context?: Record<string, any>): void {
    console.log(JSON.stringify({ timestamp: new Date().toISOString(), level: "info", message, ...context }));
  },

  warn(message: string, context?: Record<string, any>): void {
    console.warn(JSON.stringify({ timestamp: new Date().toISOString(), level: "warn", message, ...context }));
  },

  error(message: string, error?: any, context?: Record<string, any>): void {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: "error",
        message,
        error: error?.message || String(error),
        stack: error?.stack,
        ...context,
      })
    );
  },

  debug(message: string, context?: Record<string, any>): void {
    if (process.env.NODE_ENV !== "production") {
      console.debug(JSON.stringify({ timestamp: new Date().toISOString(), level: "debug", message, ...context }));
    }
  },
};
export type { logger as Logger };
