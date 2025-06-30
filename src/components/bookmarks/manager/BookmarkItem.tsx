import type { VideoBookmark } from '@/types';
import React from 'react';

interface BookmarkItemProps {
  bookmark: VideoBookmark;
  onJumpToTime: (timestamp: number) => void;
  formatTimestamp: (seconds: number) => string;
}

const BookmarkItem: React.FC<BookmarkItemProps> = ({
  bookmark,
  onJumpToTime,
  formatTimestamp,
}) => {
  const handleClick = () => {
    onJumpToTime(bookmark.timestamp);
  };

  return (
    <div
      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">
              {formatTimestamp(bookmark.timestamp)}
            </span>
            <h3 className="font-medium text-gray-900 dark:text-white truncate">
              {bookmark.title}
            </h3>
          </div>

          {bookmark.note && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {bookmark.note}
            </p>
          )}

          {bookmark.tags && bookmark.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {bookmark.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="ml-2 p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
          aria-label="Jump to this time"
        >
          ▶️
        </button>
      </div>
    </div>
  );
};

export default BookmarkItem;
