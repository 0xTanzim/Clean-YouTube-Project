import React, { useState } from 'react';
import PlaybackSpeedControl from '../components/player-controls/PlaybackSpeedControl';

const SpeedControlDemo: React.FC = () => {
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [demoLog, setDemoLog] = useState<string[]>([]);

  const handleSpeedChange = (speed: number) => {
    setCurrentSpeed(speed);
    const timestamp = new Date().toLocaleTimeString();
    setDemoLog((prev) => [
      `${timestamp}: Speed changed to ${speed}x`,
      ...prev.slice(0, 9), // Keep only last 10 entries
    ]);
  };

  const getSpeedDescription = (speed: number) => {
    if (speed < 1) return `🐌 Slow speed: ${speed}x`;
    if (speed > 1) return `⚡ Fast speed: ${speed}x`;
    return '▶️ Normal speed';
  };

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ⚡ Playback Speed Control Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Control video playback speed from 0.25x to 2x with visual
            indicators, keyboard shortcuts, and playlist-specific memory.
          </p>
        </div>

        {/* Demo Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Interactive Speed Control
          </h2>

          {/* Mock Video Player */}
          <div className="bg-black rounded-lg mb-6 aspect-video flex items-center justify-center relative">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🎥</div>
              <p className="text-lg mb-2">Demo Video Player</p>
              <p className="text-sm text-gray-400">
                Currently playing at {getSpeedDescription(currentSpeed)}
              </p>
            </div>

            {/* Speed indicator overlay */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-75 rounded-lg px-3 py-2">
              <PlaybackSpeedControl
                currentSpeed={currentSpeed}
                onSpeedChange={handleSpeedChange}
              />
            </div>
          </div>

          {/* Manual Speed Buttons */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Manual Speed Selection
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {speedOptions.map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    speed === currentSpeed
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {speed === 1 ? '1x' : `${speed}x`}
                </button>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Current Status
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Speed:
                </span>
                <span className="ml-2 text-blue-600 dark:text-blue-400">
                  {currentSpeed}x
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Description:
                </span>
                <span className="ml-2">
                  {getSpeedDescription(currentSpeed)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Effect:
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {currentSpeed < 1
                    ? 'Slower playback'
                    : currentSpeed > 1
                    ? 'Faster playback'
                    : 'Normal playback'}
                </span>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Activity Log
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 h-32 overflow-y-auto">
              {demoLog.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  Change the speed to see activity logs...
                </p>
              ) : (
                <div className="space-y-1">
                  {demoLog.map((log, index) => (
                    <p key={index} className="text-green-400 text-sm font-mono">
                      {log}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🎯 Key Features
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                • <strong>8 Speed Options:</strong> 0.25x, 0.5x, 0.75x, 1x,
                1.25x, 1.5x, 1.75x, 2x
              </li>
              <li>
                • <strong>Visual Indicator:</strong> Shows current speed with
                color coding
              </li>
              <li>
                • <strong>Hover Dropdown:</strong> Easy access to all speed
                options
              </li>
              <li>
                • <strong>Playlist Memory:</strong> Remembers speed per playlist
              </li>
              <li>
                • <strong>Smooth Integration:</strong> Works seamlessly with
                YouTube player
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              ⌨️ Keyboard Shortcuts
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">
                  Shift + &lt;
                </kbd>
                <span className="text-gray-600 dark:text-gray-300">
                  Decrease speed
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">
                  Shift + &gt;
                </kbd>
                <span className="text-gray-600 dark:text-gray-300">
                  Increase speed
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Speed changes are applied instantly to the YouTube player and
                saved automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Usage Examples
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🐌</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Slow Learning (0.25x - 0.75x)
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Perfect for complex topics, detailed code reviews, or when
                taking notes
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">▶️</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Normal Speed (1x)
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Standard playback for regular learning sessions and first-time
                viewing
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Fast Review (1.25x - 2x)
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Great for reviewing familiar content or getting quick overviews
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Control Your Learning Pace?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The speed control feature is now integrated into the video player.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try It Now
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

export default SpeedControlDemo;
