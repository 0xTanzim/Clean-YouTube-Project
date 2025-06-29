import PlayListCard from '../components/playlist-card-itms';
import {
  EmptyState,
  ErrorMessage,
  LoadingSpinner,
} from '../components/ui/Feedback';
import { usePlaylists } from '../hooks/usePlaylists';

const HomePage = () => {
  const { playlists, isLoading, error } = usePlaylists();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (playlists.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <EmptyState
          title="No playlists found"
          description="Add your first playlist to get started with your learning journey."
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
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
        All Playlists ({playlists.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist, index) => (
          <div key={playlist.playlistId || index} className="flex">
            <PlayListCard playlist={playlist} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
