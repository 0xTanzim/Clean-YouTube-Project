import React from 'react';

interface VideoProgressProps {
  progressPercentage: number;
  watchTime: number;
  formatWatchTime: (seconds: number) => string;
}

const VideoProgress: React.FC<VideoProgressProps> = ({
  progressPercentage,
  watchTime,
  formatWatchTime,
}) => {
  return (
    <div className="flex items-center space-x-4 text-sm text-gray-300">
      <div className="flex items-center space-x-2">
        <div className="w-32 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span>{progressPercentage}%</span>
      </div>
      <div className="flex items-center space-x-1">
        <span>⏱</span>
        <span>{formatWatchTime(watchTime)}</span>
      </div>
    </div>
  );
};

export default VideoProgress;
