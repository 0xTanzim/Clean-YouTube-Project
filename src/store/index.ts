import { createStore } from 'easy-peasy';
import playlistModel from './models/playlistModel';
import recentModel from './models/recentModel';
import favoriteModel from './models/favoriteModel';
import noteModel from './models/noteModel';
import videoProgressModel from './models/videoProgressModel';

const store = createStore({
  playlists: playlistModel,
  recentPlaylists: recentModel,
  favorites: favoriteModel,
  notes: noteModel,
  videoProgress: videoProgressModel,
});

export default store;