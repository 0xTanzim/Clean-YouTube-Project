// Temporary compatibility layer - DEPRECATED
// TODO: Update imports to use specific paths

// Import dependencies properly (no require in browser)
import {
  formatTimestamp as formatTimestampUtil,
  timestampToSeconds,
} from './formatters/time';
import { storage } from './storage/localStorage';

// Text utilities
export { truncateText } from './formatters/text';

// YouTube utilities
export { isValidPlaylistId, parsePlaylistId } from './validation/youtube';

// Time utilities
export { formatTimestamp, timestampToSeconds } from './formatters/time';

// Async utilities
export { safeAsync } from './helpers/async';

// Bookmark utilities (moved to services)
export const bookmarkUtils = {
  exportAsMarkdown: (_bookmarks: any[], _videoTitle?: string) => {
    // Implementation moved to BookmarkService
    console.warn(
      'bookmarkUtils.exportAsMarkdown is deprecated. Use BookmarkService.exportAsMarkdown instead.'
    );
    return '';
  },
  downloadMarkdown: (_content: string, _filename: string) => {
    // Implementation moved to BookmarkService
    console.warn(
      'bookmarkUtils.downloadMarkdown is deprecated. Use BookmarkService.downloadMarkdown instead.'
    );
  },
  formatTimestamp: (seconds: number) => {
    return formatTimestampUtil(seconds);
  },
  parseTimestamp: (timestamp: string) => {
    return timestampToSeconds(timestamp);
  },
  isValidTimestamp: (timestamp: string) => {
    return /^\d{1,2}:\d{2}(:\d{2})?$/.test(timestamp);
  },
  generateId: () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  },
};

// Video progress utilities (moved to services)
export const videoProgressUtils = {
  load: (playlistId: string) => {
    return storage.get(`video_progress_${playlistId}`, null);
  },
  save: (progress: any) => {
    storage.set(`video_progress_${progress.playlistId}`, progress);
  },
  remove: (playlistId: string) => {
    storage.remove(`video_progress_${playlistId}`);
  },
};
