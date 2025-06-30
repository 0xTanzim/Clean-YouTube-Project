import type { VideoBookmark } from '@/types';
import { action, persist, thunk } from 'easy-peasy';
import type { BookmarkModel } from '../types';

const bookmarkModel: BookmarkModel = persist(
  {
    // State: Organized by videoId -> array of bookmarks
    items: {},

    // Action to add a new bookmark
    addBookmark: action((state, bookmark: VideoBookmark) => {
      const { videoId } = bookmark;
      if (!state.items[videoId]) {
        state.items[videoId] = [];
      }

      // Check if bookmark already exists at same timestamp
      const existingIndex = state.items[videoId].findIndex(
        (b: VideoBookmark) => Math.abs(b.timestamp - bookmark.timestamp) < 2 // 2 second tolerance
      );

      if (existingIndex >= 0) {
        // Update existing bookmark
        state.items[videoId][existingIndex] = {
          ...state.items[videoId][existingIndex],
          ...bookmark,
          updatedAt: Date.now(),
        };
      } else {
        // Add new bookmark
        state.items[videoId].push(bookmark);
        // Sort by timestamp
        state.items[videoId].sort(
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
        for (const videoId in state.items) {
          const bookmarkIndex = state.items[videoId].findIndex(
            (b: VideoBookmark) => b.id === bookmarkId
          );
          if (bookmarkIndex >= 0) {
            state.items[videoId][bookmarkIndex] = {
              ...state.items[videoId][bookmarkIndex],
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
      for (const videoId in state.items) {
        state.items[videoId] = state.items[videoId].filter(
          (bookmark: VideoBookmark) => bookmark.id !== bookmarkId
        );

        // Clean up empty arrays
        if (state.items[videoId].length === 0) {
          delete state.items[videoId];
        }
      }
    }),

    // Action to delete all bookmarks for a video
    deleteBookmarksForVideo: action((state, videoId: string) => {
      delete state.items[videoId];
    }),

    // Action to delete all bookmarks for a playlist
    deleteBookmarksForPlaylist: action((state, playlistId: string) => {
      for (const videoId in state.items) {
        state.items[videoId] = state.items[videoId].filter(
          (bookmark: VideoBookmark) => bookmark.playlistId !== playlistId
        );

        // Clean up empty arrays
        if (state.items[videoId].length === 0) {
          delete state.items[videoId];
        }
      }
    }),

    // Thunk to get bookmarks for a specific video
    getBookmarksForVideo: thunk((_, videoId, helpers) => {
      return helpers.getState().items[videoId] || [];
    }),

    // Thunk to get all bookmarks for a playlist
    getBookmarksForPlaylist: thunk((_, playlistId, helpers) => {
      const allBookmarks: VideoBookmark[] = [];
      const items = helpers.getState().items;

      for (const videoId in items) {
        const videoBookmarks = items[videoId].filter(
          (bookmark: VideoBookmark) => bookmark.playlistId === playlistId
        );
        allBookmarks.push(...videoBookmarks);
      }

      return allBookmarks.sort((a, b) => a.timestamp - b.timestamp);
    }),
  },
  {
    storage: 'localStorage',
    allow: ['items'],
  }
);

export default bookmarkModel;
