import { action, persist, thunk } from 'easy-peasy';
import type { VideoProgressModel } from '../types';

const videoProgressModel: VideoProgressModel = persist(
  {
    items: {},

    updateProgress: action((state, { playlistId, progress }) => {
      state.items[playlistId] = progress;
    }),

    removeProgress: action((state, playlistId) => {
      delete state.items[playlistId];
    }),

    getProgress: thunk((_, playlistId, helpers) => {
      return helpers.getState().items[playlistId] || null;
    }),

    deleteVideoProgressForPlaylist: action((state, playlistId) => {
      delete state.items[playlistId];
    }),
  },
  {
    storage: 'localStorage',
    allow: ['items'],
  }
);

export default videoProgressModel;
