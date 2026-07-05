import { CONSTANTS } from "@/configs/constants";

/**
 * Basic data shape validators.
 */
export const validator = {
  /**
   * Checks if string is a valid URL.
   */
  isValidUrl(url: string): boolean {
    if (!url) return false;
    return CONSTANTS.PATTERNS.url.test(url);
  },

  /**
   * Checks if string is a valid Justdial listing URL.
   */
  isValidJustdialUrl(url: string): boolean {
    if (!this.isValidUrl(url)) return false;
    return CONSTANTS.PATTERNS.justdialUrl.test(url);
  },

  /**
   * Verifies if email matches simple address pattern.
   */
  isValidEmail(email: string): boolean {
    if (!email) return false;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  },
};
export type { validator as Validator };
