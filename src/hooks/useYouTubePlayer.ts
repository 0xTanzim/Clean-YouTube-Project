import { useCallback, useRef, useState } from 'react';

// YouTube Player API types
interface YouTubePlayer {
  getCurrentTime(): number;
  getDuration(): number;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
  playVideo(): void;
  pauseVideo(): void;
  setPlaybackRate(suggestedRate: number): void;
  getPlaybackRate(): number;
  getPlayerState(): number;
}

interface YouTubeEvent {
  target: YouTubePlayer;
  data: number;
}

/**
 * Custom hook for YouTube player control and state management
 * Encapsulates all YouTube player interactions
 */
export const useYouTubePlayer = () => {
  const youtubePlayerRef = useRef<YouTubePlayer | null>(null);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const onYouTubeReady = useCallback(
    (event: YouTubeEvent, currentSpeed?: number) => {
      youtubePlayerRef.current = event.target;
      setVideoDuration(event.target.getDuration());

      // Apply saved playback speed
      if (currentSpeed && currentSpeed !== 1) {
        event.target.setPlaybackRate(currentSpeed);
      }
    },
    []
  );

  const onYouTubeStateChange = useCallback((event: YouTubeEvent) => {
    // Update current time when video is playing
    if (event.data === 1) {
      // Playing state
      const updateTime = () => {
        if (youtubePlayerRef.current) {
          setCurrentVideoTime(youtubePlayerRef.current.getCurrentTime());
          setVideoDuration(youtubePlayerRef.current.getDuration());
        }
      };

      const interval = setInterval(() => {
        if (
          youtubePlayerRef.current &&
          youtubePlayerRef.current.getPlayerState() === 1
        ) {
          updateTime();
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }
  }, []);

  const seekToTime = useCallback((timestamp: number) => {
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.seekTo(timestamp, true);
      youtubePlayerRef.current.playVideo();
    }
  }, []);

  const getCurrentTime = useCallback(() => {
    if (!youtubePlayerRef.current) return 0;
    return youtubePlayerRef.current.getCurrentTime();
  }, []);

  const setPlaybackRate = useCallback((speed: number) => {
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.setPlaybackRate(speed);
    }
  }, []);

  return {
    // Refs
    youtubePlayerRef,

    // State
    currentVideoTime,
    videoDuration,

    // Event handlers
    onYouTubeReady,
    onYouTubeStateChange,

    // Actions
    seekToTime,
    getCurrentTime,
    setPlaybackRate,

    // State setters (for external control)
    setCurrentVideoTime,
    setVideoDuration,
  };
};
