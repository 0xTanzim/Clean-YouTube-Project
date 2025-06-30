import { STORAGE_KEYS } from '@/constants';
import { storage } from '@/lib';
import type { VideoProgress } from '@/types';

export class ProgressService {
  /**
   * Saves video progress to localStorage
   */
  static saveProgress(playlistId: string, progress: VideoProgress): void {
    const key = `${STORAGE_KEYS.VIDEO_PROGRESS}_${playlistId}`;
    storage.set(key, progress);
  }

  /**
   * Loads video progress from localStorage
   */
  static loadProgress(playlistId: string): VideoProgress | null {
    const key = `${STORAGE_KEYS.VIDEO_PROGRESS}_${playlistId}`;
    return storage.get<VideoProgress | null>(key, null);
  }

  /**
   * Removes video progress from localStorage
   */
  static removeProgress(playlistId: string): void {
    const key = `${STORAGE_KEYS.VIDEO_PROGRESS}_${playlistId}`;
    storage.remove(key);
  }

  /**
   * Gets all progress data for all playlists
   */
  static getAllProgress(): Record<string, VideoProgress> {
    const allProgress: Record<string, VideoProgress> = {};

    for (let i = 0; i < storage.size(); i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_KEYS.VIDEO_PROGRESS)) {
        const playlistId = key.replace(`${STORAGE_KEYS.VIDEO_PROGRESS}_`, '');
        const progress = storage.get<VideoProgress | null>(key, null);
        if (progress) {
          allProgress[playlistId] = progress;
        }
      }
    }

    return allProgress;
  }

  /**
   * Clears all progress data
   */
  static clearAllProgress(): void {
    const keys: string[] = [];

    for (let i = 0; i < storage.size(); i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_KEYS.VIDEO_PROGRESS)) {
        keys.push(key);
      }
    }

    keys.forEach((key) => storage.remove(key));
  }
}
