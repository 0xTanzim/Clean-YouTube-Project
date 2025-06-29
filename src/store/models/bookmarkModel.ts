import { action, persist, type Action } from 'easy-peasy';
import type { BookmarkCollection, VideoBookmark } from '../../types';

interface BookmarkModel {
  bookmarks: BookmarkCollection;

  // Actions
  addBookmark: Action<BookmarkModel, VideoBookmark>;
  updateBookmark: Action<
    BookmarkModel,
    { bookmarkId: string; updates: Partial<VideoBookmark> }
  >;
  deleteBookmark: Action<BookmarkModel, string>;
  deleteBookmarksForVideo: Action<BookmarkModel, string>;
  deleteBookmarksForPlaylist: Action<BookmarkModel, string>;
}

const bookmarkModel: BookmarkModel = persist(
  {
    // State: Organized by videoId -> array of bookmarks
    bookmarks: {},

    // Action to add a new bookmark
    addBookmark: action((state, bookmark: VideoBookmark) => {
      const { videoId } = bookmark;
      if (!state.bookmarks[videoId]) {
        state.bookmarks[videoId] = [];
      }

      // Check if bookmark already exists at same timestamp
      const existingIndex = state.bookmarks[videoId].findIndex(
        (b: VideoBookmark) => Math.abs(b.timestamp - bookmark.timestamp) < 2 // 2 second tolerance
      );

      if (existingIndex >= 0) {
        // Update existing bookmark
        state.bookmarks[videoId][existingIndex] = {
          ...state.bookmarks[videoId][existingIndex],
          ...bookmark,
          updatedAt: Date.now(),
        };
      } else {
        // Add new bookmark
        state.bookmarks[videoId].push(bookmark);
        // Sort by timestamp
        state.bookmarks[videoId].sort(
          (a: VideoBookmark, b: VideoBookmark) => a.timestamp - b.timestamp
        );
      }
    }),

    // Action to update an existing bookmark
    updateBookmark: action(
      (
        state,
        {
          bookmarkId,
          updates,
        }: { bookmarkId: string; updates: Partial<VideoBookmark> }
      ) => {
        for (const videoId in state.bookmarks) {
          const bookmarkIndex = state.bookmarks[videoId].findIndex(
            (b: VideoBookmark) => b.id === bookmarkId
          );
          if (bookmarkIndex >= 0) {
            state.bookmarks[videoId][bookmarkIndex] = {
              ...state.bookmarks[videoId][bookmarkIndex],
              ...updates,
              updatedAt: Date.now(),
            };
            break;
          }
        }
      }
    ),

    // Action to delete a bookmark
    deleteBookmark: action((state, bookmarkId: string) => {
      for (const videoId in state.bookmarks) {
        state.bookmarks[videoId] = state.bookmarks[videoId].filter(
          (bookmark: VideoBookmark) => bookmark.id !== bookmarkId
        );

        // Clean up empty arrays
        if (state.bookmarks[videoId].length === 0) {
          delete state.bookmarks[videoId];
        }
      }
    }),

    // Action to delete all bookmarks for a video
    deleteBookmarksForVideo: action((state, videoId: string) => {
      delete state.bookmarks[videoId];
    }),

    // Action to delete all bookmarks for a playlist
    deleteBookmarksForPlaylist: action((state, playlistId: string) => {
      for (const videoId in state.bookmarks) {
        state.bookmarks[videoId] = state.bookmarks[videoId].filter(
          (bookmark: VideoBookmark) => bookmark.playlistId !== playlistId
        );

        // Clean up empty arrays
        if (state.bookmarks[videoId].length === 0) {
          delete state.bookmarks[videoId];
        }
      }
    }),
  },
  {
    storage: 'localStorage',
    allow: ['bookmarks'],
  }
);

export default bookmarkModel;
