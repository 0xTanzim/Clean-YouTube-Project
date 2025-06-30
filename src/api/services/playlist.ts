import type { Playlist, YouTubePlaylistListResponse } from '@/types';
import { youtubeApi } from '../config/axios';
import {
  transformPlaylist,
  transformPlaylistItem,
} from '../transformers/playlist';
import { fetchPlaylistItems } from './playlistItems';

/**
 * Fetches complete playlist details with all items from YouTube API
 */
export const fetchPlaylist = async (playlistId: string): Promise<Playlist> => {
  // Fetch playlist metadata
  const { data }: { data: YouTubePlaylistListResponse } = await youtubeApi.get(
    '/playlists',
    {
      params: {
        part: 'snippet,id',
        id: playlistId,
      },
    }
  );

  if (!data.items || data.items.length === 0) {
    throw new Error('Playlist not found or is private');
  }

  // Fetch all playlist items
  const rawPlaylistItems = await fetchPlaylistItems(playlistId);

  // Transform playlist items to our internal format
  const playlistItems = rawPlaylistItems.map(transformPlaylistItem);

  // Transform and return complete playlist
  return transformPlaylist(data.items[0], playlistItems);
};
