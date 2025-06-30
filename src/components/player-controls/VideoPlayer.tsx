import { forwardRef } from 'react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string | null;
  onReady: (event: any) => void;
  onStateChange: (event: any) => void;
  onEnd: () => void;
  className?: string;
}

const VideoPlayer = forwardRef<any, VideoPlayerProps>(
  ({ videoId, onReady, onStateChange, onEnd, className = '' }, ref) => {
    const getResponsiveHeight = () => {
      if (typeof window === 'undefined') return '900';

      if (window.innerWidth > 1280) return '900';
      if (window.innerWidth > 768) return '720';
      return '400';
    };

    if (!videoId) {
      return (
        <div
          className={`w-full bg-black flex items-center justify-center aspect-video ${className}`}
        >
          <div className="text-center text-gray-400">
            <div className="text-6xl mb-4">🎥</div>
            <p className="text-lg">Select a video to start watching</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`w-full bg-black flex justify-center ${className}`}>
        <div className="w-full max-w-none">
          <YouTube
            videoId={videoId}
            opts={{
              width: '100%',
              height: getResponsiveHeight(),
              playerVars: {
                autoplay: 1,
                controls: 1,
                rel: 0,
                showinfo: 0,
                modestbranding: 1,
                fs: 1,
                iv_load_policy: 3,
                disablekb: 0,
                cc_load_policy: 1, // Enable captions for better learning
                start: 0,
              },
            }}
            onReady={onReady}
            onStateChange={onStateChange}
            onEnd={onEnd}
            className="w-full"
            ref={ref}
          />
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
