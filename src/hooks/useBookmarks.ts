import { useCallback, useMemo } from 'react';
import { bookmarkUtils } from '@/lib/utils';
import type { VideoBookmark } from '../types';
import { useStoreActions, useStoreState } from './useStore';

/**
 * Custom hook for managing video bookmarks
 */
export const useBookmarks = (videoId?: string, playlistId?: string) => {
  // Store actions and state
  const addBookmark = useStoreActions(
    (actions) => actions.bookmarks.addBookmark
  );
  const updateBookmark = useStoreActions(
    (actions) => actions.bookmarks.updateBookmark
  );
  const deleteBookmark = useStoreActions(
    (actions) => actions.bookmarks.deleteBookmark
  );
  const deleteBookmarksForVideo = useStoreActions(
    (actions) => actions.bookmarks.deleteBookmarksForVideo
  );
  const deleteBookmarksForPlaylist = useStoreActions(
    (actions) => actions.bookmarks.deleteBookmarksForPlaylist
  );

  const allBookmarks = useStoreState((state) => state.bookmarks.bookmarks);

  // Get bookmarks for current video
  const videoBookmarks = useMemo(() => {
    if (!videoId) return [];
    return allBookmarks[videoId] || [];
  }, [allBookmarks, videoId]);

  // Get bookmarks for current playlist
  const playlistBookmarks = useMemo(() => {
    if (!playlistId) return [];

    const bookmarks: VideoBookmark[] = [];
    Object.values(allBookmarks).forEach((videoBookmarks) => {
      const playlistBookmarksForVideo = videoBookmarks.filter(
        (bookmark) => bookmark.playlistId === playlistId
      );
      bookmarks.push(...playlistBookmarksForVideo);
    });

    return bookmarks.sort((a, b) => b.createdAt - a.createdAt);
  }, [allBookmarks, playlistId]);

  // Create a new bookmark
  const createBookmark = useCallback(
    (timestamp: number, title: string, note?: string, tags?: string[]) => {
      if (!videoId || !playlistId) {
        throw new Error(
          'Video ID and Playlist ID are required to create a bookmark'
        );
      }

      const bookmark: VideoBookmark = {
        id: bookmarkUtils.generateId(),
        videoId,
        playlistId,
        timestamp,
        title,
        note,
        tags,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      addBookmark(bookmark);
      return bookmark;
    },
    [videoId, playlistId, addBookmark]
  );

  // Update existing bookmark
  const editBookmark = useCallback(
    (
      bookmarkId: string,
      updates: Partial<
        Omit<VideoBookmark, 'id' | 'videoId' | 'playlistId' | 'createdAt'>
      >
    ) => {
      updateBookmark({
        bookmarkId,
        updates: {
          ...updates,
          updatedAt: Date.now(),
        },
      });
    },
    [updateBookmark]
  );

  // Delete bookmark by ID
  const removeBookmark = useCallback(
    (bookmarkId: string) => {
      deleteBookmark(bookmarkId);
    },
    [deleteBookmark]
  );

  // Clear all bookmarks for current video
  const clearVideoBookmarks = useCallback(() => {
    if (!videoId) return;
    deleteBookmarksForVideo(videoId);
  }, [videoId, deleteBookmarksForVideo]);

  // Clear all bookmarks for current playlist
  const clearPlaylistBookmarks = useCallback(() => {
    if (!playlistId) return;
    deleteBookmarksForPlaylist(playlistId);
  }, [playlistId, deleteBookmarksForPlaylist]);

  // Find bookmark at specific timestamp (within 2 seconds)
  const findBookmarkAtTime = useCallback(
    (timestamp: number) => {
      return videoBookmarks.find(
        (bookmark) => Math.abs(bookmark.timestamp - timestamp) < 2
      );
    },
    [videoBookmarks]
  );

  // Get bookmark by ID
  const getBookmarkById = useCallback(
    (bookmarkId: string) => {
      for (const bookmarks of Object.values(allBookmarks)) {
        const bookmark = bookmarks.find((b) => b.id === bookmarkId);
        if (bookmark) return bookmark;
      }
      return null;
    },
    [allBookmarks]
  );

  // Export bookmarks as markdown
  const exportAsMarkdown = useCallback(
    (bookmarksToExport?: VideoBookmark[], filename?: string) => {
      const bookmarks = bookmarksToExport || playlistBookmarks;

      if (bookmarks.length === 0) {
        throw new Error('No bookmarks to export');
      }

      const markdown = bookmarkUtils.exportAsMarkdown(bookmarks);
      const exportFilename =
        filename || `bookmarks-${playlistId || 'all'}-${Date.now()}.md`;

      bookmarkUtils.downloadMarkdown(markdown, exportFilename);

      return markdown;
    },
    [playlistBookmarks, playlistId]
  );

  // Statistics
  const stats = useMemo(() => {
    const totalBookmarks = videoBookmarks.length;
    const totalPlaylistBookmarks = playlistBookmarks.length;

    const tags = new Set<string>();
    videoBookmarks.forEach((bookmark) => {
      bookmark.tags?.forEach((tag) => tags.add(tag));
    });

    const averageBookmarksPerVideo =
      playlistBookmarks.length > 0
        ? Math.round(
            playlistBookmarks.length /
              new Set(playlistBookmarks.map((b) => b.videoId)).size
          )
        : 0;

    return {
      totalBookmarks,
      totalPlaylistBookmarks,
      uniqueTags: Array.from(tags),
      averageBookmarksPerVideo,
    };
  }, [videoBookmarks, playlistBookmarks]);

  return {
    // Data
    videoBookmarks,
    playlistBookmarks,
    allBookmarks,
    stats,

    // Actions
    createBookmark,
    editBookmark,
    removeBookmark,
    clearVideoBookmarks,
    clearPlaylistBookmarks,

    // Utilities
    findBookmarkAtTime,
    getBookmarkById,
    exportAsMarkdown,
  };
};
