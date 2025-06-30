import { usePlaylists } from '@/hooks/usePlaylists';
import type { Playlist } from '@/types';
import { useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import PlayListCard from '../playlist-card-itms';
import { EmptyState, LoadingSpinner } from '../ui/Feedback';

const RecentPlaylists = () => {
  const recentPlaylistIds = useStoreState(
    (state: any) => state.recentPlaylists.items
  );
  const { getPlaylistById } = usePlaylists();
  const [recentPlaylists, setRecentPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecentPlaylists = async () => {
      if (recentPlaylistIds.length === 0) {
        setRecentPlaylists([]);
        return;
      }

      setIsLoading(true);
      try {
        const playlists = await Promise.all(
          recentPlaylistIds.map((playlistId: string) =>
            getPlaylistById(playlistId)
          )
        );
        setRecentPlaylists(playlists.filter(Boolean)); // Filter out any null/undefined results
      } catch (error) {
        console.error('Error fetching recent playlists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentPlaylists();
  }, [recentPlaylistIds, getPlaylistById]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Recent Playlists
        </h3>
        <div className="flex justify-center items-center min-h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (recentPlaylists.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Recent Playlists
        </h3>
        <EmptyState
          title="No recent playlists"
          description="Start watching playlists to see them appear here."
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
        Recent Playlists ({recentPlaylists.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentPlaylists.map((playlist) => (
          <div key={playlist.id} className="flex">
            <PlayListCard playlist={playlist} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPlaylists;
