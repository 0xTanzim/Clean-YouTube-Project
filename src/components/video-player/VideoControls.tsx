import React from 'react';
import PlaybackSpeedControl from '../video-controls/PlaybackSpeedControl';

interface VideoControlsProps {
  // Navigation
  onPreviousVideo: () => void;
  onNextVideo: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;

  // Playlist
  onTogglePlaylist: () => void;
  showPlaylist: boolean;

  // Bookmarks
  onCreateBookmark: () => void;
  onToggleBookmarkManager: () => void;
  showBookmarkManager: boolean;
  bookmarkCount: number;
  onExportBookmarks: () => void;
  hasBookmarks: boolean;

  // Speed Control
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;

  // General
  isVideoSelected: boolean;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  onPreviousVideo,
  onNextVideo,
  canGoPrevious,
  canGoNext,
  onTogglePlaylist,
  showPlaylist,
  onCreateBookmark,
  onToggleBookmarkManager,
  showBookmarkManager,
  bookmarkCount,
  onExportBookmarks,
  hasBookmarks,
  currentSpeed,
  onSpeedChange,
  isVideoSelected,
}) => {
  return (
    <div className="flex items-center space-x-4 ml-4">
      {/* Bookmark Controls */}
      <div className="flex items-center space-x-2 border-r border-gray-700 pr-4">
        <button
          onClick={onCreateBookmark}
          disabled={!isVideoSelected}
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
          onClick={onToggleBookmarkManager}
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
          {bookmarkCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {bookmarkCount}
            </span>
          )}
        </button>

        {hasBookmarks && (
          <button
            onClick={onExportBookmarks}
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

      {/* Playback Speed Control */}
      <PlaybackSpeedControl
        currentSpeed={currentSpeed}
        onSpeedChange={onSpeedChange}
      />

      {/* Navigation Controls */}
      <div className="flex items-center space-x-2 border-l border-gray-700 pl-4">
        <button
          onClick={onPreviousVideo}
          disabled={!canGoPrevious}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Previous Video (←)"
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
          onClick={onNextVideo}
          disabled={!canGoNext}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Next Video (→)"
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
          onClick={onTogglePlaylist}
          className={`p-2 rounded-lg transition-colors ${
            showPlaylist
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
          title="Toggle Playlist (P)"
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
  );
};

export default VideoControls;
