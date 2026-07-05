import { delay } from "./delay";
import { logger } from "@/utils/logger";

interface IRetryOptions {
  maxAttempts: number;
  initialDelayMs: number;
  backoffFactor: number;
}

/**
 * Wraps async task execution with retry and backoff options.
 * @param task Async task function
 * @param options Config options
 */
export async function withRetry<T>(
  task: () => Promise<T>,
  options: IRetryOptions = { maxAttempts: 3, initialDelayMs: 1500, backoffFactor: 2 }
): Promise<T> {
  let attempt = 1;
  let currentDelay = options.initialDelayMs;

  while (true) {
    try {
      return await task();
    } catch (error: any) {
      if (attempt >= options.maxAttempts) {
        logger.error(`Scraper operation failed after ${attempt} attempts.`, error);
        throw error;
      }

      logger.warn(
        `Scraper operation failed (attempt ${attempt}/${options.maxAttempts}). Retrying in ${currentDelay}ms.`,
        { error: error?.message || String(error) }
      );

      await delay(currentDelay);
      attempt++;
      currentDelay *= options.backoffFactor;
    }
  }
}
