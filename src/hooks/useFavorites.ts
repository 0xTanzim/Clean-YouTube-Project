import { useStoreActions, useStoreState } from 'easy-peasy';
import { useCallback } from 'react';

/**
 * Hook for managing favorite playlists
 */
export const useFavorites = () => {
  const favoriteIds = useStoreState((state: any) => state.favorites.items);
  const addFavoriteAction = useStoreActions(
    (actions: any) => actions.favorites.addFavorite
  );
  const removeFavoriteAction = useStoreActions(
    (actions: any) => actions.favorites.removeFavorite
  );

  const addFavorite = useCallback(
    async (playlistId: string) => {
      try {
        await addFavoriteAction(playlistId);
      } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
      }
    },
    [addFavoriteAction]
  );

  const removeFavorite = useCallback(
    async (playlistId: string) => {
      try {
        await removeFavoriteAction(playlistId);
      } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
      }
    },
    [removeFavoriteAction]
  );

  const isFavorite = useCallback(
    (playlistId: string) => {
      return favoriteIds.includes(playlistId);
    },
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    async (playlistId: string) => {
      if (isFavorite(playlistId)) {
        await removeFavorite(playlistId);
      } else {
        await addFavorite(playlistId);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return {
    favoriteIds,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
};
