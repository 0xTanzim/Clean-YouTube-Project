import BookmarkManager from '@/components/bookmarks/BookmarkManager';
import VideoBookmarkTimeline from '@/components/bookmarks/VideoBookmarkTimeline';
import { bookmarkUtils } from '@/lib/utils';
import type { VideoBookmark } from '@/types';
import React, { useState } from 'react';

const BookmarkDemo: React.FC = () => {
  // Demo data
  const [demoBookmarks] = useState<VideoBookmark[]>([
    {
      id: 'demo-1',
      videoId: 'dQw4w9WgXcQ',
      playlistId: 'demo-playlist',
      timestamp: 45,
      title: 'Introduction to React Hooks',
      note: 'This section explains the basics of React Hooks and why they were introduced to replace class components.',
      tags: ['react', 'hooks', 'introduction'],
      createdAt: Date.now() - 86400000, // 1 day ago
      updatedAt: Date.now() - 86400000,
    },
    {
      id: 'demo-2',
      videoId: 'dQw4w9WgXcQ',
      playlistId: 'demo-playlist',
      timestamp: 185,
      title: 'useState Hook Example',
      note: 'Practical example of useState hook for managing component state. Shows counter example with increment/decrement functionality.',
      tags: ['react', 'hooks', 'useState', 'state-management'],
      createdAt: Date.now() - 82800000, // 23 hours ago
      updatedAt: Date.now() - 82800000,
    },
    {
      id: 'demo-3',
      videoId: 'dQw4w9WgXcQ',
      playlistId: 'demo-playlist',
      timestamp: 340,
      title: 'useEffect for API Calls',
      note: 'Demonstrates how to use useEffect hook for data fetching with proper cleanup and dependency array management.',
      tags: ['react', 'hooks', 'useEffect', 'api', 'cleanup'],
      createdAt: Date.now() - 43200000, // 12 hours ago
      updatedAt: Date.now() - 43200000,
    },
    {
      id: 'demo-4',
      videoId: 'dQw4w9WgXcQ',
      playlistId: 'demo-playlist',
      timestamp: 520,
      title: 'Custom Hook Creation',
      note: 'Shows how to create custom hooks to extract and reuse stateful logic across multiple components.',
      tags: ['react', 'hooks', 'custom-hooks', 'reusability'],
      createdAt: Date.now() - 3600000, // 1 hour ago
      updatedAt: Date.now() - 3600000,
    },
  ]);

  const [selectedDemo, setSelectedDemo] = useState<'timeline' | 'manager'>(
    'timeline'
  );
  const videoDuration = 600; // 10 minutes demo video

  const handleJumpToTime = (timestamp: number) => {
    alert(`Demo: Would jump to ${bookmarkUtils.formatTimestamp(timestamp)}`);
  };

  const handleExportMarkdown = () => {
    const markdown = bookmarkUtils.exportAsMarkdown(
      demoBookmarks,
      'React Hooks Tutorial'
    );
    bookmarkUtils.downloadMarkdown(markdown, 'demo-bookmarks.md');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔖 Video Bookmarks Feature Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Save specific timestamps in videos with personal notes, organize
            with tags, and export as markdown. Perfect for learning and content
            review.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Precise Timestamps
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Save exact moments in videos with timestamp precision down to the
              second.
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Rich Notes & Tags
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Add detailed notes and organize with custom tags for easy
              categorization.
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-3xl mb-4">📤</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Export to Markdown
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Export all bookmarks as formatted markdown files for external use.
            </p>
          </div>
        </div>

        {/* Demo Controls */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setSelectedDemo('timeline')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                selectedDemo === 'timeline'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              📊 Timeline View
            </button>
            <button
              onClick={() => setSelectedDemo('manager')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                selectedDemo === 'manager'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              📚 Manager View
            </button>
          </div>
        </div>

        {/* Demo Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {selectedDemo === 'timeline' ? (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Video Bookmark Timeline
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This timeline shows bookmark positions relative to video
                duration. Hover over markers to see details, click to jump to
                timestamp.
              </p>

              {/* Mock video player */}
              <div className="bg-black rounded-lg mb-6 aspect-video flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🎥</div>
                  <p className="text-lg">Demo Video Player</p>
                  <p className="text-sm text-gray-400">
                    React Hooks Tutorial - 10:00 duration
                  </p>
                </div>
              </div>

              <VideoBookmarkTimeline
                bookmarks={demoBookmarks}
                videoDuration={videoDuration}
                currentTime={185} // Demo current time
                onJumpToTime={handleJumpToTime}
              />

              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                💡 Tip: In the actual player, yellow markers show bookmark
                positions and current playback position is marked in blue.
              </div>
            </div>
          ) : (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Bookmark Manager
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Search, filter, and manage all your bookmarks. Click any
                bookmark to jump to that timestamp.
              </p>

              <BookmarkManager
                bookmarks={demoBookmarks}
                onJumpToTime={handleJumpToTime}
                onExportMarkdown={handleExportMarkdown}
              />
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⌨️ Keyboard Shortcuts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <kbd className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm font-mono">
                B
              </kbd>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Create Bookmark
              </p>
            </div>
            <div className="text-center">
              <kbd className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm font-mono">
                M
              </kbd>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Toggle Manager
              </p>
            </div>
            <div className="text-center">
              <kbd className="px-2 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm font-mono">
                Ctrl+E
              </kbd>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Export Markdown
              </p>
            </div>
            <div className="text-center">
              <kbd className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm font-mono">
                Esc
              </kbd>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Close Modals
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Bookmarking?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Add a YouTube playlist and start creating bookmarks during your
            learning sessions.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Player
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookmarkDemo;
