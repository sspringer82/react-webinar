/* eslint-disable no-case-declarations */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Book, CreateBook } from './shared/types/Book';
import books from './books';
import { produce } from 'immer';

type BooksContextType = [Book[], Dispatch<Action>];

const BooksContext = createContext<BooksContextType | null>(null);

type Action = {
  type:
    | 'FETCH'
    | 'FETCH_SUCCESS'
    | 'DELETE'
    | 'DELETE_SUCCESS'
    | 'SAVE'
    | 'SAVE_SUCCESS';
  payload?: number | CreateBook | Book[];
};

function middleware(dispatch: Dispatch<Action>) {
  return async function (action: Action) {
    switch (action.type) {
      case 'SAVE':
        const createResponse = await fetch(
          import.meta.env.VITE_BACKEND_URL + '/books',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action.payload),
          }
        );
        const newBook = await createResponse.json();
        dispatch({ type: 'SAVE_SUCCESS', payload: newBook });
        break;
      case 'FETCH':
        const fetchResponse = await fetch(
          import.meta.env.VITE_BACKEND_URL + '/books'
        );
        const books = await fetchResponse.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: books });
        break;
      case 'DELETE':
        await fetch(`http://localhost:3001/books/${action.payload}`, {
          method: 'DELETE',
        });
        dispatch({ type: 'DELETE_SUCCESS', payload: action.payload });
        break;
    }
  };
}

function reducer(state: Book[], action: Action) {
  switch (action.type) {
    case 'DELETE_SUCCESS':
      return produce(state, (draftState) => {
        return draftState.filter((book) => book.id !== action.payload);
      });
    case 'FETCH_SUCCESS':
      return action.payload as Book[];
    case 'SAVE_SUCCESS':
      return produce(state, (draftState) => {
        draftState.push(action.payload as Book);
      });
    default:
      return state;
  }
}

type Props = {
  children: ReactNode;
};
const BooksProvider: React.FC<Props> = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, []);

  const middlewareDispatch = useMemo(() => middleware(dispatch), [dispatch]);

  return (
    <BooksContext.Provider value={[data, middlewareDispatch]}>
      {children}
    </BooksContext.Provider>
  );
};

function useBooksContext(): BooksContextType {
  const booksContext = useContext(BooksContext);

  if (booksContext === null) {
    throw new Error('useBooksContext can only be used within a BooksProvider');
  }

  return booksContext;
}

export { BooksProvider, useBooksContext };
