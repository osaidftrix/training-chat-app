import { combineReducers, configureStore } from '@reduxjs/toolkit';
import connectionSlice from './store/slices/connectionSlice';
import storage from 'redux-persist/lib/storage';
//import storage from 'redux-persist-indexeddb-storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['connection'],
  // whitelist: ['connection']
};

const rootReducer = combineReducers({
  connection: connectionSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
