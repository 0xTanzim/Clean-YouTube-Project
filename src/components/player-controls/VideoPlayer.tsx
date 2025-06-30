import { forwardRef, useState } from 'react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string | null;
  onReady: (event: any) => void;
  onStateChange: (event: any) => void;
  onEnd: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  className?: string;
}

const VideoPlayer = forwardRef<any, VideoPlayerProps>(
  (
    {
      videoId,
      onReady,
      onStateChange,
      onEnd,
      onPrevious,
      onNext,
      hasNext = true,
      hasPrevious = true,
      className = '',
    },
    ref
  ) => {
    const [showControls, setShowControls] = useState(false);

    if (!videoId) {
      return (
        <div
          className={`w-full h-full bg-gray-900 dark:bg-gray-800 flex items-center justify-center ${className}`}
        >
          <div className="text-center text-gray-400 dark:text-gray-500">
            <div className="text-6xl mb-4">🎥</div>
            <p className="text-lg">Select a video to start watching</p>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`relative w-full h-full bg-black group ${className}`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* YouTube Player */}
        <YouTube
          videoId={videoId}
          className="w-full h-full"
          iframeClassName="w-full h-full"
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 1,
              controls: 1,
              rel: 0,
              showinfo: 0,
              modestbranding: 1,
              fs: 1,
              iv_load_policy: 3,
              disablekb: 0,
              cc_load_policy: 1,
              start: 0,
              enablejsapi: 1,
              origin: window.location.origin,
            },
          }}
          onReady={onReady}
          onStateChange={onStateChange}
          onEnd={onEnd}
          ref={ref}
        />

        {/* Udemy-style Navigation Controls */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {/* Previous Button */}
          {hasPrevious && onPrevious && (
            <button
              onClick={onPrevious}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-auto
                       bg-black/80 hover:bg-black/95 text-white p-4 rounded-full
                       transition-all duration-200 hover:scale-110 backdrop-blur-sm
                       focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl
                       border border-white/20 hover:border-white/40"
              aria-label="Previous video"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Next Button */}
          {hasNext && onNext && (
            <button
              onClick={onNext}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-auto
                       bg-black/80 hover:bg-black/95 text-white p-4 rounded-full
                       transition-all duration-200 hover:scale-110 backdrop-blur-sm
                       focus:outline-none focus:ring-2 focus:ring-white/50 shadow-xl
                       border border-white/20 hover:border-white/40"
              aria-label="Next video"
            >
              <svg
                className="w-7 h-7"
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
          )}
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
