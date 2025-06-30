import React from 'react';

interface BookmarkFiltersProps {
  searchTerm: string;
  selectedTag: string;
  allTags: string[];
  onSearchChange: (term: string) => void;
  onTagChange: (tag: string) => void;
}

const BookmarkFilters: React.FC<BookmarkFiltersProps> = ({
  searchTerm,
  selectedTag,
  allTags,
  onSearchChange,
  onTagChange,
}) => {
  return (
    <div className="space-y-3 mb-4">
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div>
          <select
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default BookmarkFilters;
