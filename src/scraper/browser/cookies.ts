import { Page } from "puppeteer-core";
import { IBrowserContextConfig } from "../interfaces/browser.interface";

/**
 * Injects cookies into the active page context.
 * @param page The active Page instance
 * @param cookies Cookies payload array
 */
export async function injectCookies(
  page: Page,
  cookies: NonNullable<IBrowserContextConfig["cookies"]>
): Promise<void> {
  if (cookies.length === 0) return;
  await page.setCookie(...cookies);
}

/**
 * Retrieves all cookies from the active page context.
 * @param page The active Page instance
 */
export async function getCookies(page: Page) {
  return page.cookies();
}

/**
 * Clears cookies from the active page context.
 * @param page The active Page instance
 */
export async function clearCookies(page: Page): Promise<void> {
  const currentCookies = await page.cookies();
  if (currentCookies.length > 0) {
    await page.deleteCookie(...currentCookies);
  }
}
