// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import reducers from './reducers/reducers';

// const persistConfig = {
//   key: 'root',
//   storage,
//   // Add any other configuration options as needed
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
//   reducer: persistedReducer,
//   // Add other options if needed
// });

// const persistor = persistStore(store);

// export { store, persistor };


import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers/reducers';

const reduxStore = configureStore({
  reducer: reducers,
  // Add other options if needed
});

export const store = reduxStore;