import { formatTimestamp } from '@/lib';
import type { VideoBookmark } from '@/types';
import React, { useState } from 'react';
import BookmarkFilters from './BookmarkFilters';
import BookmarkHeader from './BookmarkHeader';
import BookmarkList from './BookmarkList';

interface BookmarkManagerProps {
  bookmarks: VideoBookmark[];
  onJumpToTime: (timestamp: number) => void;
  onExportMarkdown: () => void;
  onClose: () => void;
  className?: string;
}

const BookmarkManager: React.FC<BookmarkManagerProps> = ({
  bookmarks,
  onJumpToTime,
  onExportMarkdown,
  onClose,
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

  return (
    <div
      className={`h-full flex flex-col bg-white dark:bg-gray-900 ${className}`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <BookmarkHeader
          bookmarkCount={bookmarks.length}
          onExport={onExportMarkdown}
          onClose={onClose}
        />

        <BookmarkFilters
          searchTerm={searchTerm}
          selectedTag={selectedTag}
          allTags={allTags}
          onSearchChange={setSearchTerm}
          onTagChange={setSelectedTag}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <BookmarkList
          bookmarks={filteredBookmarks}
          onJumpToTime={onJumpToTime}
          formatTimestamp={formatTimestamp}
        />
      </div>

      {filteredBookmarks.length !== bookmarks.length && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredBookmarks.length} of {bookmarks.length} bookmarks
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkManager;
