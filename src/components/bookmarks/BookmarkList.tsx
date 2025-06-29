import React from 'react';
import { bookmarkUtils } from '../../lib/utils';
import type { VideoBookmark } from '../../types';

interface BookmarkListProps {
  bookmarks: VideoBookmark[];
  onJumpToTime: (timestamp: number) => void;
  onEdit: (bookmark: VideoBookmark) => void;
  onDelete: (bookmarkId: string) => void;
  className?: string;
}

const BookmarkList: React.FC<BookmarkListProps> = ({
  bookmarks,
  onJumpToTime,
  onEdit,
  onDelete,
  className = '',
}) => {
  if (bookmarks.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-gray-400 dark:text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-4"
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
          <p className="text-sm">No bookmarks yet</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Press 'B' during video playback to create your first bookmark
          </p>
        </div>
      </div>
    );
  }

  // Sort bookmarks by timestamp
  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  return (
    <div className={`space-y-2 ${className}`}>
      {sortedBookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <button
              onClick={() => onJumpToTime(bookmark.timestamp)}
              className="flex-1 text-left group"
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-mono px-2 py-1 rounded">
                  {bookmarkUtils.formatTimestamp(bookmark.timestamp)}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m2-7a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {bookmark.title}
              </h4>
            </button>

            {/* Actions */}
            <div className="flex items-center space-x-1 ml-2">
              <button
                onClick={() => onEdit(bookmark)}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                title="Edit bookmark"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(bookmark.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete bookmark"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Note */}
          {bookmark.note && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-3">
              {bookmark.note}
            </p>
          )}

          {/* Tags */}
          {bookmark.tags && bookmark.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {bookmark.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>
              Created {new Date(bookmark.createdAt).toLocaleDateString()}
            </span>
            {bookmark.updatedAt !== bookmark.createdAt && (
              <span>
                Updated {new Date(bookmark.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarkList;
