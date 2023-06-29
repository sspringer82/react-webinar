import saga from 'redux-saga';

import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = saga();

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  devTools: true,
  middleware(getDefaultMiddleware) {
    return [...getDefaultMiddleware(), sagaMiddleware];
  },
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
