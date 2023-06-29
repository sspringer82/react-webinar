import { Epic, combineEpics, ofType } from 'redux-observable';
import { loadDataAction, removeAction, saveAction } from './books.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { getBooks, removeBook, saveBook } from '../../api/book.api';

const loadData: Epic = (action$) =>
  action$.pipe(
    ofType(loadDataAction.request),
    switchMap(() =>
      from(getBooks()).pipe(
        map((data) => loadDataAction.success(data)),
        catchError((error) => of(loadDataAction.failure(error)))
      )
    )
  );

const remove: Epic = (action$) =>
  action$.pipe(
    ofType(removeAction.request),
    switchMap(({ payload: id }) =>
      from(removeBook(id)).pipe(
        map(() => removeAction.success(id)),
        catchError((error) => of(removeAction.failure(error)))
      )
    )
  );

const save: Epic = (action$) =>
  action$.pipe(
    ofType(saveAction.request),
    switchMap(({ payload: book }) =>
      from(saveBook(book)).pipe(
        map((data) => saveAction.success(data)),
        catchError((error) => of(saveAction.failure(error)))
      )
    )
  );

export default combineEpics(loadData, remove, save);
