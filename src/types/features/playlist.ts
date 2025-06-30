// Application-specific types (normalized from YouTube API)
export interface PlaylistThumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface PlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      default: PlaylistThumbnail;
      medium: PlaylistThumbnail;
      high: PlaylistThumbnail;
    };
  };
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
}

export interface Playlist {
  id: string; // Changed from playlistId to id for consistency
  title: string; // Changed from playlistTitle
  description: string; // Changed from playlistDescription
  channelTitle: string;
  channelId: string;
  thumbnails: PlaylistThumbnail; // Changed from playlistThumbnails
  playlistItems: PlaylistItem[];
  itemCount: number;
}

// Progress tracking types
export interface VideoProgress {
  playlistId: string;
  currentVideoIndex: number;
  currentVideoId: string;
  watchTime: number;
  lastWatched: number;
  totalVideos: number;
}
