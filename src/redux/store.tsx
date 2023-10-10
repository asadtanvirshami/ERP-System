import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//reducers
import userReducer from './reducers/userReducer';
import formReducer from './reducers/formReducer';
import invoiceReducer from './reducers/invoiceReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  form: formReducer,
  invoice: invoiceReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'],
    },
  }),
});

const persistor = persistStore(store);

export { store, persistor };

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


// import { configureStore } from '@reduxjs/toolkit';
// import reducers from './reducers/reducers';

// const reduxStore = configureStore({
//   reducer: reducers,
//   // Add other options if needed
// });

// export const store = reduxStore;