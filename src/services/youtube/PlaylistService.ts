import getPlaylist, { fetchPlaylistItems } from '@/api';
import { isValidPlaylistId, parsePlaylistId, safeAsync } from '@/lib';
import type { ApiResponse, Playlist } from '@/types';

export class PlaylistService {
  /**
   * Fetches a playlist with comprehensive error handling
   */
  static async fetchPlaylist(
    playlistId: string
  ): Promise<ApiResponse<Playlist>> {
    // Validate input
    if (!playlistId) {
      return {
        data: null as any,
        error: { message: 'Playlist ID is required' },
        success: false,
      };
    }

    // Parse and validate playlist ID
    const parsedId = parsePlaylistId(playlistId);
    if (!parsedId || !isValidPlaylistId(parsedId)) {
      return {
        data: null as any,
        error: { message: 'Invalid playlist ID format' },
        success: false,
      };
    }

    // Fetch playlist data
    const result = await safeAsync(() => getPlaylist(parsedId));

    if (result.error) {
      return {
        data: null as any,
        error: { message: result.error.message },
        success: false,
      };
    }

    return {
      data: result.data!,
      success: true,
    };
  }

  /**
   * Validates playlist ID format
   */
  static isValidPlaylistId(id: string): boolean {
    return isValidPlaylistId(id);
  }

  /**
   * Extracts playlist ID from various YouTube URL formats
   */
  static extractPlaylistId(input: string): string | null {
    return parsePlaylistId(input);
  }

  /**
   * Fetches playlist items only (without metadata)
   */
  static async fetchPlaylistItems(playlistId: string) {
    const result = await safeAsync(() => fetchPlaylistItems(playlistId));

    if (result.error) {
      throw new Error(
        `Failed to fetch playlist items: ${result.error.message}`
      );
    }

    return result.data!;
  }
}
