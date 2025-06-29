import axios from 'axios';
import { MAX_RESULTS_PER_PAGE, YOUTUBE_API_BASE_URL } from '../constants';
import type { Playlist, PlaylistItem } from '../types';

const API_KEY = import.meta.env.VITE_YouTube_API_KEY;

// Create axios instance with default config
const youtubeApi = axios.create({
  baseURL: YOUTUBE_API_BASE_URL,
  params: {
    key: API_KEY,
  },
});

/**
 * Fetches playlist items from the YouTube API for a given playlist ID.
 */
const getPlaylistItems = async (
  playlistId: string,
  pageToken = '',
  result: PlaylistItem[] = []
): Promise<PlaylistItem[]> => {
  try {
    const { data } = await youtubeApi.get('/playlistItems', {
      params: {
        part: 'contentDetails,snippet,id',
        maxResults: MAX_RESULTS_PER_PAGE,
        playlistId,
        pageToken,
      },
    });

    const newResult = [...result, ...data.items];

    if (data.nextPageToken) {
      return await getPlaylistItems(playlistId, data.nextPageToken, newResult);
    }

    return newResult;
  } catch (error) {
    console.error('Error fetching playlist items:', error);
    throw new Error('Failed to fetch playlist items. Please try again.');
  }
};

/**
 * Fetches details of a YouTube playlist with all its items.
 */
const getPlaylist = async (playlistId: string): Promise<Playlist> => {
  try {
    const { data } = await youtubeApi.get('/playlists', {
      params: {
        part: 'snippet,id',
        id: playlistId,
      },
    });

    if (!data.items || data.items.length === 0) {
      throw new Error('Playlist not found.');
    }

    const playlistItems = await getPlaylistItems(playlistId);
    const firstItem = data.items[0];
    const {
      channelId,
      title: playlistTitle,
      description: playlistDescription,
      thumbnails,
      channelTitle,
    } = firstItem.snippet;

    // Transform playlist items to match our interface
    const transformedItems: PlaylistItem[] = playlistItems.map((item) => ({
      id: item.id,
      snippet: {
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
      },
      contentDetails: {
        videoId: item.contentDetails.videoId,
        videoPublishedAt: item.contentDetails.videoPublishedAt,
      },
    }));

    return {
      playlistId,
      playlistTitle,
      playlistDescription,
      channelTitle,
      channelId,
      playlistThumbnails: thumbnails.medium,
      playlistItems: transformedItems,
      itemCount: transformedItems.length,
    };
  } catch (error) {
    console.error('Error fetching playlist details:', error);
    throw new Error('Failed to fetch playlist details. Please try again.');
  }
};

export default getPlaylist;
