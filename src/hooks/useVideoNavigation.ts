import { useCallback } from 'react';

interface UseVideoNavigationProps {
  currentVideoIndex: number;
  playlistData?: any;
  onVideoClick: (videoId: string, index: number) => void;
}

/**
 * Custom hook for video navigation logic
 * Encapsulates next/previous video logic
 */
export const useVideoNavigation = ({
  currentVideoIndex,
  playlistData,
  onVideoClick,
}: UseVideoNavigationProps) => {
  const goToNextVideo = useCallback(() => {
    if (
      playlistData?.playlistItems &&
      currentVideoIndex < playlistData.playlistItems.length - 1
    ) {
      const nextIndex = currentVideoIndex + 1;
      const nextVideo = playlistData.playlistItems[nextIndex];
      onVideoClick(nextVideo.contentDetails.videoId, nextIndex);
    }
  }, [currentVideoIndex, playlistData, onVideoClick]);

  const goToPreviousVideo = useCallback(() => {
    if (currentVideoIndex > 0) {
      const prevIndex = currentVideoIndex - 1;
      const prevVideo = playlistData.playlistItems[prevIndex];
      onVideoClick(prevVideo.contentDetails.videoId, prevIndex);
    }
  }, [currentVideoIndex, playlistData, onVideoClick]);

  const canGoNext = useCallback(() => {
    return (
      playlistData?.playlistItems &&
      currentVideoIndex < playlistData.playlistItems.length - 1
    );
  }, [currentVideoIndex, playlistData]);

  const canGoPrevious = useCallback(() => {
    return currentVideoIndex > 0;
  }, [currentVideoIndex]);

  const getCurrentVideo = useCallback(() => {
    if (!playlistData?.playlistItems) return null;
    return playlistData.playlistItems[currentVideoIndex];
  }, [playlistData, currentVideoIndex]);

  return {
    // Navigation actions
    goToNextVideo,
    goToPreviousVideo,

    // Navigation state
    canGoNext: canGoNext(),
    canGoPrevious: canGoPrevious(),

    // Current video info
    getCurrentVideo,
  };
};
