import { all } from '@redux-saga/core/effects';
import booksSaga from '../features/books/books.saga';

export default function* rootSaga() {
  yield all([booksSaga()]);
}
