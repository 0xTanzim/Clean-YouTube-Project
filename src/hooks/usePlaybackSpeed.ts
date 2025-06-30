import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants';

/**
 * Hook for managing video playback speed with playlist-specific persistence
 */
export const usePlaybackSpeed = (playlistId?: string) => {
  const [currentSpeed, setCurrentSpeed] = useState(1);

  // Load saved speed for current playlist
  const loadSpeed = useCallback(() => {
    if (!playlistId) return 1;

    try {
      const savedSpeeds = localStorage.getItem(STORAGE_KEYS.PLAYBACK_SPEED);
      if (savedSpeeds) {
        const speedData = JSON.parse(savedSpeeds);
        return speedData[playlistId] || 1;
      }
    } catch (error) {
      console.error('Error loading playback speed:', error);
    }

    return 1;
  }, [playlistId]);

  // Save speed for current playlist
  const saveSpeed = useCallback(
    (speed: number) => {
      if (!playlistId) return;

      try {
        const savedSpeeds = localStorage.getItem(STORAGE_KEYS.PLAYBACK_SPEED);
        const speedData = savedSpeeds ? JSON.parse(savedSpeeds) : {};

        speedData[playlistId] = speed;
        localStorage.setItem(
          STORAGE_KEYS.PLAYBACK_SPEED,
          JSON.stringify(speedData)
        );
      } catch (error) {
        console.error('Error saving playback speed:', error);
      }
    },
    [playlistId]
  );

  // Change speed and persist it
  const changeSpeed = useCallback(
    (speed: number) => {
      setCurrentSpeed(speed);
      saveSpeed(speed);
    },
    [saveSpeed]
  );

  // Increase speed (with keyboard shortcuts)
  const increaseSpeed = useCallback(() => {
    const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const currentIndex = speeds.indexOf(currentSpeed);
    const nextIndex = Math.min(currentIndex + 1, speeds.length - 1);
    changeSpeed(speeds[nextIndex]);
  }, [currentSpeed, changeSpeed]);

  // Decrease speed (with keyboard shortcuts)
  const decreaseSpeed = useCallback(() => {
    const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const currentIndex = speeds.indexOf(currentSpeed);
    const prevIndex = Math.max(currentIndex - 1, 0);
    changeSpeed(speeds[prevIndex]);
  }, [currentSpeed, changeSpeed]);

  // Reset to normal speed
  const resetSpeed = useCallback(() => {
    changeSpeed(1);
  }, [changeSpeed]);

  // Load speed on mount or playlist change
  useEffect(() => {
    const speed = loadSpeed();
    setCurrentSpeed(speed);
  }, [loadSpeed]);

  // Get speed description for accessibility
  const getSpeedDescription = useCallback(() => {
    if (currentSpeed < 1) return `Slow speed: ${currentSpeed}x`;
    if (currentSpeed > 1) return `Fast speed: ${currentSpeed}x`;
    return 'Normal speed';
  }, [currentSpeed]);

  return {
    currentSpeed,
    changeSpeed,
    increaseSpeed,
    decreaseSpeed,
    resetSpeed,
    getSpeedDescription,
  };
};
