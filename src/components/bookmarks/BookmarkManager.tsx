import { bookmarkUtils } from '@/lib/utils';
import type { VideoBookmark } from '@/types';
import React, { useState } from 'react';

interface BookmarkManagerProps {
  bookmarks: VideoBookmark[];
  onJumpToTime: (timestamp: number) => void;
  onExportMarkdown: () => void;
  className?: string;
}

const BookmarkManager: React.FC<BookmarkManagerProps> = ({
  bookmarks,
  onJumpToTime,
  onExportMarkdown,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Get all unique tags from bookmarks
  const allTags = Array.from(
    new Set(
      bookmarks.flatMap((bookmark) => bookmark.tags || []).filter(Boolean)
    )
  ).sort();

  // Filter bookmarks based on search and tag
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      searchTerm === '' ||
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bookmark.note &&
        bookmark.note.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTag =
      selectedTag === '' ||
      (bookmark.tags && bookmark.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  const handleExport = () => {
    if (bookmarks.length === 0) {
      alert('No bookmarks to export');
      return;
    }

    const markdown = bookmarkUtils.exportAsMarkdown(bookmarks);
    bookmarkUtils.downloadMarkdown(markdown, 'video-bookmarks.md');
    onExportMarkdown();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Bookmarks ({bookmarks.length})
        </h3>

        {bookmarks.length > 0 && (
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Export</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      {bookmarks.length > 0 && (
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTag === ''
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Results */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {filteredBookmarks.length !== bookmarks.length && (
          <p>
            Showing {filteredBookmarks.length} of {bookmarks.length} bookmarks
          </p>
        )}
      </div>

      {/* Bookmark List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredBookmarks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 dark:text-gray-500">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-sm">
                {searchTerm || selectedTag
                  ? 'No bookmarks match your search'
                  : 'No bookmarks yet'}
              </p>
            </div>
          </div>
        ) : (
          filteredBookmarks
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((bookmark) => (
              <button
                key={bookmark.id}
                onClick={() => onJumpToTime(bookmark.timestamp)}
                className="w-full text-left p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-750 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
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
                </div>

                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  {bookmark.title}
                </h4>

                {bookmark.note && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                    {bookmark.note}
                  </p>
                )}

                {bookmark.tags && bookmark.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {bookmark.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {bookmark.tags.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{bookmark.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </button>
            ))
        )}
      </div>
    </div>
  );
};

export default BookmarkManager;
