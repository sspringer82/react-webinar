import { getBooks, removeBook, saveBook } from '../../api/book.api';
import { Book } from '../../shared/types/Book';
import { loadDataAction, removeAction, saveAction } from './books.actions';
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

function* save({
  payload: book,
}: ReturnType<typeof saveAction.request>): Generator {
  try {
    const serverBook = (yield saveBook(book)) as Book;
    yield put(saveAction.success(serverBook));
  } catch {
    yield put(saveAction.failure());
  }
}

export default function* booksSaga() {
  yield takeLatest(loadDataAction.request, loadData);
  yield takeLatest(removeAction.request, remove);
  yield takeLatest(saveAction.request, save);
}
