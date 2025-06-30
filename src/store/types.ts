import type {
  BookmarkState,
  FavoriteState,
  NoteState,
  Playlist,
  PlaylistState,
  RecentState,
  VideoBookmark,
  VideoProgress,
  VideoProgressState,
} from '@/types';
import type { Action, Thunk } from 'easy-peasy';

// Store model interfaces
export interface PlaylistModel extends PlaylistState {
  setLoading: Action<PlaylistModel, boolean>;
  setError: Action<PlaylistModel, string>;
  setPlaylist: Action<PlaylistModel, Playlist>;
  getPlaylist: Thunk<PlaylistModel, string>;
  getPlaylistById: Thunk<
    PlaylistModel,
    string | undefined,
    any,
    any,
    Playlist | undefined
  >;
  removePlaylist: Action<PlaylistModel, string>;
  clearError: Action<PlaylistModel>;
}

export interface FavoriteModel extends FavoriteState {
  addFavorite: Action<FavoriteModel, string>;
  removeFavorite: Action<FavoriteModel, string>;
  toggleFavorite: Action<FavoriteModel, string>;
  isFavorite: Thunk<FavoriteModel, string, any, any, boolean>;
}

export interface RecentModel extends RecentState {
  addRecent: Action<RecentModel, string>;
  removeFromRecent: Action<RecentModel, string>;
  clearRecent: Action<RecentModel>;
}

export interface NoteModel extends NoteState {
  addOrUpdateNote: Action<NoteModel, { videoId: string; note: string }>;
  deleteNote: Action<NoteModel, string>;
  deleteNotesForPlaylist: Action<NoteModel, string>;
  getNoteForVideo: Thunk<NoteModel, string, any, any, string | null>;
}

export interface VideoProgressModel extends VideoProgressState {
  updateProgress: Action<
    VideoProgressModel,
    { playlistId: string; progress: VideoProgress }
  >;
  removeProgress: Action<VideoProgressModel, string>;
  getProgress: Thunk<
    VideoProgressModel,
    string,
    any,
    any,
    VideoProgress | null
  >;
  deleteVideoProgressForPlaylist: Action<VideoProgressModel, string>;
}

export interface BookmarkModel extends BookmarkState {
  addBookmark: Action<BookmarkModel, VideoBookmark>;
  updateBookmark: Action<
    BookmarkModel,
    { bookmarkId: string; updates: Partial<VideoBookmark> }
  >;
  deleteBookmark: Action<BookmarkModel, string>;
  deleteBookmarksForVideo: Action<BookmarkModel, string>;
  deleteBookmarksForPlaylist: Action<BookmarkModel, string>;
  getBookmarksForVideo: Thunk<BookmarkModel, string, any, any, VideoBookmark[]>;
  getBookmarksForPlaylist: Thunk<
    BookmarkModel,
    string,
    any,
    any,
    VideoBookmark[]
  >;
}

// Root store model
export interface StoreModel {
  playlists: PlaylistModel;
  favorites: FavoriteModel;
  recentPlaylists: RecentModel;
  notes: NoteModel;
  videoProgress: VideoProgressModel;
  bookmarks: BookmarkModel;
}
