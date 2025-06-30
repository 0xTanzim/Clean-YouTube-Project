import type { VideoBookmark } from '@/types';
import React from 'react';
import BookmarkItem from './BookmarkItem';

interface BookmarkListProps {
  bookmarks: VideoBookmark[];
  onJumpToTime: (timestamp: number) => void;
  formatTimestamp: (seconds: number) => string;
}

const BookmarkList: React.FC<BookmarkListProps> = ({
  bookmarks,
  onJumpToTime,
  formatTimestamp,
}) => {
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg mb-2">📚</div>
        <p className="text-gray-500 dark:text-gray-400">No bookmarks found</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Create bookmarks while watching to save important moments
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.id}
          bookmark={bookmark}
          onJumpToTime={onJumpToTime}
          formatTimestamp={formatTimestamp}
        />
      ))}
    </div>
  );
};

export default BookmarkList;
