import { bookmarkUtils } from '@/lib/utils';
import type { VideoBookmark } from '@/types';
import React from 'react';

interface VideoBookmarkTimelineProps {
  bookmarks: VideoBookmark[];
  videoDuration?: number;
  currentTime?: number;
  onJumpToTime: (timestamp: number) => void;
  className?: string;
}

const VideoBookmarkTimeline: React.FC<VideoBookmarkTimelineProps> = ({
  bookmarks,
  videoDuration = 0,
  currentTime = 0,
  onJumpToTime,
  className = '',
}) => {
  if (bookmarks.length === 0 || videoDuration === 0) {
    return null;
  }

  // Sort bookmarks by timestamp
  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  return (
    <div
      className={`relative bg-gray-100 dark:bg-gray-800 rounded-lg p-2 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Video Bookmarks ({bookmarks.length})
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-500">
          {bookmarkUtils.formatTimestamp(videoDuration)}
        </span>
      </div>

      {/* Timeline bar */}
      <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        {/* Progress indicator */}
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full opacity-30"
          style={{
            width: `${(currentTime / videoDuration) * 100}%`,
          }}
        />

        {/* Current time indicator */}
        <div
          className="absolute top-0 w-0.5 h-full bg-blue-600 z-10"
          style={{
            left: `${(currentTime / videoDuration) * 100}%`,
          }}
        />

        {/* Bookmark markers */}
        {sortedBookmarks.map((bookmark) => {
          const position = (bookmark.timestamp / videoDuration) * 100;

          return (
            <button
              key={bookmark.id}
              onClick={() => onJumpToTime(bookmark.timestamp)}
              className="absolute top-0 h-full w-2 bg-yellow-500 hover:bg-yellow-400 transform -translate-x-1 cursor-pointer group transition-all hover:w-3 hover:z-20"
              style={{
                left: `${position}%`,
              }}
              title={`${bookmark.title} - ${bookmarkUtils.formatTimestamp(
                bookmark.timestamp
              )}`}
            >
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-30">
                <div className="max-w-48 truncate">
                  <div className="font-medium">{bookmark.title}</div>
                  <div className="text-gray-300">
                    {bookmarkUtils.formatTimestamp(bookmark.timestamp)}
                  </div>
                  {bookmark.note && (
                    <div className="text-gray-400 text-xs mt-1 line-clamp-2">
                      {bookmark.note}
                    </div>
                  )}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Time markers */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
        <span>0:00</span>
        <span>{bookmarkUtils.formatTimestamp(videoDuration)}</span>
      </div>
    </div>
  );
};

export default VideoBookmarkTimeline;
