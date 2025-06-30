import React from 'react';

interface PlaylistSidebarProps {
  showPlaylist: boolean;
  playlistData: any;
  selectedVideo: string | null;
  currentVideoIndex: number;
  progressPercentage: number;
  watchTime: number;
  onVideoClick: (videoId: string, index: number) => void;
  onResetProgress: () => void;
  onClose: () => void;
  formatWatchTime: (seconds: number) => string;
}

const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({
  showPlaylist,
  playlistData,
  selectedVideo,
  currentVideoIndex,
  progressPercentage,
  watchTime,
  onVideoClick,
  onResetProgress,
  onClose,
  formatWatchTime,
}) => {
  if (!showPlaylist) return null;

  return (
    <>
      {/* Backdrop */}
      {showPlaylist && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-[90vw] z-50
                   bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700
                   transform transition-transform duration-300 ease-in-out
                   ${showPlaylist ? 'translate-x-0' : 'translate-x-full'}
                   shadow-2xl flex flex-col`}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 p-6 border-b border-gray-200 dark:border-gray-700
                       bg-gray-50 dark:bg-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Playlist
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400
                       dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700
                       rounded-lg transition-colors"
              aria-label="Close playlist"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Playlist Info */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2 truncate">
              {playlistData?.title || 'Unknown Playlist'}
            </h4>
            <div className="space-y-1">
              <p>📹 {playlistData?.playlistItems?.length || 0} videos</p>
              <p>📊 {progressPercentage}% Complete</p>
              <p>⏱️ {formatWatchTime(watchTime)} total watch time</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Video List */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-4 space-y-3">
            {playlistData?.playlistItems?.map((item: any, index: number) => (
              <div
                key={`${item.contentDetails?.videoId || index}-${index}`}
                onClick={() =>
                  onVideoClick(item.contentDetails?.videoId, index)
                }
                className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                           hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-transparent
                           ${
                             selectedVideo === item.contentDetails?.videoId
                               ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                               : 'hover:border-gray-200 dark:hover:border-gray-700'
                           }
                           ${
                             index <= currentVideoIndex
                               ? 'opacity-100'
                               : 'opacity-70'
                           }`}
              >
                {/* Thumbnail */}
                <div className="relative flex-shrink-0">
                  <img
                    src={
                      item.snippet?.thumbnails?.medium?.url ||
                      item.snippet?.thumbnails?.default?.url ||
                      '/placeholder-video.jpg'
                    }
                    alt={item.snippet?.title || 'Video thumbnail'}
                    className="w-20 h-14 object-cover rounded-lg shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/placeholder-video.jpg';
                    }}
                  />

                  {/* Duration Badge */}
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                    {item.duration || '0:00'}
                  </div>

                  {/* Status Indicators */}
                  {index < currentVideoIndex && (
                    <div
                      className="absolute -top-1 -left-1 bg-green-500 text-white text-xs
                                   w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                    >
                      ✓
                    </div>
                  )}
                  {index === currentVideoIndex && (
                    <div
                      className="absolute -top-1 -left-1 bg-blue-500 text-white text-xs
                                   w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-pulse"
                    >
                      ▶
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={`text-sm font-medium line-clamp-2 leading-tight mb-1 ${
                      selectedVideo === item.contentDetails?.videoId
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {item.snippet?.title || 'Untitled Video'}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {item.snippet?.channelTitle || 'Unknown Channel'}
                  </p>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    #{index + 1} in playlist
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700
                       bg-gray-50 dark:bg-gray-800"
        >
          <button
            onClick={onResetProgress}
            className="w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400
                     hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20
                     border border-red-200 dark:border-red-700 rounded-lg transition-colors"
          >
            🔄 Reset Progress
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaylistSidebar;
