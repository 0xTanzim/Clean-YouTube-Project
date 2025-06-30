import React from 'react';

interface BookmarkHeaderProps {
  bookmarkCount: number;
  onExport: () => void;
  onClose: () => void;
}

const BookmarkHeader: React.FC<BookmarkHeaderProps> = ({
  bookmarkCount,
  onExport,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Bookmarks ({bookmarkCount})
      </h2>

      <div className="flex items-center space-x-2">
        {bookmarkCount > 0 && (
          <button
            onClick={onExport}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-sm transition-colors"
            aria-label="Export bookmarks"
          >
            📤 Export
          </button>
        )}

        <button
          onClick={onClose}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Close bookmark manager"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default BookmarkHeader;
