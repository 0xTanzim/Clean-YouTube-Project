// YouTube API Response Types - Based on actual API structure
export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeThumbnails {
  default: YouTubeThumbnail;
  medium: YouTubeThumbnail;
  high: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
}

// Raw YouTube API PlaylistItem structure
export interface YouTubePlaylistItemSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: {
    kind: string;
    videoId: string;
  };
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface YouTubePlaylistItemContentDetails {
  videoId: string;
  videoPublishedAt: string;
}

export interface YouTubePlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubePlaylistItemSnippet;
  contentDetails: YouTubePlaylistItemContentDetails;
}

export interface YouTubePageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YouTubePlaylistItemListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: YouTubePageInfo;
  items: YouTubePlaylistItem[];
}

// Raw YouTube API Playlist structure
export interface YouTubePlaylistSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  channelTitle: string;
  defaultLanguage?: string;
}

export interface YouTubePlaylist {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubePlaylistSnippet;
}

export interface YouTubePlaylistListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: YouTubePageInfo;
  items: YouTubePlaylist[];
}

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

// Video bookmark types
export interface VideoBookmark {
  id: string;
  videoId: string;
  playlistId: string;
  timestamp: number; // in seconds
  title: string;
  note?: string;
  createdAt: number;
  updatedAt: number;
  tags?: string[];
}

export interface BookmarkCollection {
  [videoId: string]: VideoBookmark[];
}

// Store state types
export interface PlaylistState {
  data: Record<string, Playlist>;
  isLoading: boolean;
  error: string;
}

export interface FavoriteState {
  items: string[];
}

export interface RecentState {
  items: string[];
}

export interface NoteState {
  items: Record<string, string>;
}

export interface BookmarkState {
  items: BookmarkCollection;
}

export interface VideoProgressState {
  items: Record<string, VideoProgress>;
}

// Component prop types
export interface PlayListCardProps {
  playlist: Playlist;
}

export interface PlayListFormProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (playlistId: string) => void;
}

// Navigation types
export interface LayoutProps {
  children: React.ReactNode;
}

export interface MenuBarProps {
  menuBarTrig: boolean;
}

export interface SideNavProps {
  handleMenuBarTrig: () => void;
}

// Theme types
export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// API types
export interface ApiError {
  message: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}
