// YouTube API constants
export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
export const MAX_RESULTS_PER_PAGE = 50;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  VIDEO_PROGRESS: 'video_progress',
  FAVORITES: 'favorites',
  RECENT_PLAYLISTS: 'recent_playlists',
  NOTES: 'notes',
  BOOKMARKS: 'video_bookmarks',
} as const;

// UI constants
export const BREAKPOINTS = {
  MOBILE: 576,
  TABLET: 768,
  DESKTOP: 1024,
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 200,
  MEDIUM: 300,
  SLOW: 500,
} as const;

// Playlist limits
export const PLAYLIST_LIMITS = {
  TITLE_LENGTH: 50,
  DESCRIPTION_LENGTH: 100,
  MAX_RECENT: 20,
  MAX_FAVORITES: 100,
} as const;
