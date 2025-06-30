import React from 'react';
import type { VideoBookmark } from '../../types';
import VideoBookmarkTimeline from '../bookmarks/VideoBookmarkTimeline';
import VideoControls from './VideoControls';

interface VideoInfoBarProps {
  // Video info
  videoTitle?: string;
  channelTitle?: string;
  currentVideoIndex: number;
  totalVideos: number;
  progressPercentage: number;
  watchTime: number;

  // Bookmarks
  videoBookmarks: VideoBookmark[];
  videoDuration: number;
  currentVideoTime: number;
  onJumpToTime: (timestamp: number) => void;

  // Controls
  onPreviousVideo: () => void;
  onNextVideo: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onTogglePlaylist: () => void;
  showPlaylist: boolean;
  onCreateBookmark: () => void;
  onToggleBookmarkManager: () => void;
  showBookmarkManager: boolean;
  onExportBookmarks: () => void;
  hasPlaylistBookmarks: boolean;

  // Speed Control
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;

  // General
  isVideoSelected: boolean;
}

const VideoInfoBar: React.FC<VideoInfoBarProps> = ({
  videoTitle,
  channelTitle,
  currentVideoIndex,
  totalVideos,
  progressPercentage,
  watchTime,
  videoBookmarks,
  videoDuration,
  currentVideoTime,
  onJumpToTime,
  onPreviousVideo,
  onNextVideo,
  canGoPrevious,
  canGoNext,
  onTogglePlaylist,
  showPlaylist,
  onCreateBookmark,
  onToggleBookmarkManager,
  showBookmarkManager,
  onExportBookmarks,
  hasPlaylistBookmarks,
  currentSpeed,
  onSpeedChange,
  isVideoSelected,
}) => {
  const formatWatchTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate">
              {videoTitle || 'Loading...'}
            </h1>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-sm text-gray-400">
                {channelTitle} • Video {currentVideoIndex + 1} of {totalVideos}
              </p>
              <div className="text-xs text-blue-400">
                {progressPercentage}% Complete • {formatWatchTime(watchTime)}{' '}
                watched
              </div>
              {currentSpeed !== 1 && (
                <div className="text-xs text-yellow-400 bg-yellow-900 px-2 py-1 rounded">
                  Speed: {currentSpeed}x
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Shortcuts: ← Previous | → Next | P Playlist | B Bookmark | M
              Manager | Shift+&lt;/&gt; Speed | Ctrl+E Export | Esc Close
            </p>
          </div>

          <VideoControls
            onPreviousVideo={onPreviousVideo}
            onNextVideo={onNextVideo}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
            onTogglePlaylist={onTogglePlaylist}
            showPlaylist={showPlaylist}
            onCreateBookmark={onCreateBookmark}
            onToggleBookmarkManager={onToggleBookmarkManager}
            showBookmarkManager={showBookmarkManager}
            bookmarkCount={videoBookmarks.length}
            onExportBookmarks={onExportBookmarks}
            hasBookmarks={hasPlaylistBookmarks}
            currentSpeed={currentSpeed}
            onSpeedChange={onSpeedChange}
            isVideoSelected={isVideoSelected}
          />
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
