import { action, persist } from 'easy-peasy';
import type { RecentModel } from '../types';

const MAX_RECENT_PLAYLISTS = 3;

const recentModel: RecentModel = persist(
  {
    items: [],
    addRecent: action((state, playlistId) => {
      // Check if the playlistId is already in the list
      if (!state.items.includes(playlistId)) {
        state.items.unshift(playlistId);
        state.items = state.items.slice(0, MAX_RECENT_PLAYLISTS);
      }
    }),

    // Action to remove a playlist from the recent playlist
    removeFromRecent: action((state, playlistId) => {
      state.items = state.items.filter((id) => id !== playlistId);
    }),

    // Action to clear all recent playlists
    clearRecent: action((state) => {
      state.items = [];
    }),
  },
  { storage: 'localStorage', allow: ['items'] }
);

export default recentModel;
