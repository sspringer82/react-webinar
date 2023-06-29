import { getBooks, removeBook } from '../../api/book.api';
import { Book } from '../../shared/types/Book';
import { loadDataAction, removeAction } from './books.actions';
import { put, takeLatest } from '@redux-saga/core/effects';

function* loadData(): Generator {
  try {
    const books = (yield getBooks()) as Book[];
    yield put(loadDataAction.success(books));
  } catch {
    yield put(loadDataAction.failure());
  }
}

function* remove({
  payload: id,
}: ReturnType<typeof removeAction.request>): Generator {
  try {
    yield removeBook(id);
    yield put(removeAction.success(id));
  } catch {
    yield put(removeAction.failure());
  }
}

export default function* booksSaga() {
  yield takeLatest(loadDataAction.request, loadData);
  yield takeLatest(removeAction.request, remove);
}
