import React from 'react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string | null;
  onReady: (event: any) => void;
  onStateChange: (event: any) => void;
  onEnd: () => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  onReady,
  onStateChange,
  onEnd,
  className = '',
}) => {
  const getPlayerHeight = () => {
    if (typeof window === 'undefined') return '900';

    if (window.innerWidth > 1280) return '900';
    if (window.innerWidth > 768) return '720';
    return '400';
  };

  return (
    <div className={`w-full bg-black flex justify-center ${className}`}>
      <div className="w-full max-w-none">
        <YouTube
          videoId={videoId || undefined}
          opts={{
            width: '100%',
            height: getPlayerHeight(),
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
          className="w-full"
          onEnd={onEnd}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
