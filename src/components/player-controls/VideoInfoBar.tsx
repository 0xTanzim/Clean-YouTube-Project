import type { VideoBookmark } from '@/types';
import React from 'react';
import VideoBookmarkTimeline from '../bookmarks/VideoBookmarkTimeline';
import PlaybackSpeedControl from './PlaybackSpeedControl';

interface VideoInfoBarProps {
  currentVideo: any;
  currentVideoIndex: number;
  totalVideos: number;
  progressPercentage: number;
  watchTime: number;
  currentSpeed: number;
  videoBookmarks: VideoBookmark[];
  videoDuration: number;
  currentVideoTime: number;

  // Event handlers
  onCreateBookmark: () => void;
  onToggleBookmarkManager: () => void;
  onExportBookmarks: () => void;
  onPreviousVideo: () => void;
  onNextVideo: () => void;
  onTogglePlaylist: () => void;
  onSpeedChange: (speed: number) => void;
  onJumpToTime: (timestamp: number) => void;

  // State
  showBookmarkManager: boolean;
  hasPlaylistBookmarks: boolean;

  // Utils
  formatWatchTime: (seconds: number) => string;
}

const VideoInfoBar: React.FC<VideoInfoBarProps> = ({
  currentVideo,
  currentVideoIndex,
  totalVideos,
  progressPercentage,
  watchTime,
  currentSpeed,
  videoBookmarks,
  videoDuration,
  currentVideoTime,
  onCreateBookmark,
  onToggleBookmarkManager,
  onExportBookmarks,
  onPreviousVideo,
  onNextVideo,
  onTogglePlaylist,
  onSpeedChange,
  onJumpToTime,
  showBookmarkManager,
  hasPlaylistBookmarks,
  formatWatchTime,
}) => {
  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate">
              {currentVideo?.title || 'Loading...'}
            </h1>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-sm text-gray-400">
                {currentVideo?.channelTitle} • Video {currentVideoIndex + 1} of{' '}
                {totalVideos}
              </p>
              <div className="text-xs text-blue-400">
                {progressPercentage}% Complete • {formatWatchTime(watchTime)}{' '}
                watched
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Shortcuts: ← Previous | → Next | P Playlist | B Bookmark | M
              Manager | Shift+&lt;/&gt; Speed | Ctrl+E Export | Esc Close
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-4 ml-4">
            {/* Playback Speed Control */}
            <div className="border-r border-gray-700 pr-4">
              <PlaybackSpeedControl
                currentSpeed={currentSpeed}
                onSpeedChange={onSpeedChange}
              />
            </div>

            {/* Bookmark Controls */}
            <div className="flex items-center space-x-2 border-r border-gray-700 pr-4">
              <button
                onClick={onCreateBookmark}
                disabled={!currentVideo}
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
                {videoBookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {videoBookmarks.length}
                  </span>
                )}
              </button>

              {hasPlaylistBookmarks && (
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

            {/* Video Navigation */}
            <button
              onClick={onPreviousVideo}
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
              onClick={onNextVideo}
              disabled={currentVideoIndex >= totalVideos - 1}
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
              onClick={onTogglePlaylist}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
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

        {/* Video Bookmark Timeline */}
        {videoBookmarks.length > 0 && videoDuration > 0 && (
          <div className="mt-4">
            <VideoBookmarkTimeline
              bookmarks={videoBookmarks}
              videoDuration={videoDuration}
              currentTime={currentVideoTime}
              onJumpToTime={onJumpToTime}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoInfoBar;
