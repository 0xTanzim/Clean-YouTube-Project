import type { PlaylistItem } from '@/types';
import React from 'react';

interface VideoHeaderProps {
  currentVideo: PlaylistItem | null;
  currentVideoIndex: number;
  totalVideos: number;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({
  currentVideo,
  currentVideoIndex,
  totalVideos,
}) => {
  if (!currentVideo) return null;

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-white truncate">
          {currentVideo.snippet.title}
        </h2>
        <p className="text-sm text-gray-300">
          {currentVideo.snippet.channelTitle}
        </p>
      </div>
      <div className="ml-4 text-sm text-gray-400">
        {currentVideoIndex + 1} / {totalVideos}
      </div>
    </div>
  );
};

export default VideoHeader;
