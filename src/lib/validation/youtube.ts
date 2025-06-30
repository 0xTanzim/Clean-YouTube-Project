/**
 * YouTube-specific utility functions
 */

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
 * Validates playlist ID format
 */
export const isValidPlaylistId = (id: string): boolean => {
  // YouTube playlist IDs typically start with 'PL' and are 34 characters long
  return /^[a-zA-Z0-9_-]{10,}$/.test(id);
};

/**
 * Extracts video ID from YouTube URL
 */
export const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
};

/**
 * Generates YouTube thumbnail URL for video
 */
export const getVideoThumbnail = (
  videoId: string,
  quality: 'default' | 'medium' | 'high' | 'maxres' = 'medium'
): string => {
  return `https://img.youtube.com/vi/${videoId}/${
    quality === 'default'
      ? 'default'
      : quality === 'maxres'
      ? 'maxresdefault'
      : `${quality}quality`
  }.jpg`;
};

/**
 * Generates YouTube video embed URL
 */
export const getEmbedUrl = (videoId: string, startTime?: number): string => {
  const baseUrl = `https://www.youtube.com/embed/${videoId}`;
  const params = new URLSearchParams({
    autoplay: '0',
    rel: '0',
    modestbranding: '1',
  });

  if (startTime) {
    params.set('start', startTime.toString());
  }

  return `${baseUrl}?${params.toString()}`;
};
