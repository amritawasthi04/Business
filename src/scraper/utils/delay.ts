/**
 * Pauses execution for a specified number of milliseconds.
 * @param ms Delay duration in milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Pauses execution for a random delay duration in a range.
 * Helps mock human-like navigation behavior.
 * @param minMs Minimum delay limit
 * @param maxMs Maximum delay limit
 */
export function randomDelay(minMs: number, maxMs: number): Promise<void> {
  const randomMs = Math.floor(Math.random() * (maxMs - minMs + 1) + minMs);
  return delay(randomMs);
}
