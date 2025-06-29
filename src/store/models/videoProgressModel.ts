import { action, persist } from 'easy-peasy';

const videoProgressModel = persist(
  {
    progress: {},

    updateProgress: action((state, { videoId, progress }) => {
      state.progress[videoId] = progress;
    }),
  },
  {
    storage: 'localStorage',
    allow: ['progress'],
  }
);

export default videoProgressModel;
