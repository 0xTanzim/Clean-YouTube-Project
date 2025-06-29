import { useStoreActions } from 'easy-peasy';
import { useCallback } from 'react';

/**
 * Hook for managing recent playlists
 */
export const useRecent = () => {
  const addRecentAction = useStoreActions(
    (actions: any) => actions.recentPlaylists.addRecent
  );

  const addToRecent = useCallback(
    (playlistId: string) => {
      try {
        addRecentAction(playlistId);
      } catch (error) {
        console.error('Error adding to recent:', error);
      }
    },
    [addRecentAction]
  );

  return {
    addToRecent,
  };
};
