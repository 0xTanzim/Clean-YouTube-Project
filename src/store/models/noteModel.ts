import { action, persist } from 'easy-peasy';

const noteModel = persist(
  {
    notes: {}, // Key-value pairs where keys are video IDs and values are associated notes

    // Action to add or update a note for a video
    addOrUpdateNote: action((state, { videoId, note }) => {
      state.notes[videoId] = note;
    }),

    // Action to delete a note for a video
    deleteNote: action((state, videoId) => {
      delete state.notes[videoId];
    }),

    // Action to delete notes for a playlist
    deleteNotesForPlaylist: action((state, playlistId) => {
      const newNotes = {};
      for (const videoId in state.notes) {
        if (state.notes.hasOwnProperty(videoId)) {
          if (state.notes[videoId].playlistId !== playlistId) {
            newNotes[videoId] = state.notes[videoId];
          }
        }
      }
      state.notes = newNotes;
    }),
  },
  {
    storage: 'localStorage',
    allow: ['notes'],
  }
);

export default noteModel;
