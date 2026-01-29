import { configureStore } from '@reduxjs/toolkit';
import renovationReducer from './slices/renovationSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    renovation: renovationReducer,
    ui: uiReducer,
  },
});

export default store;



