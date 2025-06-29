import { useStoreActions, useStoreState } from 'easy-peasy';
import { useCallback } from 'react';
import type { Playlist } from '../types';

/**
 * Hook for managing playlists
 */
export const usePlaylists = () => {
  const playlistData = useStoreState((state: any) => state.playlists.data);
  const isLoading = useStoreState((state: any) => state.playlists.isLoading);
  const error = useStoreState((state: any) => state.playlists.error);
  const fetchPlaylistAction = useStoreActions(
    (actions: any) => actions.playlists.getPlaylist
  );
  const getPlaylistByIdAction = useStoreActions(
    (actions: any) => actions.playlists.getPlaylistById
  );

  const playlists = Object.values(playlistData) as Playlist[];

  const fetchPlaylist = useCallback(
    async (playlistId: string) => {
      try {
        return await fetchPlaylistAction(playlistId);
      } catch (error) {
        console.error('Error fetching playlist:', error);
        throw error;
      }
    },
    [fetchPlaylistAction]
  );

  const getPlaylistById = useCallback(
    (playlistId: string) => {
      return getPlaylistByIdAction(playlistId);
    },
    [getPlaylistByIdAction]
  );

  return {
    playlists,
    playlistData,
    isLoading,
    error,
    fetchPlaylist,
    getPlaylistById,
  };
};
