import { action, persist, thunk } from 'easy-peasy';
import type { NoteModel } from '../types';

const noteModel: NoteModel = persist(
  {
    items: {}, // Key-value pairs where keys are video IDs and values are associated notes

    // Action to add or update a note for a video
    addOrUpdateNote: action((state, { videoId, note }) => {
      state.items[videoId] = note;
    }),

    // Action to delete a note for a video
    deleteNote: action((state, videoId) => {
      delete state.items[videoId];
    }),

    // Action to delete notes for a playlist
    deleteNotesForPlaylist: action((state, _playlistId) => {
      const newNotes: Record<string, string> = {};
      for (const videoId in state.items) {
        if (state.items.hasOwnProperty(videoId)) {
          // Since notes are just strings now, we can't filter by playlistId
          // This would need to be handled differently if we need playlist-specific notes
          newNotes[videoId] = state.items[videoId];
        }
      }
      state.items = newNotes;
    }),

    // Thunk to get note for a specific video
    getNoteForVideo: thunk((_, videoId, helpers) => {
      return helpers.getState().items[videoId] || null;
    }),
  },
  {
    storage: 'localStorage',
    allow: ['items'],
  }
);

export default noteModel;
