import { createStore } from 'easy-peasy';
import bookmarkModel from './models/bookmarkModel';
import favoriteModel from './models/favoriteModel';
import noteModel from './models/noteModel';
import playlistModel from './models/playlistModel';
import recentModel from './models/recentModel';
import videoProgressModel from './models/videoProgressModel';

const store = createStore({
  playlists: playlistModel,
  recentPlaylists: recentModel,
  favorites: favoriteModel,
  notes: noteModel,
  videoProgress: videoProgressModel,
  bookmarks: bookmarkModel,
});

export default store;
