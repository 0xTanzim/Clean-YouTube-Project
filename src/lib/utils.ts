import { STORAGE_KEYS } from '../constants';
import type { VideoProgress } from '../types';

/**
 * Truncates text to specified length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Parses YouTube playlist URL or returns the ID if already provided
 */
export const parsePlaylistId = (input: string): string | null => {
  try {
    const url = new URL(input);
    const urlParams = new URLSearchParams(url.search);

    if (url.hostname.includes('youtube.com') && urlParams.has('list')) {
      return urlParams.get('list');
    }
  } catch {
    // If it's not a valid URL, treat it as a playlist ID
    return input.trim();
  }

  return input.trim();
};

/**
 * Formats watch time in seconds to human-readable format
 */
export const formatWatchTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

/**
 * Formats duration from seconds to human-readable format
 * Example: formatDuration(3661) → "1h 1m 1s"
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);

  return parts.join(' ') || '0s';
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Local storage utilities with error handling
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  },
};

/**
 * Video progress utilities
 */
export const videoProgressUtils = {
  getKey: (playlistId: string): string =>
    `${STORAGE_KEYS.VIDEO_PROGRESS}_${playlistId}`,

  load: (playlistId: string): VideoProgress | null => {
    return storage.get<VideoProgress | null>(
      videoProgressUtils.getKey(playlistId),
      null
    );
  },

  save: (progress: VideoProgress): void => {
    storage.set(videoProgressUtils.getKey(progress.playlistId), progress);
  },

  remove: (playlistId: string): void => {
    storage.remove(videoProgressUtils.getKey(playlistId));
  },
};

/**
 * Validates playlist ID format
 */
export const isValidPlaylistId = (id: string): boolean => {
  // YouTube playlist IDs typically start with 'PL' and are 34 characters long
  return /^[a-zA-Z0-9_-]{10,}$/.test(id);
};

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
 * Creates a safe async function that returns result with error handling
 */
export const safeAsync = async <T>(
  asyncFn: () => Promise<T>
): Promise<{ data?: T; error?: Error }> => {
  try {
    const data = await asyncFn();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }
};

/**
 * Calculates progress percentage
 */
export const calculateProgress = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
};
