// Service layer pattern for API calls
import getPlaylist from '@/api';
import { safeAsync } from '@/lib/utils';
import type { ApiResponse, Playlist } from '@/types';

export class PlaylistService {
  /**
   * Fetches a playlist with error handling
   */
  static async fetchPlaylist(
    playlistId: string
  ): Promise<ApiResponse<Playlist>> {
    const { data, error } = await safeAsync(() => getPlaylist(playlistId));

    if (error) {
      return {
        data: undefined as any,
        error: {
          message:
            'Failed to fetch playlist. Please check your connection and try again.',
          status: 500,
        },
      };
    }

    return { data: data! };
  }

  /**
   * Validates playlist ID format
   */
  static isValidPlaylistId(playlistId: string): boolean {
    return /^[a-zA-Z0-9_-]{10,}$/.test(playlistId);
  }

  /**
   * Extracts playlist ID from various YouTube URL formats
   */
  static extractPlaylistId(input: string): string | null {
    try {
      const url = new URL(input);
      const listParam = url.searchParams.get('list');
      return listParam && this.isValidPlaylistId(listParam) ? listParam : null;
    } catch {
      // If it's not a URL, check if it's a valid playlist ID
      return this.isValidPlaylistId(input.trim()) ? input.trim() : null;
    }
  }
}
