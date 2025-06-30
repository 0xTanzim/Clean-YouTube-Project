import { PlayArrow, Star, StarBorder } from '@mui/icons-material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecent } from '@/hooks/useRecent';
import { truncateText } from '@/lib/utils';
import type { PlayListCardProps } from '@/types';

const PlayListCard = ({ playlist }: PlayListCardProps) => {
  const { playlistThumbnails, playlistTitle, channelTitle, playlistId } =
    playlist;
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToRecent } = useRecent();
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);

  const handleFavoriteToggle = async () => {
    if (isUpdatingFavorite) return;

    setIsUpdatingFavorite(true);
    try {
      await toggleFavorite(playlistId);
    } catch (error) {
      console.error('Error updating favorite:', error);
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

  const handlePlaylistClick = () => {
    addToRecent(playlistId);
  };

  const isPlaylistFavorite = isFavorite(playlistId);
  const truncatedTitle = truncateText(playlistTitle, 50);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={playlistThumbnails.url}
          alt={playlistTitle}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          {truncatedTitle}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {channelTitle}
        </p>

        <div className="flex items-center justify-between">
          <Link
            to={`/player/${playlistId}`}
            onClick={handlePlaylistClick}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`Start tutorial for ${playlistTitle}`}
          >
            <PlayArrow className="text-lg" />
            <span className="text-sm font-medium">START TUTORIAL</span>
          </Link>

          <button
            onClick={handleFavoriteToggle}
            disabled={isUpdatingFavorite}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
            title={
              isPlaylistFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            aria-label={
              isPlaylistFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            {isPlaylistFavorite ? (
              <Star className="text-yellow-500" />
            ) : (
              <StarBorder />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Performance optimization: memo wrapper for PlayListCard
export default React.memo(PlayListCard);
