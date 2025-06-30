import type { PlaylistItem, VideoBookmark } from '@/types';
import React from 'react';
import VideoBookmarkTimeline from '../bookmarks/VideoBookmarkTimeline';
import PlaybackSpeedControl from '../player-controls/PlaybackSpeedControl';
import VideoControls from './VideoControls';
import VideoHeader from './VideoHeader';
import VideoProgress from './VideoProgress';

interface VideoInfoBarProps {
  currentVideo: PlaylistItem | null;
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
  formatWatchTime,
}) => {
  if (!currentVideo) {
    return (
      <div className="bg-black bg-opacity-75 text-white p-4 rounded-lg">
        <div className="text-center text-gray-400">No video selected</div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Video Timeline */}
        {videoBookmarks.length > 0 && (
          <div className="mb-4">
            <VideoBookmarkTimeline
              bookmarks={videoBookmarks}
              videoDuration={videoDuration}
              currentTime={currentVideoTime}
              onJumpToTime={onJumpToTime}
            />
          </div>
        )}

        {/* Video Header */}
        <VideoHeader
          currentVideo={currentVideo}
          currentVideoIndex={currentVideoIndex}
          totalVideos={totalVideos}
        />

        {/* Progress Section */}
        <VideoProgress
          progressPercentage={progressPercentage}
          watchTime={watchTime}
          formatWatchTime={formatWatchTime}
        />

        {/* Control Panel */}
        <div className="flex items-center justify-between">
          {/* Playback Speed Control */}
          <PlaybackSpeedControl
            currentSpeed={currentSpeed}
            onSpeedChange={onSpeedChange}
          />

          {/* Video Navigation & Bookmark Controls */}
          <VideoControls
            onPreviousVideo={onPreviousVideo}
            onNextVideo={onNextVideo}
            onTogglePlaylist={onTogglePlaylist}
            onCreateBookmark={onCreateBookmark}
            onToggleBookmarkManager={onToggleBookmarkManager}
            onExportBookmarks={onExportBookmarks}
            currentVideoIndex={currentVideoIndex}
            totalVideos={totalVideos}
            hasBookmarks={videoBookmarks.length > 0}
            showBookmarkManager={showBookmarkManager}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoInfoBar;
