// Playlist-specific business logic and API calls
import getPlaylist from '../../../api';
import type { Playlist } from '../../../types';

export class PlaylistService {
  /**
   * Fetches a playlist by ID with error handling
   */
  static async fetchPlaylist(playlistId: string): Promise<Playlist> {
    try {
      return await getPlaylist(playlistId);
    } catch (error) {
      console.error(`Failed to fetch playlist ${playlistId}:`, error);
      throw new Error(
        'Unable to load playlist. Please check your connection and try again.'
      );
    }
  }

  /**
   * Validates playlist ID format
   */
  static isValidPlaylistId(playlistId: string): boolean {
    const playlistIdRegex = /^[a-zA-Z0-9_-]+$/;
    return playlistIdRegex.test(playlistId) && playlistId.length > 10;
  }

  /**
   * Extracts playlist ID from YouTube URL
   */
  static extractPlaylistId(url: string): string | null {
    const regex = /[?&]list=([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
}
