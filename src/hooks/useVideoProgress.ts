import { videoProgressUtils } from '@/lib/utils';
import type { VideoProgress } from '@/types';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook for managing video progress tracking
 */
export const useVideoProgress = (playlistId: string | undefined) => {
  const [progress, setProgress] = useState<VideoProgress | null>(null);

  const loadProgress = useCallback(() => {
    if (!playlistId) return null;

    const savedProgress = videoProgressUtils.load(playlistId);
    setProgress(savedProgress);
    return savedProgress;
  }, [playlistId]);

  const saveProgress = useCallback(
    (
      videoIndex: number,
      videoId: string,
      watchTime: number,
      totalVideos: number
    ) => {
      if (!playlistId) return;

      const newProgress: VideoProgress = {
        playlistId,
        currentVideoIndex: videoIndex,
        currentVideoId: videoId,
        watchTime,
        lastWatched: Date.now(),
        totalVideos,
      };

      videoProgressUtils.save(newProgress);
      setProgress(newProgress);
    },
    [playlistId]
  );

  const resetProgress = useCallback(() => {
    if (!playlistId) return;

    videoProgressUtils.remove(playlistId);
    setProgress(null);
  }, [playlistId]);

  const getProgressPercentage = useCallback(() => {
    if (!progress || progress.totalVideos === 0) return 0;
    return Math.round(
      (progress.currentVideoIndex / progress.totalVideos) * 100
    );
  }, [progress]);

  // Load progress on mount
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return {
    progress,
    loadProgress,
    saveProgress,
    resetProgress,
    getProgressPercentage,
  };
};
