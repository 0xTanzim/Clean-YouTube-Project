import React, { useState } from 'react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { bookmarkUtils } from '../../lib/utils';

interface BookmarkFormProps {
  videoId: string;
  playlistId: string;
  currentTime: number;
  videoTitle: string;
  onSave: () => void;
  onCancel: () => void;
}

const BookmarkForm: React.FC<BookmarkFormProps> = ({
  videoId,
  playlistId,
  currentTime,
  videoTitle,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [timestamp, setTimestamp] = useState(
    bookmarkUtils.formatTimestamp(currentTime)
  );
  const [tags, setTags] = useState('');

  const { createBookmark } = useBookmarks(videoId, playlistId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a title for the bookmark');
      return;
    }

    if (!bookmarkUtils.isValidTimestamp(timestamp)) {
      alert('Please enter a valid timestamp (mm:ss or hh:mm:ss)');
      return;
    }

    try {
      createBookmark(
        bookmarkUtils.parseTimestamp(timestamp),
        title.trim(),
        note.trim() || undefined,
        tags.trim()
          ? tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
          : undefined
      );

      onSave();
    } catch (error) {
      console.error('Failed to create bookmark:', error);
      alert('Failed to create bookmark. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Add Bookmark
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Timestamp */}
          <div>
            <label
              htmlFor="timestamp"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Timestamp
            </label>
            <input
              type="text"
              id="timestamp"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="0:00"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Format: mm:ss or hh:mm:ss
            </p>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Important moment"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Note */}
          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Note
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add your notes here..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2, tag3"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Separate tags with commas
            </p>
          </div>

          {/* Video context */}
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Video:</strong> {videoTitle}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Time:</strong>{' '}
              {bookmarkUtils.formatTimestamp(currentTime)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Bookmark
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookmarkForm;
