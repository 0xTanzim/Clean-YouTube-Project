import React from 'react';

interface PlaybackSpeedControlProps {
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
  className?: string;
}

const PlaybackSpeedControl: React.FC<PlaybackSpeedControlProps> = ({
  currentSpeed,
  onSpeedChange,
  className = '',
}) => {
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  const getSpeedLabel = (speed: number) => {
    if (speed === 1) return '1x';
    return `${speed}x`;
  };

  const getSpeedDescription = (speed: number) => {
    if (speed < 1) return `Slow speed: ${speed}x`;
    if (speed > 1) return `Fast speed: ${speed}x`;
    return 'Normal speed';
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Speed indicator */}
      <div className="flex items-center space-x-1">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span
          className={`text-sm font-medium ${
            currentSpeed === 1
              ? 'text-gray-300'
              : currentSpeed < 1
              ? 'text-blue-400'
              : 'text-yellow-400'
          }`}
          title={getSpeedDescription(currentSpeed)}
        >
          {getSpeedLabel(currentSpeed)}
        </span>
      </div>

      {/* Speed dropdown */}
      <div className="relative group">
        <button
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          title={`Current speed: ${getSpeedDescription(
            currentSpeed
          )} - Click to change`}
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 min-w-24">
            <div className="px-3 py-1 text-xs text-gray-400 border-b border-gray-700 mb-1">
              Playback Speed
            </div>
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                className={`w-full px-3 py-1 text-sm text-left hover:bg-gray-700 transition-colors ${
                  speed === currentSpeed
                    ? 'bg-gray-700 text-blue-400 font-medium'
                    : 'text-gray-300'
                }`}
                title={getSpeedDescription(speed)}
              >
                <div className="flex items-center justify-between">
                  <span>{getSpeedLabel(speed)}</span>
                  {speed === currentSpeed && (
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
            <div className="px-3 py-1 mt-1 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                Shift + &lt; / &gt; to change
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybackSpeedControl;
