import type { Action, Thunk } from 'easy-peasy';
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

// Store model interfaces
export interface PlaylistModel extends PlaylistState {
  setLoading: Action<PlaylistModel, boolean>;
  setError: Action<PlaylistModel, string>;
  addPlaylist: Action<PlaylistModel, Playlist>;
  getPlaylist: Thunk<PlaylistModel, string>;
  getPlaylistById: Thunk<PlaylistModel, string, {}, {}, Playlist>;
  removePlaylist: Action<PlaylistModel, string>;
  deletePlaylist: Thunk<PlaylistModel, string>;
}

export interface FavoriteModel extends FavoriteState {
  addFavorite: Action<FavoriteModel, string>;
  removeFavorite: Action<FavoriteModel, string>;
}

export interface RecentModel extends RecentState {
  addRecent: Action<RecentModel, string>;
}

export interface NoteModel extends NoteState {
  addNote: Action<NoteModel, { playlistId: string; note: string }>;
  updateNote: Action<NoteModel, { playlistId: string; note: string }>;
  removeNote: Action<NoteModel, string>;
  deleteNotesForPlaylist: Action<NoteModel, string>;
}

export interface VideoProgressModel extends VideoProgressState {
  updateProgress: Action<VideoProgressModel, VideoProgress>;
  removeProgress: Action<VideoProgressModel, string>;
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
