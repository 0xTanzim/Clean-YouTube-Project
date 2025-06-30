import BookmarkForm from '@/components/bookmarks/BookmarkForm';
import { BookmarkManager } from '@/components/bookmarks/manager';
import { PlaylistSidebar, VideoPlayer } from '@/components/player-controls';
import { VideoInfoBar } from '@/components/video-info';
import { usePlayerPage } from '@/hooks/usePlayerPage';

/**
 * PlayerPage - Clean, Distraction-Free Study Experience
 *
 * Fully refactored using clean architecture patterns:
 * - Single Responsibility Principle
 * - Composition over inheritance
 * - Custom hooks for logic separation
 * - Compound components for UI organization
 * - Performance optimizations
 */
const PlayerPage = () => {
  // All logic is encapsulated in the custom hook (Facade pattern)
  const {
    // Basic state
    playlistData,
    selectedVideo,
    currentVideoIndex,
    watchTime,

    // UI state
    showPlaylist,
    showBookmarkForm,
    showBookmarkManager,
    setShowPlaylist,
    setShowBookmarkManager,

    // Video player
    currentVideoTime,
    videoDuration,
    handleYouTubeReady,
    onYouTubeStateChange,

    // Navigation
    goToNextVideo,
    goToPreviousVideo,
    getCurrentVideo,
    handleVideoClick,

    // Bookmarks
    videoBookmarks,
    playlistBookmarks,
    stats,
    handleCreateBookmark,
    handleJumpToTime,
    handleExportBookmarks,
    handleSaveBookmark,
    handleCancelBookmark,

    // Speed control
    currentSpeed,
    handleSpeedChange,

    // Progress
    getProgressPercentage,
    formatWatchTime,
    resetProgress,
  } = usePlayerPage();

  const currentVideo = getCurrentVideo();
  return (
    <div className="h-screen w-full bg-black overflow-hidden">
      {/* Main Content Area */}
      <div className="relative h-full w-full">
        {/* Video Player Section - Full Height */}
        <div className="absolute inset-0">
          <VideoPlayer
            videoId={selectedVideo}
            onReady={handleYouTubeReady}
            onStateChange={onYouTubeStateChange}
            onEnd={goToNextVideo}
            onPrevious={goToPreviousVideo}
            onNext={goToNextVideo}
            hasNext={
              currentVideoIndex < (playlistData?.playlistItems?.length || 0) - 1
            }
            hasPrevious={currentVideoIndex > 0}
            className="h-full w-full"
          />
        </div>

        {/* Video Info Overlay - Fixed Position */}
        <div className="absolute inset-x-0 bottom-0 z-20">
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

        {/* Playlist Sidebar - Fixed Position */}
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

        {/* Bookmark Manager Sidebar - Fixed Position */}
        {showBookmarkManager && (
          <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 border-l border-gray-200 dark:border-gray-700">
            <BookmarkManager
              bookmarks={videoBookmarks}
              onJumpToTime={handleJumpToTime}
              onExportMarkdown={handleExportBookmarks}
              onClose={() => setShowBookmarkManager(false)}
            />

            {/* Bookmark Stats */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
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
        )}

        {/* Modal Overlays */}
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
            playlistId={playlistData?.id || ''}
            currentTime={currentVideoTime}
            videoTitle={currentVideo.snippet.title}
            onSave={handleSaveBookmark}
            onCancel={handleCancelBookmark}
          />
        )}
      </div>
    </div>
  );
};

export default PlayerPage;
