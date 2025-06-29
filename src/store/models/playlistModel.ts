import { action, persist, thunk } from 'easy-peasy';
import type { PlaylistModel } from '../types';
import getPlaylist from './../../api';

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

    addPlaylist: action((state, payload) => {
      state.data[payload.playlistId] = payload;
    }),

    // Thunk to fetch playlist details by playlistId
    getPlaylist: thunk(async (actions, playlistId, helpers) => {
      if (helpers.getState().data[playlistId]) return;

      actions.setLoading(true);
      try {
        const playlistDetails = await getPlaylist(playlistId);
        actions.addPlaylist(playlistDetails);
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
      const playlist = helpers.getState().data[playlistId];
      if (playlist) return playlist;

      // Playlist not in cache, fetch from API
      if (import.meta.env.DEV) {
        console.log('Playlist not found in state, fetching from API');
      }

      return actions.getPlaylist(playlistId);
    }),

    // Action to remove playlist from state
    removePlaylist: action((state, playlistId) => {
      delete state.data[playlistId];
    }),

    deletePlaylist: thunk(async (actions, playlistId) => {
      try {
        // Remove playlist from state
        actions.removePlaylist(playlistId);

        // TODO: Remove notes and video progress for this playlist
        // Will need to implement cross-model communication properly
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Error deleting playlist';
        console.error('Error deleting playlist:', errorMessage);
      }
    }),
  },
  { storage: 'localStorage', allow: ['data'] }
);

export default playlistModel;
