import React from 'react';

interface PlaylistSidebarProps {
  isVisible: boolean;
  onClose: () => void;

  // Playlist data
  playlistTitle?: string;
  playlistItems?: any[];

  // Progress
  progressPercentage: number;
  watchTime: number;
  onResetProgress: () => void;

  // Video selection
  selectedVideoId: string | null;
  currentVideoIndex: number;
  onVideoSelect: (videoId: string, index: number) => void;
}

const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({
  isVisible,
  onClose,
  playlistTitle,
  playlistItems = [],
  progressPercentage,
  watchTime,
  onResetProgress,
  selectedVideoId,
  currentVideoIndex,
  onVideoSelect,
}) => {
  const formatWatchTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-900 border-l border-gray-700 transition-transform duration-300 z-50 ${
          isVisible ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
        style={{ width: '400px' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">Playlist</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={onResetProgress}
                className="p-1 rounded text-red-400 hover:text-red-300 text-xs"
                title="Reset Progress"
              >
                Reset
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded text-gray-400 hover:text-white"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-1">{playlistTitle}</p>

          {/* Progress bar */}
          <div className="mt-2">
            <div className="bg-gray-800 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {progressPercentage}% Complete • {formatWatchTime(watchTime)}{' '}
              total
            </p>
          </div>
        </div>

        {/* Video list */}
        <div className="h-full overflow-y-auto pb-20">
          {playlistItems.map((item: any, index: number) => (
            <div
              key={item.id}
              onClick={() => onVideoSelect(item.contentDetails.videoId, index)}
              className={`flex items-start space-x-3 p-3 cursor-pointer transition-colors border-b border-gray-800 hover:bg-gray-800 ${
                selectedVideoId === item.contentDetails.videoId
                  ? 'bg-blue-900/30 border-blue-600'
                  : ''
              } ${index <= currentVideoIndex ? 'opacity-100' : 'opacity-70'}`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={item.thumbnail.url}
                  alt={item.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                  {index + 1}
                </div>
                {index < currentVideoIndex && (
                  <div className="absolute top-1 left-1 bg-green-600 text-white text-xs px-1 rounded">
                    ✓
                  </div>
                )}
                {index === currentVideoIndex && (
                  <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1 rounded">
                    ▶
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`text-sm font-medium line-clamp-2 leading-tight ${
                    selectedVideoId === item.contentDetails.videoId
                      ? 'text-blue-400'
                      : 'text-white'
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  {item.channelTitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default PlaylistSidebar;
