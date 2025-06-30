import React from 'react';

interface VideoControlsProps {
  onPreviousVideo: () => void;
  onNextVideo: () => void;
  onTogglePlaylist: () => void;
  onCreateBookmark: () => void;
  onToggleBookmarkManager: () => void;
  onExportBookmarks: () => void;
  currentVideoIndex: number;
  totalVideos: number;
  hasBookmarks: boolean;
  showBookmarkManager: boolean;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  onPreviousVideo,
  onNextVideo,
  onTogglePlaylist,
  onCreateBookmark,
  onToggleBookmarkManager,
  onExportBookmarks,
  currentVideoIndex,
  totalVideos,
  hasBookmarks,
  showBookmarkManager,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Navigation Controls */}
      <button
        onClick={onPreviousVideo}
        disabled={currentVideoIndex === 0}
        className="p-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous video"
      >
        ⏮
      </button>

      <button
        onClick={onNextVideo}
        disabled={currentVideoIndex >= totalVideos - 1}
        className="p-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next video"
      >
        ⏭
      </button>

      {/* Playlist Toggle */}
      <button
        onClick={onTogglePlaylist}
        className="p-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
        aria-label="Toggle playlist"
      >
        📋
      </button>

      {/* Bookmark Controls */}
      <button
        onClick={onCreateBookmark}
        className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
        aria-label="Create bookmark"
      >
        🔖
      </button>

      <button
        onClick={onToggleBookmarkManager}
        className={`p-2 text-white rounded-lg transition-colors ${
          showBookmarkManager
            ? 'bg-green-600 hover:bg-green-500'
            : 'bg-gray-700 hover:bg-gray-600'
        }`}
        aria-label="Toggle bookmark manager"
      >
        📚
      </button>

      {hasBookmarks && (
        <button
          onClick={onExportBookmarks}
          className="p-2 text-white bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors"
          aria-label="Export bookmarks"
        >
          📤
        </button>
      )}
    </div>
  );
};

export default VideoControls;
