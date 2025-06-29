// Core playlist types
export interface PlaylistThumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface PlaylistSnippet {
  title: string;
  description: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  thumbnails: {
    default: PlaylistThumbnail;
    medium: PlaylistThumbnail;
    high: PlaylistThumbnail;
    standard?: PlaylistThumbnail;
    maxres?: PlaylistThumbnail;
  };
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
  playlistId: string;
  playlistTitle: string;
  playlistDescription: string;
  channelTitle: string;
  channelId: string;
  playlistThumbnails: PlaylistThumbnail;
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
