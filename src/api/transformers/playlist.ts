import type {
  Playlist,
  PlaylistItem,
  YouTubePlaylist,
  YouTubePlaylistItem,
} from '@/types';

/**
 * Transforms raw YouTube API playlist item to our internal format
 */
export const transformPlaylistItem = (
  item: YouTubePlaylistItem
): PlaylistItem => ({
  id: item.id,
  snippet: {
    title: item.snippet.title,
    description: item.snippet.description,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    thumbnails: {
      default: {
        url: item.snippet.thumbnails.default.url,
        width: item.snippet.thumbnails.default.width,
        height: item.snippet.thumbnails.default.height,
      },
      medium: {
        url: item.snippet.thumbnails.medium.url,
        width: item.snippet.thumbnails.medium.width,
        height: item.snippet.thumbnails.medium.height,
      },
      high: {
        url: item.snippet.thumbnails.high.url,
        width: item.snippet.thumbnails.high.width,
        height: item.snippet.thumbnails.high.height,
      },
    },
  },
  contentDetails: {
    videoId: item.contentDetails.videoId,
    videoPublishedAt: item.contentDetails.videoPublishedAt,
  },
});

/**
 * Transforms raw YouTube API playlist to our internal format
 */
export const transformPlaylist = (
  youtubePlaylist: YouTubePlaylist,
  playlistItems: PlaylistItem[]
): Playlist => {
  const { channelId, title, description, thumbnails, channelTitle } =
    youtubePlaylist.snippet;

  return {
    id: youtubePlaylist.id,
    title,
    description,
    channelTitle,
    channelId,
    thumbnails: {
      url: thumbnails.medium.url,
      width: thumbnails.medium.width,
      height: thumbnails.medium.height,
    },
    playlistItems,
    itemCount: playlistItems.length,
  };
};
