import { usePlayerPage } from '@/hooks/usePlayerPage';
import type { Playlist, PlaylistItem, VideoBookmark } from '@/types';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

// Define the context type
interface PlayerContextType {
  // Basic state
  playlistData: Playlist | null;
  selectedVideo: string | null;
  currentVideoIndex: number;
  watchTime: number;

  // UI state
  showPlaylist: boolean;
  showBookmarkForm: boolean;
  showBookmarkManager: boolean;
  setShowPlaylist: (show: boolean) => void;
  setShowBookmarkManager: (show: boolean) => void;

  // Video player
  currentVideoTime: number;
  videoDuration: number;
  handleYouTubeReady: (event: any) => void;
  onYouTubeStateChange: (event: any) => void;

  // Navigation
  goToNextVideo: () => void;
  goToPreviousVideo: () => void;
  getCurrentVideo: () => PlaylistItem | null;
  handleVideoClick: (videoId: string, index: number) => void;

  // Bookmarks
  videoBookmarks: VideoBookmark[];
  playlistBookmarks: VideoBookmark[];
  stats: {
    totalBookmarks: number;
    totalPlaylistBookmarks: number;
    uniqueTags: string[];
  };
  handleCreateBookmark: () => void;
  handleJumpToTime: (timestamp: number) => void;
  handleExportBookmarks: () => void;
  handleSaveBookmark: () => void;
  handleCancelBookmark: () => void;

  // Speed control
  currentSpeed: number;
  handleSpeedChange: (speed: number) => void;

  // Progress
  getProgressPercentage: () => number;
  formatWatchTime: (seconds: number) => string;
  resetProgress: () => void;
}

// Create the context
const PlayerContext = createContext<PlayerContextType | null>(null);

// Provider component
interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const playerState = usePlayerPage();

  return (
    <PlayerContext.Provider value={playerState}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use the player context
export const usePlayerContext = (): PlayerContextType => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }

  return context;
};

// Higher-order component for wrapping player components
export const withPlayerContext = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P) => (
    <PlayerProvider>
      <Component {...props} />
    </PlayerProvider>
  );

  WrappedComponent.displayName = `withPlayerContext(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};
