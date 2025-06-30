import getPlaylist from '@/api';
import { action, persist, thunk } from 'easy-peasy';
import type { PlaylistModel } from '../types';

const playlistModel: PlaylistModel = persist(
  {
    data: {},
    error: '',
    isLoading: false,

    setLoading: action((state, payload) => {
      state.isLoading = payload;
    }),

    setError: action((state, payload) => {
      state.error = payload;
    }),

    clearError: action((state) => {
      state.error = '';
    }),

    setPlaylist: action((state, payload) => {
      state.data[payload.id] = payload;
    }),

    // Thunk to fetch playlist details by playlistId
    getPlaylist: thunk(async (actions, playlistId, helpers) => {
      if (helpers.getState().data[playlistId]) return;

      actions.setLoading(true);
      actions.clearError();
      try {
        const playlistDetails = await getPlaylist(playlistId);
        actions.setPlaylist(playlistDetails);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Something went wrong';
        actions.setError(errorMessage);
      } finally {
        actions.setLoading(false);
      }
    }),

    // Selector to get playlist by playlistId
    getPlaylistById: thunk((actions, playlistId, helpers) => {
      if (!playlistId) return undefined;

      const playlist = helpers.getState().data[playlistId];
      if (playlist) return playlist;

      // Playlist not in cache, fetch from API
      if (import.meta.env.DEV) {
        console.log('Playlist not found in state, fetching from API');
      }

      actions.getPlaylist(playlistId);
      return undefined;
    }),

    // Action to remove playlist from state
    removePlaylist: action((state, playlistId) => {
      delete state.data[playlistId];
    }),
  },
  { storage: 'localStorage', allow: ['data'] }
);

export default playlistModel;
