import { action, persist, thunk } from 'easy-peasy';
import type { FavoriteModel } from '../types';

const favoriteModel: FavoriteModel = persist(
  {
    items: [],

    addFavorite: action((state, playlistId) => {
      if (!state.items.includes(playlistId)) {
        state.items.push(playlistId);
      }
    }),

    removeFavorite: action((state, playlistId) => {
      state.items = state.items.filter((id) => id !== playlistId);
    }),

    toggleFavorite: action((state, playlistId) => {
      if (state.items.includes(playlistId)) {
        state.items = state.items.filter((id) => id !== playlistId);
      } else {
        state.items.push(playlistId);
      }
    }),

    isFavorite: thunk((_, playlistId, helpers) => {
      return helpers.getState().items.includes(playlistId);
    }),
  },
  {
    storage: 'localStorage',
    allow: ['items'],
  }
);

export default favoriteModel;
