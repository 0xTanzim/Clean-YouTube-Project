import { useFavorites } from '@/hooks/useFavorites';
import { usePlaylists } from '@/hooks/usePlaylists';
import type { Playlist } from '@/types';
import { useEffect, useState } from 'react';
import PlayListCard from '../playlist-card-itms';
import { EmptyState, LoadingSpinner } from '../ui/Feedback';

const FavoritePlaylists = () => {
  const { favoriteIds } = useFavorites();
  const { getPlaylistById } = usePlaylists();
  const [favoritePlaylists, setFavoritePlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFavoritePlaylists = async () => {
      if (favoriteIds.length === 0) {
        setFavoritePlaylists([]);
        return;
      }

      setIsLoading(true);
      try {
        const playlists = await Promise.all(
          favoriteIds.map((playlistId: string) => getPlaylistById(playlistId))
        );
        setFavoritePlaylists(playlists.filter(Boolean)); // Filter out any null/undefined results
      } catch (error) {
        console.error('Error fetching favorite playlists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoritePlaylists();
  }, [favoriteIds, getPlaylistById]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Favorite Playlists
        </h3>
        <div className="flex justify-center items-center min-h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (favoritePlaylists.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Favorite Playlists
        </h3>
        <EmptyState
          title="No favorite playlists yet"
          description="Add playlists to your favorites by clicking the star icon on any playlist card."
          icon={
            <svg
              className="h-16 w-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Favorite Playlists ({favoritePlaylists.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoritePlaylists.map((playlist) => (
          <div key={playlist.id} className="flex">
            <PlayListCard playlist={playlist} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePlaylists;
