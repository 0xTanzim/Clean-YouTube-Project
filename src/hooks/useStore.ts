import {
  useStoreActions as useEasyPeasyStoreActions,
  useStoreState as useEasyPeasyStoreState,
} from 'easy-peasy';
import type { StoreModel } from '../store/types';

// Typed store hooks
export const useStoreActions = useEasyPeasyStoreActions<StoreModel>;
export const useStoreState = useEasyPeasyStoreState<StoreModel>;
