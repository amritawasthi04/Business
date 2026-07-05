/**
 * Default browser header set to mimic realistic requests.
 */
export const DEFAULT_HEADERS: Record<string, string> = {
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "max-age=0",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
};

/**
 * Returns customized request header block.
 * @param referer Optional referer header
 * @param customHeaders Additional custom overrides
 */
export function getBrowserHeaders(
  referer: string = "https://www.google.com/",
  customHeaders?: Record<string, string>
): Record<string, string> {
  return {
    ...DEFAULT_HEADERS,
    "Referer": referer,
    ...customHeaders,
  };
}
