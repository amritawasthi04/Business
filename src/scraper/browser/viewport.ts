/**
 * Reusable default desktop viewport configuration.
 */
export const DEFAULT_VIEWPORT = {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 1,
  isMobile: false,
  hasTouch: false,
};

/**
 * Gets a customized viewport setup.
 * @param width Viewport width
 * @param height Viewport height
 */
export function getViewport(width: number = 1920, height: number = 1080) {
  return {
    ...DEFAULT_VIEWPORT,
    width,
    height,
  };
}
