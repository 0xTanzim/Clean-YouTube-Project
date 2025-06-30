/**
 * Device and environment detection utilities
 */

/**
 * Gets device type based on window width
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;
  if (width < 576) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Checks if running in browser environment
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Checks if device supports touch
 */
export const isTouchDevice = (): boolean => {
  return (
    isBrowser() && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );
};

/**
 * Checks if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return (
    isBrowser() && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
};

/**
 * Gets user's preferred color scheme
 */
export const getPreferredColorScheme = (): 'light' | 'dark' => {
  if (!isBrowser()) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};
