import BookmarkForm from '@/components/bookmarks/BookmarkForm';
import BookmarkManager from '@/components/bookmarks/BookmarkManager';
import {
  PlaylistSidebar,
  VideoInfoBar,
  VideoPlayer,
} from '@/components/player-controls';
import { usePlayerContext } from '@/contexts/PlayerContext';
import type { ReactNode } from 'react';

// Base PlayerLayout component
interface PlayerLayoutProps {
  children: ReactNode;
}

const PlayerLayout = ({ children }: PlayerLayoutProps) => (
  <div className="min-h-screen bg-black">{children}</div>
);

// Video Section Component
const VideoSection = () => {
  const {
    selectedVideo,
    handleYouTubeReady,
    onYouTubeStateChange,
    goToNextVideo,
    currentVideoIndex,
    playlistData,
    getProgressPercentage,
    watchTime,
    currentSpeed,
    videoBookmarks,
    videoDuration,
    currentVideoTime,
    handleCreateBookmark,
    showBookmarkManager,
    setShowBookmarkManager,
    handleExportBookmarks,
    goToPreviousVideo,
    showPlaylist,
    setShowPlaylist,
    handleSpeedChange,
    handleJumpToTime,
    playlistBookmarks,
    formatWatchTime,
    getCurrentVideo,
  } = usePlayerContext();

  const currentVideo = getCurrentVideo();

  return (
    <div className="relative">
      <VideoPlayer
        videoId={selectedVideo}
        onReady={handleYouTubeReady}
        onStateChange={onYouTubeStateChange}
        onEnd={goToNextVideo}
      />

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
  );
};

// Sidebar Section Component
const SidebarSection = () => {
  const {
    showPlaylist,
    playlistData,
    selectedVideo,
    currentVideoIndex,
    getProgressPercentage,
    watchTime,
    handleVideoClick,
    resetProgress,
    setShowPlaylist,
    formatWatchTime,
  } = usePlayerContext();

  return (
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
  );
};

// Bookmark Modal Section Component
const BookmarkSection = () => {
  const {
    showBookmarkManager,
    setShowBookmarkManager,
    videoBookmarks,
    handleJumpToTime,
    handleExportBookmarks,
    stats,
    showBookmarkForm,
    selectedVideo,
    playlistData,
    currentVideoTime,
    handleSaveBookmark,
    handleCancelBookmark,
    getCurrentVideo,
  } = usePlayerContext();

  const currentVideo = getCurrentVideo();

  return (
    <>
      {/* Bookmark Manager Modal */}
      {showBookmarkManager && (
        <>
          <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 border-l border-gray-200 dark:border-gray-700">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Video Bookmarks
                </h2>
                <button
                  onClick={() => setShowBookmarkManager(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Close bookmark manager"
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

          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowBookmarkManager(false)}
            aria-hidden="true"
          />
        </>
      )}

      {/* Bookmark Form Modal */}
      {showBookmarkForm && selectedVideo && currentVideo && (
        <BookmarkForm
          videoId={selectedVideo}
          playlistId={playlistData?.id || ''}
          currentTime={currentVideoTime}
          videoTitle={currentVideo.title}
          onSave={handleSaveBookmark}
          onCancel={handleCancelBookmark}
        />
      )}
    </>
  );
};

// Compound component structure
export const Player = {
  Layout: PlayerLayout,
  VideoSection,
  SidebarSection,
  BookmarkSection,
};
