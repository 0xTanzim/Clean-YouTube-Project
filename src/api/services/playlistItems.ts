import { MAX_RESULTS_PER_PAGE } from '@/constants';
import type {
  YouTubePlaylistItem,
  YouTubePlaylistItemListResponse,
} from '@/types';
import { youtubeApi } from '../config/axios';

/**
 * Fetches all playlist items from the YouTube API for a given playlist ID
 * Handles pagination automatically
 */
export const fetchPlaylistItems = async (
  playlistId: string,
  pageToken = '',
  result: YouTubePlaylistItem[] = []
): Promise<YouTubePlaylistItem[]> => {
  const { data }: { data: YouTubePlaylistItemListResponse } =
    await youtubeApi.get('/playlistItems', {
      params: {
        part: 'contentDetails,snippet,id',
        maxResults: MAX_RESULTS_PER_PAGE,
        playlistId,
        pageToken,
      },
    });

  const newResult = [...result, ...data.items];

  // Recursively fetch next page if exists
  if (data.nextPageToken) {
    return await fetchPlaylistItems(playlistId, data.nextPageToken, newResult);
  }

  return newResult;
};
