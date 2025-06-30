import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Custom hooks with path aliases
import { useBookmarks } from '@/hooks/useBookmarks';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { usePlaybackSpeed } from '@/hooks/usePlaybackSpeed';
import { useStoreActions } from '@/hooks/useStore';
import { useVideoNavigation } from '@/hooks/useVideoNavigation';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer';

/**
 * Master hook that orchestrates all player functionality
 * Implements the Facade pattern to simplify complex subsystems
 */
export const usePlayerPage = () => {
  // Route params
  const { playlistId } = useParams<{ playlistId: string }>();

  // Store actions
  const getPlaylistById = useStoreActions(
    (actions) => actions.playlists.getPlaylistById
  );

  // Local state
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showBookmarkForm, setShowBookmarkForm] = useState(false);
  const [showBookmarkManager, setShowBookmarkManager] = useState(false);

  // Get playlist data
  const playlistData = getPlaylistById(playlistId);

  // Custom hooks
  const progressHook = useVideoProgress(playlistId);
  const {
    progress,
    loadProgress,
    saveProgress,
    resetProgress,
    getProgressPercentage,
  } = progressHook;

  // Extract progress values with defaults
  const currentVideoIndex = progress?.currentVideoIndex ?? 0;
  const watchTime = progress?.watchTime ?? 0;

  // Local state for video timing
  const [videoStartTime, setVideoStartTime] = useState(0);

  // Format watch time utility
  const formatWatchTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, []);

  const {
    youtubePlayerRef,
    currentVideoTime,
    videoDuration,
    onYouTubeReady,
    onYouTubeStateChange,
    seekToTime,
    getCurrentTime,
    setPlaybackRate,
    setCurrentVideoTime,
  } = useYouTubePlayer();

  const { videoBookmarks, playlistBookmarks, exportAsMarkdown, stats } =
    useBookmarks(selectedVideo || undefined, playlistId);

  const { currentSpeed, changeSpeed, increaseSpeed, decreaseSpeed } =
    usePlaybackSpeed(playlistId);

  // Video selection handler
  const handleVideoClick = useCallback(
    (videoId: string, index: number) => {
      // Calculate and save current video watch time before switching
      if (selectedVideo && progress) {
        const currentTime = Date.now();
        const sessionTime = Math.floor((currentTime - videoStartTime) / 1000);
        const totalWatchTime = progress.watchTime + sessionTime;

        // Save progress with updated watch time
        saveProgress(
          progress.currentVideoIndex,
          selectedVideo,
          totalWatchTime,
          playlistData?.playlistItems?.length || 0
        );
      }

      setSelectedVideo(videoId);
      setVideoStartTime(Date.now());

      // Save progress for new video
      saveProgress(index, videoId, 0, playlistData?.playlistItems?.length || 0);
    },
    [selectedVideo, progress, videoStartTime, saveProgress, playlistData]
  );

  // Video navigation
  const {
    goToNextVideo,
    goToPreviousVideo,
    canGoNext,
    canGoPrevious,
    getCurrentVideo,
  } = useVideoNavigation({
    currentVideoIndex,
    playlistData,
    onVideoClick: handleVideoClick,
  });

  // Bookmark handlers
  const handleCreateBookmark = useCallback(() => {
    if (!youtubePlayerRef.current) return;
    const currentTime = getCurrentTime();
    setCurrentVideoTime(currentTime);
    setShowBookmarkForm(true);
  }, [getCurrentTime, setCurrentVideoTime]);

  const handleJumpToTime = useCallback(
    (timestamp: number) => {
      seekToTime(timestamp);
      setShowBookmarkManager(false);
    },
    [seekToTime]
  );

  const handleExportBookmarks = useCallback(() => {
    try {
      exportAsMarkdown();
    } catch (error) {
      console.error('Export failed:', error);
    }
  }, [exportAsMarkdown]);

  const handleSpeedChange = useCallback(
    (speed: number) => {
      changeSpeed(speed);
      setPlaybackRate(speed);
    },
    [changeSpeed, setPlaybackRate]
  );

  // Enhanced YouTube event handlers
  const handleYouTubeReady = useCallback(
    (event: any) => {
      onYouTubeReady(event, currentSpeed);
    },
    [onYouTubeReady, currentSpeed]
  );

  // Modal control
  const closeAllModals = useCallback(() => {
    setShowPlaylist(false);
    setShowBookmarkManager(false);
    setShowBookmarkForm(false);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onPreviousVideo: goToPreviousVideo,
    onNextVideo: goToNextVideo,
    onTogglePlaylist: () => setShowPlaylist(!showPlaylist),
    onCreateBookmark: handleCreateBookmark,
    onToggleBookmarkManager: () => setShowBookmarkManager(!showBookmarkManager),
    onExportBookmarks: handleExportBookmarks,
    onDecreaseSpeed: decreaseSpeed,
    onIncreaseSpeed: increaseSpeed,
    onEscape: closeAllModals,
    currentSpeed,
    setPlaybackRate,
  });

  // Fetch playlist data effect
  useEffect(() => {
    const fetchPlaylist = async () => {
      if (playlistId) {
        await getPlaylistById(playlistId);
      }
    };
    fetchPlaylist();
  }, [getPlaylistById, playlistId]);

  // Load progress when playlist data is available
  useEffect(() => {
    if (playlistData?.playlistItems) {
      const savedProgress = loadProgress();

      // If no saved progress, start with first video
      if (!savedProgress) {
        const firstVideoId =
          playlistData.playlistItems[0]?.contentDetails.videoId;
        if (firstVideoId) {
          setSelectedVideo(firstVideoId);
          // Save initial progress
          saveProgress(0, firstVideoId, 0, playlistData.playlistItems.length);
        }
      } else {
        // Restore from saved progress
        const videoId =
          playlistData.playlistItems[savedProgress.currentVideoIndex]
            ?.contentDetails.videoId;
        if (videoId) {
          setSelectedVideo(videoId);
        }
      }
    }
  }, [playlistData, loadProgress, saveProgress]);

  // Track video start time
  useEffect(() => {
    if (selectedVideo) {
      setVideoStartTime(Date.now());
    }
  }, [selectedVideo]);

  // Auto-save progress periodically
  useEffect(() => {
    if (selectedVideo && playlistId && progress) {
      const currentTime = Date.now();
      const sessionTime = Math.floor((currentTime - videoStartTime) / 1000);
      const totalWatchTime = progress.watchTime + sessionTime;

      // Save progress every 5 seconds
      const interval = setInterval(() => {
        saveProgress(
          currentVideoIndex,
          selectedVideo,
          totalWatchTime,
          playlistData?.playlistItems?.length || 0
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [
    selectedVideo,
    currentVideoIndex,
    videoStartTime,
    progress,
    playlistId,
    saveProgress,
    playlistData,
  ]);

  return {
    // Basic state
    playlistId,
    playlistData,
    selectedVideo,
    currentVideoIndex,
    watchTime,

    // UI state
    showPlaylist,
    showBookmarkForm,
    showBookmarkManager,
    setShowPlaylist,
    setShowBookmarkForm,
    setShowBookmarkManager,

    // Video player
    youtubePlayerRef,
    currentVideoTime,
    videoDuration,
    handleYouTubeReady,
    onYouTubeStateChange,

    // Navigation
    goToNextVideo,
    goToPreviousVideo,
    canGoNext,
    canGoPrevious,
    getCurrentVideo,
    handleVideoClick,

    // Bookmarks
    videoBookmarks,
    playlistBookmarks,
    stats,
    handleCreateBookmark,
    handleJumpToTime,
    handleExportBookmarks,
    handleSaveBookmark: () => setShowBookmarkForm(false),
    handleCancelBookmark: () => setShowBookmarkForm(false),

    // Speed control
    currentSpeed,
    handleSpeedChange,

    // Progress
    getProgressPercentage,
    formatWatchTime,
    resetProgress,

    // Utilities
    closeAllModals,
  };
};
