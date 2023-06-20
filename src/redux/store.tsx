import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers/reducers';

const reduxStore = configureStore({
  reducer: reducers,
  // Add other options if needed
});

export const store = reduxStore;