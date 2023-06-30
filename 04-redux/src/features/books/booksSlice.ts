import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Book, CreateBook } from '../../shared/types/Book';
import { getBooks, removeBook, saveBook } from '../../api/book.api';
import { ActionType, getType } from 'typesafe-actions';
import { loadDataAction, removeAction, saveAction } from './books.actions';

type State = null | 'pending' | 'completed' | 'error';

type BooksState = {
  books: Book[];
  loadingState: State;
  removeState: State;
  saveState: State;
};

const initialState: BooksState = {
  books: [],
  loadingState: null,
  removeState: null,
  saveState: null,
};

export const loadData = createAsyncThunk(
  'books/loadData',
  async (obj, { rejectWithValue }) => {
    try {
      const books = await getBooks('');
      return books;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const remove = createAsyncThunk(
  'books/remove',
  async (id: number, { rejectWithValue }) => {
    try {
      await removeBook(id, '');
      return id;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const save = createAsyncThunk(
  'books/save',
  async (book: CreateBook, { rejectWithValue }) => {
    try {
      const data = await saveBook(book, '');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- loadData ---
    builder
      .addCase(getType(loadDataAction.request), (state) => {
        state.loadingState = 'pending';
      })
      .addCase(
        getType(loadDataAction.success),
        (state, action: ActionType<typeof loadDataAction.success>) => {
          state.loadingState = 'completed';
          state.books = action.payload;
        }
      )
      .addCase(getType(loadDataAction.failure), (state) => {
        state.loadingState = 'error';
      });

    // --- remove ---
    builder
      .addCase(getType(removeAction.request), (state) => {
        state.removeState = 'pending';
      })
      .addCase(
        getType(removeAction.success),
        (state, action: ActionType<typeof removeAction.success>) => {
          const index = state.books.findIndex(
            (book) => book.id === action.payload
          );
          state.books.splice(index, 1);
          state.removeState = 'completed';
        }
      )
      .addCase(getType(removeAction.failure), (state) => {
        state.removeState = 'error';
      });

    // --- save ---
    builder
      .addCase(getType(saveAction.request), (state) => {
        state.saveState = 'pending';
      })
      .addCase(
        getType(saveAction.success),
        (state, action: ActionType<typeof saveAction.success>) => {
          if (action.payload.id) {
            const index = state.books.findIndex(
              (book) => book.id === action.payload.id
            );
            state.books[index] = action.payload as Book;
          } else {
            state.books.push(action.payload);
          }
          state.saveState = 'completed';
        }
      )
      .addCase(getType(saveAction.failure), (state) => {
        state.saveState = 'error';
      });
  },
});

export const selectBooks = (state: RootState) => state.books.books;
export const selectLoadingState = (state: RootState) =>
  state.books.loadingState;
export const selectRemoveState = (state: RootState) => state.books.removeState;
export const selectSaveState = (state: RootState) => state.books.saveState;

export function selectBook(state: RootState): (id?: number) => CreateBook {
  return (id?: number): CreateBook => {
    const book = selectBooks(state).find((book) => book.id === id);
    if (!book) {
      return {
        isbn: '',
        title: '',
        author: '',
        price: 0,
        pages: 0,
        year: 0,
      };
    }
    return book;
  };
}

export default booksSlice.reducer;
