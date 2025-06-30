// PlayerPage.tsx - Clean, Distraction-Free Study Experience
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookmarkForm from '../components/bookmarks/BookmarkForm';
import BookmarkManager from '../components/bookmarks/BookmarkManager';
import {
  PlaylistSidebar,
  VideoInfoBar,
  VideoPlayer,
} from '../components/player-controls';
import { useBookmarks } from '../hooks/useBookmarks';
import { usePlaybackSpeed } from '../hooks/usePlaybackSpeed';
import { useStoreActions } from '../hooks/useStore';
import type { VideoProgress } from '../types';

const PlayerPage = () => {
  const getPlaylistById = useStoreActions(
    (actions) => actions.playlists.getPlaylistById
  );
  const { playlistId } = useParams<{ playlistId: string }>();
  const playlistData = getPlaylistById(playlistId);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [watchTime, setWatchTime] = useState(0);
  const [videoStartTime, setVideoStartTime] = useState(0);

  // Bookmark state
  const [showBookmarkForm, setShowBookmarkForm] = useState(false);
  const [showBookmarkManager, setShowBookmarkManager] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const youtubePlayerRef = useRef<any>(null);

  // Initialize bookmarks hook
  const { videoBookmarks, playlistBookmarks, exportAsMarkdown, stats } =
    useBookmarks(selectedVideo || undefined, playlistId);

  // Initialize playback speed hook
  const { currentSpeed, changeSpeed, increaseSpeed, decreaseSpeed } =
    usePlaybackSpeed(playlistId);

  // Load progress from localStorage
  const loadProgress = useCallback(() => {
    if (!playlistId) return;

    const savedProgress = localStorage.getItem(`video_progress_${playlistId}`);
    if (savedProgress) {
      try {
        const progress: VideoProgress = JSON.parse(savedProgress);
        setCurrentVideoIndex(progress.currentVideoIndex);
        setWatchTime(progress.watchTime);

        // Set the video from saved progress
        if (
          playlistData?.playlistItems &&
          progress.currentVideoIndex < playlistData.playlistItems.length
        ) {
          const videoId =
            playlistData.playlistItems[progress.currentVideoIndex]
              ?.contentDetails.videoId;
          if (videoId) {
            setSelectedVideo(videoId);
          }
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, [playlistId, playlistData]);

  // Save progress to localStorage
  const saveProgress = useCallback(
    (videoIndex: number, videoId: string, currentWatchTime: number) => {
      if (!playlistId) return;

      const progress: VideoProgress = {
        playlistId,
        currentVideoIndex: videoIndex,
        currentVideoId: videoId,
        watchTime: currentWatchTime,
        lastWatched: Date.now(),
        totalVideos: playlistData?.playlistItems?.length || 0,
      };

      localStorage.setItem(
        `video_progress_${playlistId}`,
        JSON.stringify(progress)
      );
    },
    [playlistId, playlistData]
  );

  useEffect(() => {
    const fetchPlaylist = async () => {
      await getPlaylistById(playlistId);
    };
    fetchPlaylist();
  }, [getPlaylistById, playlistId]);

  // Load progress when playlist data is available
  useEffect(() => {
    if (playlistData?.playlistItems) {
      loadProgress();

      // If no saved progress, start with first video
      if (!localStorage.getItem(`video_progress_${playlistId}`)) {
        setSelectedVideo(
          playlistData.playlistItems[0]?.contentDetails.videoId || null
        );
        setCurrentVideoIndex(0);
      }
    }
  }, [playlistData, loadProgress, playlistId]);

  // Track video start time
  useEffect(() => {
    setVideoStartTime(Date.now());
  }, [selectedVideo]);

  // Save progress periodically and when video changes
  useEffect(() => {
    if (selectedVideo && playlistId) {
      const currentTime = Date.now();
      const sessionTime = Math.floor((currentTime - videoStartTime) / 1000);
      const totalWatchTime = watchTime + sessionTime;

      saveProgress(currentVideoIndex, selectedVideo, totalWatchTime);
    }
  }, [
    selectedVideo,
    currentVideoIndex,
    saveProgress,
    videoStartTime,
    watchTime,
    playlistId,
  ]);

  // Function to handle video selection
  const handleVideoClick = (videoId: string, index: number) => {
    // Save current video watch time before switching
    if (selectedVideo) {
      const currentTime = Date.now();
      const sessionTime = Math.floor((currentTime - videoStartTime) / 1000);
      const totalWatchTime = watchTime + sessionTime;
      setWatchTime(totalWatchTime);
    }

    setSelectedVideo(videoId);
    setCurrentVideoIndex(index);
    setVideoStartTime(Date.now());

    // Save progress immediately
    saveProgress(index, videoId, watchTime);
  };

  // Bookmark handlers
  const handleCreateBookmark = () => {
    if (!youtubePlayerRef.current) return;

    const currentTime = youtubePlayerRef.current.getCurrentTime();
    setCurrentVideoTime(currentTime);
    setShowBookmarkForm(true);
  };

  const handleSaveBookmark = () => {
    setShowBookmarkForm(false);
    // Bookmark is automatically saved via the form component
  };

  const handleCancelBookmark = () => {
    setShowBookmarkForm(false);
  };

  const handleJumpToTime = (timestamp: number) => {
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.seekTo(timestamp, true);
      youtubePlayerRef.current.playVideo();
    }
    setShowBookmarkManager(false);
  };

  const handleExportBookmarks = () => {
    try {
      exportAsMarkdown();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const onYouTubeReady = (event: any) => {
    youtubePlayerRef.current = event.target;
    setVideoDuration(event.target.getDuration());
    // Apply saved playback speed
    if (currentSpeed !== 1) {
      event.target.setPlaybackRate(currentSpeed);
    }
  };

  const onYouTubeStateChange = (event: any) => {
    // Update current time when video is playing
    if (event.data === 1) {
      // Playing
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
  };

  // Handle speed change
  const handleSpeedChange = (speed: number) => {
    changeSpeed(speed);
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.setPlaybackRate(speed);
    }
  };

  // Navigation functions
  const goToNextVideo = () => {
    if (
      playlistData?.playlistItems &&
      currentVideoIndex < playlistData.playlistItems.length - 1
    ) {
      const nextIndex = currentVideoIndex + 1;
      const nextVideo = playlistData.playlistItems[nextIndex];
      handleVideoClick(nextVideo.contentDetails.videoId, nextIndex);
    }
  };

  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      const prevIndex = currentVideoIndex - 1;
      const prevVideo = playlistData.playlistItems[prevIndex];
      handleVideoClick(prevVideo.contentDetails.videoId, prevIndex);
    }
  };

  // Keyboard navigation for better study experience
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      )
        return; // Don't trigger if typing in input

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPreviousVideo();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNextVideo();
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          setShowPlaylist(!showPlaylist);
          break;
        case 'b':
        case 'B':
          event.preventDefault();
          handleCreateBookmark();
          break;
        case 'm':
        case 'M':
          event.preventDefault();
          setShowBookmarkManager(!showBookmarkManager);
          break;
        case 'e':
        case 'E':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            handleExportBookmarks();
          }
          break;
        case '<':
          if (event.shiftKey) {
            event.preventDefault();
            decreaseSpeed();
            // Apply the new speed to the player if available
            if (youtubePlayerRef.current) {
              const newSpeed = currentSpeed;
              youtubePlayerRef.current.setPlaybackRate(newSpeed);
            }
          }
          break;
        case '>':
          if (event.shiftKey) {
            event.preventDefault();
            increaseSpeed();
            // Apply the new speed to the player if available
            if (youtubePlayerRef.current) {
              const newSpeed = currentSpeed;
              youtubePlayerRef.current.setPlaybackRate(newSpeed);
            }
          }
          break;
        case 'Escape':
          event.preventDefault();
          setShowPlaylist(false);
          setShowBookmarkManager(false);
          setShowBookmarkForm(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    currentVideoIndex,
    showPlaylist,
    showBookmarkManager,
    showBookmarkForm,
    currentSpeed,
    increaseSpeed,
    decreaseSpeed,
    goToPreviousVideo,
    goToNextVideo,
    handleCreateBookmark,
    handleExportBookmarks,
  ]);

  const getCurrentVideo = () => {
    if (!playlistData?.playlistItems || !selectedVideo) return null;
    return playlistData.playlistItems.find(
      (item: any) => item.contentDetails.videoId === selectedVideo
    );
  };

  // Format watch time for display
  const formatWatchTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Calculate total progress
  const getProgressPercentage = () => {
    if (!playlistData?.playlistItems) return 0;
    return Math.round(
      (currentVideoIndex / playlistData.playlistItems.length) * 100
    );
  };

  // Reset progress function
  const resetProgress = () => {
    if (!playlistId) return;
    localStorage.removeItem(`video_progress_${playlistId}`);
    setCurrentVideoIndex(0);
    setWatchTime(0);
    if (playlistData?.playlistItems) {
      setSelectedVideo(
        playlistData.playlistItems[0]?.contentDetails.videoId || null
      );
    }
    setVideoStartTime(Date.now());
  };

  const currentVideo = getCurrentVideo();

  return (
    <div className="min-h-screen bg-black">
      {/* Full-screen video player container */}
      <div className="relative">
        {/* Video Player */}
        <VideoPlayer
          videoId={selectedVideo}
          onReady={onYouTubeReady}
          onStateChange={onYouTubeStateChange}
          onEnd={goToNextVideo}
        />

        {/* Video Info Bar */}
        <VideoInfoBar
          currentVideo={currentVideo}
          currentVideoIndex={currentVideoIndex}
          totalVideos={playlistData?.playlistItems?.length || 0}
          progressPercentage={getProgressPercentage()}
          watchTime={watchTime}
          currentSpeed={currentSpeed}
          videoBookmarks={videoBookmarks}
          videoDuration={videoDuration}
          currentVideoTime={currentVideoTime}
          onCreateBookmark={handleCreateBookmark}
          onToggleBookmarkManager={() =>
            setShowBookmarkManager(!showBookmarkManager)
          }
          onExportBookmarks={handleExportBookmarks}
          onPreviousVideo={goToPreviousVideo}
          onNextVideo={goToNextVideo}
          onTogglePlaylist={() => setShowPlaylist(!showPlaylist)}
          onSpeedChange={handleSpeedChange}
          onJumpToTime={handleJumpToTime}
          showBookmarkManager={showBookmarkManager}
          hasPlaylistBookmarks={playlistBookmarks.length > 0}
          formatWatchTime={formatWatchTime}
        />
      </div>

      {/* Playlist Sidebar */}
      <PlaylistSidebar
        showPlaylist={showPlaylist}
        playlistData={playlistData}
        selectedVideo={selectedVideo}
        currentVideoIndex={currentVideoIndex}
        progressPercentage={getProgressPercentage()}
        watchTime={watchTime}
        onVideoClick={handleVideoClick}
        onResetProgress={resetProgress}
        onClose={() => setShowPlaylist(false)}
        formatWatchTime={formatWatchTime}
      />

      {/* Bookmark Manager Sidebar */}
      {showBookmarkManager && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 border-l border-gray-200 dark:border-gray-700">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Video Bookmarks
              </h2>
              <button
                onClick={() => setShowBookmarkManager(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <BookmarkManager
                bookmarks={videoBookmarks}
                onJumpToTime={handleJumpToTime}
                onExportMarkdown={handleExportBookmarks}
                className="h-full p-4"
              />
            </div>

            {/* Stats footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>
                  📊 <strong>{stats.totalBookmarks}</strong> bookmarks in this
                  video
                </p>
                <p>
                  📚 <strong>{stats.totalPlaylistBookmarks}</strong> total in
                  playlist
                </p>
                {stats.uniqueTags.length > 0 && (
                  <p>
                    🏷️ <strong>{stats.uniqueTags.length}</strong> unique tags
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bookmark Manager Overlay */}
      {showBookmarkManager && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowBookmarkManager(false)}
        />
      )}

      {/* Bookmark Form Modal */}
      {showBookmarkForm && selectedVideo && currentVideo && (
        <BookmarkForm
          videoId={selectedVideo}
          playlistId={playlistId || ''}
          currentTime={currentVideoTime}
          videoTitle={currentVideo.title}
          onSave={handleSaveBookmark}
          onCancel={handleCancelBookmark}
        />
      )}
    </div>
  );
};

export default PlayerPage;
