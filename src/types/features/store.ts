import type { BookmarkCollection } from '../features/bookmark';
import type { Playlist, VideoProgress } from '../features/playlist';

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

// Store model types
export interface StoreModel {
  playlists: PlaylistState;
  favorites: FavoriteState;
  recent: RecentState;
  notes: NoteState;
  bookmarks: BookmarkState;
  progress: VideoProgressState;
}
