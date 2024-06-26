import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../redux/auth/slice';
import boardsReducer from '../redux/boards/slice';
import supportReducer from '../redux/support/slice';
import tasksReducer from '../redux/tasks/slice';
import columnsReducer from '../redux/columns/slice';
import filterReducer from '../redux/filter/slice';
import backgroundsReducer from '../redux/backgrounds/slice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    boards: boardsReducer,
    support: supportReducer,
    tasks: tasksReducer,
    columns: columnsReducer,
    filter: filterReducer,
    backgrounds: backgroundsReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
