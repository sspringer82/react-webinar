import { Epic, combineEpics, ofType } from 'redux-observable';
import { loadDataAction, removeAction, saveAction } from './books.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { getBooks, removeBook, saveBook } from '../../api/book.api';
import { selectToken } from '../login/booksSlice';

const loadData: Epic = (action$, state$) =>
  action$.pipe(
    ofType(loadDataAction.request),
    switchMap(() =>
      from(getBooks(selectToken(state$.value))).pipe(
        map((data) => loadDataAction.success(data)),
        catchError((error) => of(loadDataAction.failure(error)))
      )
    )
  );

const remove: Epic = (action$, state$) =>
  action$.pipe(
    ofType(removeAction.request),
    switchMap(({ payload: id }) =>
      from(removeBook(id, selectToken(state$.value))).pipe(
        map(() => removeAction.success(id)),
        catchError((error) => of(removeAction.failure(error)))
      )
    )
  );

const save: Epic = (action$, state$) =>
  action$.pipe(
    ofType(saveAction.request),
    switchMap(({ payload: book }) =>
      from(saveBook(book, selectToken(state$.value))).pipe(
        map((data) => saveAction.success(data)),
        catchError((error) => of(saveAction.failure(error)))
      )
    )
  );

export default combineEpics(loadData, remove, save);
