import rootEpic from './rootEpic';

import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import loginReducer from '../features/login/booksSlice';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    books: booksReducer,
    login: loginReducer,
  },
  devTools: true,
  middleware(getDefaultMiddleware) {
    return [...getDefaultMiddleware(), epicMiddleware];
  },
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
