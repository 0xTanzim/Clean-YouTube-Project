import { STORAGE_KEYS } from '@/constants';
import { storage } from '@/lib';
import type { BookmarkCollection, VideoBookmark } from '@/types';

export class BookmarkService {
  /**
   * Saves bookmarks to localStorage
   */
  static saveBookmarks(bookmarks: BookmarkCollection): void {
    storage.set(STORAGE_KEYS.BOOKMARKS, bookmarks);
  }

  /**
   * Loads all bookmarks from localStorage
   */
  static loadBookmarks(): BookmarkCollection {
    return storage.get<BookmarkCollection>(STORAGE_KEYS.BOOKMARKS, {});
  }

  /**
   * Gets bookmarks for a specific video
   */
  static getVideoBookmarks(videoId: string): VideoBookmark[] {
    const allBookmarks = this.loadBookmarks();
    return allBookmarks[videoId] || [];
  }

  /**
   * Adds a bookmark for a video
   */
  static addBookmark(videoId: string, bookmark: VideoBookmark): void {
    const allBookmarks = this.loadBookmarks();

    if (!allBookmarks[videoId]) {
      allBookmarks[videoId] = [];
    }

    allBookmarks[videoId].push(bookmark);
    allBookmarks[videoId].sort((a, b) => a.timestamp - b.timestamp);

    this.saveBookmarks(allBookmarks);
  }

  /**
   * Updates an existing bookmark
   */
  static updateBookmark(
    videoId: string,
    bookmarkId: string,
    updates: Partial<VideoBookmark>
  ): void {
    const allBookmarks = this.loadBookmarks();

    if (allBookmarks[videoId]) {
      const bookmarkIndex = allBookmarks[videoId].findIndex(
        (b) => b.id === bookmarkId
      );

      if (bookmarkIndex !== -1) {
        allBookmarks[videoId][bookmarkIndex] = {
          ...allBookmarks[videoId][bookmarkIndex],
          ...updates,
          updatedAt: Date.now(),
        };

        // Re-sort bookmarks by timestamp
        allBookmarks[videoId].sort((a, b) => a.timestamp - b.timestamp);

        this.saveBookmarks(allBookmarks);
      }
    }
  }

  /**
   * Removes a bookmark
   */
  static removeBookmark(videoId: string, bookmarkId: string): void {
    const allBookmarks = this.loadBookmarks();

    if (allBookmarks[videoId]) {
      allBookmarks[videoId] = allBookmarks[videoId].filter(
        (b) => b.id !== bookmarkId
      );

      // Remove video entry if no bookmarks left
      if (allBookmarks[videoId].length === 0) {
        delete allBookmarks[videoId];
      }

      this.saveBookmarks(allBookmarks);
    }
  }

  /**
   * Gets all bookmarks for a playlist
   */
  static getPlaylistBookmarks(playlistId: string): VideoBookmark[] {
    const allBookmarks = this.loadBookmarks();
    const playlistBookmarks: VideoBookmark[] = [];

    Object.values(allBookmarks).forEach((videoBookmarks) => {
      videoBookmarks.forEach((bookmark) => {
        if (bookmark.playlistId === playlistId) {
          playlistBookmarks.push(bookmark);
        }
      });
    });

    return playlistBookmarks.sort((a, b) => a.timestamp - b.timestamp);
  }

  /**
   * Exports bookmarks as markdown
   */
  static exportAsMarkdown(bookmarks: VideoBookmark[]): string {
    if (bookmarks.length === 0) {
      return '# No bookmarks found\n\nCreate some bookmarks while watching videos!';
    }

    let markdown = '# Video Bookmarks\n\n';

    bookmarks.forEach((bookmark) => {
      const timestamp = this.formatTimestamp(bookmark.timestamp);
      markdown += `## ${bookmark.title} (${timestamp})\n\n`;

      if (bookmark.note) {
        markdown += `${bookmark.note}\n\n`;
      }

      if (bookmark.tags && bookmark.tags.length > 0) {
        markdown += `**Tags:** ${bookmark.tags.join(', ')}\n\n`;
      }

      markdown += `**Video ID:** ${bookmark.videoId}\n`;
      markdown += `**Timestamp:** ${bookmark.timestamp}s\n\n`;
      markdown += '---\n\n';
    });

    return markdown;
  }

  /**
   * Downloads markdown content as file
   */
  static downloadMarkdown(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  /**
   * Formats timestamp for display
   */
  private static formatTimestamp(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  }

  /**
   * Clears all bookmarks
   */
  static clearAllBookmarks(): void {
    storage.remove(STORAGE_KEYS.BOOKMARKS);
  }
}
