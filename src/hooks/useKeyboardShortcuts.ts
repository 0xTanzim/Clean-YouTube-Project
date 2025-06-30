import { useCallback, useEffect } from 'react';

interface KeyboardShortcutsConfig {
  onPreviousVideo: () => void;
  onNextVideo: () => void;
  onTogglePlaylist: () => void;
  onCreateBookmark: () => void;
  onToggleBookmarkManager: () => void;
  onExportBookmarks: () => void;
  onDecreaseSpeed: () => void;
  onIncreaseSpeed: () => void;
  onEscape: () => void;

  // State dependencies for cleanup
  currentSpeed: number;
  setPlaybackRate: (speed: number) => void;
}

/**
 * Custom hook for keyboard shortcuts management
 * Centralizes all keyboard event handling logic
 */
export const useKeyboardShortcuts = ({
  onPreviousVideo,
  onNextVideo,
  onTogglePlaylist,
  onCreateBookmark,
  onToggleBookmarkManager,
  onExportBookmarks,
  onDecreaseSpeed,
  onIncreaseSpeed,
  onEscape,
  currentSpeed,
  setPlaybackRate,
}: KeyboardShortcutsConfig) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          onPreviousVideo();
          break;

        case 'ArrowRight':
          event.preventDefault();
          onNextVideo();
          break;

        case 'p':
        case 'P':
          event.preventDefault();
          onTogglePlaylist();
          break;

        case 'b':
        case 'B':
          event.preventDefault();
          onCreateBookmark();
          break;

        case 'm':
        case 'M':
          event.preventDefault();
          onToggleBookmarkManager();
          break;

        case 'e':
        case 'E':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onExportBookmarks();
          }
          break;

        case '<':
          if (event.shiftKey) {
            event.preventDefault();
            onDecreaseSpeed();
            // Apply speed change to player
            setTimeout(() => setPlaybackRate(currentSpeed), 0);
          }
          break;

        case '>':
          if (event.shiftKey) {
            event.preventDefault();
            onIncreaseSpeed();
            // Apply speed change to player
            setTimeout(() => setPlaybackRate(currentSpeed), 0);
          }
          break;

        case 'Escape':
          event.preventDefault();
          onEscape();
          break;

        default:
          break;
      }
    },
    [
      onPreviousVideo,
      onNextVideo,
      onTogglePlaylist,
      onCreateBookmark,
      onToggleBookmarkManager,
      onExportBookmarks,
      onDecreaseSpeed,
      onIncreaseSpeed,
      onEscape,
      currentSpeed,
      setPlaybackRate,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Return keyboard shortcut descriptions for UI
  const getShortcutDescriptions = useCallback(
    () => ({
      navigation: [
        { key: '← →', description: 'Previous / Next video' },
        { key: 'P', description: 'Toggle playlist' },
      ],
      bookmarks: [
        { key: 'B', description: 'Create bookmark' },
        { key: 'M', description: 'Toggle bookmark manager' },
        { key: 'Ctrl+E', description: 'Export bookmarks' },
      ],
      playback: [
        { key: 'Shift+< / >', description: 'Decrease / Increase speed' },
      ],
      general: [{ key: 'Esc', description: 'Close modals' }],
    }),
    []
  );

  return {
    getShortcutDescriptions,
  };
};
