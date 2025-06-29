// PlayerPage.tsx - Clean, Distraction-Free Study Experience
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import BookmarkForm from '../components/bookmarks/BookmarkForm';
import BookmarkManager from '../components/bookmarks/BookmarkManager';
import VideoBookmarkTimeline from '../components/bookmarks/VideoBookmarkTimeline';
import { useBookmarks } from '../hooks/useBookmarks';
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
              onReady={onYouTubeReady}
              onStateChange={onYouTubeStateChange}
              className="w-full"
              onEnd={goToNextVideo}
            />
          </div>
        </div>

        {/* Minimal Video Info Bar */}
        <div className="bg-gray-900 text-white p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
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
                  Shortcuts: ← Previous | → Next | P Playlist | B Bookmark | M
                  Manager | Ctrl+E Export | Esc Close
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center space-x-4 ml-4">
                {/* Bookmark Controls */}
                <div className="flex items-center space-x-2 border-r border-gray-700 pr-4">
                  <button
                    onClick={handleCreateBookmark}
                    disabled={!selectedVideo}
                    className="p-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Add Bookmark (B)"
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
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => setShowBookmarkManager(!showBookmarkManager)}
                    className={`p-2 rounded-lg transition-colors relative ${
                      showBookmarkManager
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    title="Bookmark Manager (M)"
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    {videoBookmarks.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {videoBookmarks.length}
                      </span>
                    )}
                  </button>

                  {playlistBookmarks.length > 0 && (
                    <button
                      onClick={handleExportBookmarks}
                      className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors"
                      title="Export Bookmarks (Ctrl+E)"
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
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

              {/* Video Bookmark Timeline */}
              {videoBookmarks.length > 0 && videoDuration > 0 && (
                <div className="mt-4">
                  <VideoBookmarkTimeline
                    bookmarks={videoBookmarks}
                    videoDuration={videoDuration}
                    currentTime={currentVideoTime}
                    onJumpToTime={handleJumpToTime}
                  />
                </div>
              )}
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
