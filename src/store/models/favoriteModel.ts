import { action, persist } from "easy-peasy";

const favoriteModel = persist({
  items: [],

  addFavorite: action((state, playlistId) => {
    state.items.push(playlistId);
  }),

  removeFavorite: action((state, playlistId) => {
    state.items = state.items.filter(id => id !== playlistId);
  }),
},{
  storage: 'localStorage', allow: ['items']
});

export default favoriteModel;
