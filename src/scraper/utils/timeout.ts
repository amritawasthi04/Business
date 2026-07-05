/**
 * Wraps a promise in a timeout, throwing a timeout error if it does not complete within the specified limit.
 * @param promise Promise task to execute
 * @param timeoutMs Timeout limit in milliseconds
 * @param errorMsg Optional custom error description
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMsg: string = "Operation timed out"
): Promise<T> {
  let timeoutId: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`${errorMsg} (timeout: ${timeoutMs}ms)`));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    clearTimeout(timeoutId!);
    throw error;
  }
}
