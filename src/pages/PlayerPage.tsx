// PlayerPage.tsx - Clean, Distraction-Free Study Experience
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
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
      if (event.target instanceof HTMLInputElement) return; // Don't trigger if typing in input

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
        case 'Escape':
          event.preventDefault();
          setShowPlaylist(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentVideoIndex, showPlaylist]);

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
        {/* Video Player - Maximum size for study focus */}
        <div className="w-full bg-black flex justify-center">
          <div className="w-full max-w-none">
            <YouTube
              videoId={selectedVideo || undefined}
              opts={{
                width: '100%',
                height:
                  typeof window !== 'undefined'
                    ? window.innerWidth > 1280
                      ? '900'
                      : window.innerWidth > 768
                      ? '720'
                      : '400'
                    : '900',
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  rel: 0,
                  showinfo: 0,
                  modestbranding: 1,
                  fs: 1,
                  iv_load_policy: 3,
                  disablekb: 0,
                  cc_load_policy: 1, // Enable captions for better learning
                  start: 0,
                },
              }}
              className="w-full"
              onEnd={goToNextVideo}
            />
          </div>
        </div>

        {/* Minimal Video Info Bar */}
        <div className="bg-gray-900 text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold truncate">
                {currentVideo?.title || 'Loading...'}
              </h1>
              <div className="flex items-center space-x-4 mt-1">
                <p className="text-sm text-gray-400">
                  {currentVideo?.channelTitle} • Video {currentVideoIndex + 1}{' '}
                  of {playlistData?.playlistItems?.length || 0}
                </p>
                <div className="text-xs text-blue-400">
                  {getProgressPercentage()}% Complete •{' '}
                  {formatWatchTime(watchTime)} watched
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Shortcuts: ← Previous | → Next | P Playlist | Esc Close
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-4 ml-4">
              <button
                onClick={goToPreviousVideo}
                disabled={currentVideoIndex === 0}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Previous Video"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={goToNextVideo}
                disabled={
                  !playlistData?.playlistItems ||
                  currentVideoIndex >= playlistData.playlistItems.length - 1
                }
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Next Video"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                title="Toggle Playlist"
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
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Playlist Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-900 border-l border-gray-700 transition-transform duration-300 z-50 ${
          showPlaylist
            ? 'transform translate-x-0'
            : 'transform translate-x-full'
        }`}
        style={{ width: '400px' }}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">Playlist</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={resetProgress}
                className="p-1 rounded text-red-400 hover:text-red-300 text-xs"
                title="Reset Progress"
              >
                Reset
              </button>
              <button
                onClick={() => setShowPlaylist(false)}
                className="p-1 rounded text-gray-400 hover:text-white"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {playlistData?.playlistTitle}
          </p>
          <div className="mt-2">
            <div className="bg-gray-800 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {getProgressPercentage()}% Complete • {formatWatchTime(watchTime)}{' '}
              total
            </p>
          </div>
        </div>

        <div className="h-full overflow-y-auto pb-20">
          {playlistData?.playlistItems?.map((item: any, index: number) => (
            <div
              key={item.id}
              onClick={() =>
                handleVideoClick(item.contentDetails.videoId, index)
              }
              className={`flex items-start space-x-3 p-3 cursor-pointer transition-colors border-b border-gray-800 hover:bg-gray-800 ${
                selectedVideo === item.contentDetails.videoId
                  ? 'bg-blue-900/30 border-blue-600'
                  : ''
              } ${index <= currentVideoIndex ? 'opacity-100' : 'opacity-70'}`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={item.thumbnail.url}
                  alt={item.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                  {index + 1}
                </div>
                {index < currentVideoIndex && (
                  <div className="absolute top-1 left-1 bg-green-600 text-white text-xs px-1 rounded">
                    ✓
                  </div>
                )}
                {index === currentVideoIndex && (
                  <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1 rounded">
                    ▶
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`text-sm font-medium line-clamp-2 leading-tight ${
                    selectedVideo === item.contentDetails.videoId
                      ? 'text-blue-400'
                      : 'text-white'
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  {item.channelTitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay when playlist is open on mobile */}
      {showPlaylist && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowPlaylist(false)}
        />
      )}
    </div>
  );
};

export default PlayerPage;
