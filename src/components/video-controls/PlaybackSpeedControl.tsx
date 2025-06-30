import React, { useEffect, useRef, useState } from 'react';

interface PlaybackSpeedControlProps {
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
  className?: string;
}

const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

const PlaybackSpeedControl: React.FC<PlaybackSpeedControlProps> = ({
  currentSpeed,
  onSpeedChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSpeedSelect = (speed: number) => {
    onSpeedChange(speed);
    setIsOpen(false);
  };

  const getSpeedLabel = (speed: number) => {
    if (speed === 1) return 'Normal';
    return `${speed}x`;
  };

  const getSpeedIcon = () => {
    if (currentSpeed < 1) return '🐌';
    if (currentSpeed > 1) return '⚡';
    return '▶️';
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
        title={`Playback Speed: ${getSpeedLabel(currentSpeed)}`}
      >
        <span className="text-sm">{getSpeedIcon()}</span>
        <span className="text-sm font-medium min-w-[3rem] text-left">
          {getSpeedLabel(currentSpeed)}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
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

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 min-w-[8rem]">
          <div className="py-1">
            {SPEED_OPTIONS.map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedSelect(speed)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors ${
                  currentSpeed === speed
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{getSpeedLabel(speed)}</span>
                  {currentSpeed === speed && (
                    <svg
                      className="w-4 h-4"
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
          </div>

          {/* Speed indicator legend */}
          <div className="border-t border-gray-600 px-3 py-2 text-xs text-gray-400">
            <div className="text-center">🐌 Slower • ▶️ Normal • ⚡ Faster</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaybackSpeedControl;
