import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Book, CreateBook } from '../../shared/types/Book';
import { getBooks, removeBook, saveBook } from '../../api/book.api';

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
      return getBooks();
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const remove = createAsyncThunk(
  'books/remove',
  async (id: number, { rejectWithValue }) => {
    try {
      await removeBook(id);
      return id;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const save = createAsyncThunk(
  'books/save',
  async (book: CreateBook, { rejectWithValue }) => {
    try {
      return saveBook(book);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- load data ---
    addLoadCase(builder);

    // --- remove data ---
    builder
      .addCase(remove.pending, (state) => {
        state.removeState = 'pending';
      })
      .addCase(remove.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (book) => book.id === action.payload
        );
        state.books.splice(index, 1);
        state.removeState = 'completed';
      })
      .addCase(remove.rejected, (state) => {
        state.removeState = 'error';
      });

    // --- save data ---
    builder
      .addCase(save.pending, (state) => {
        state.saveState = 'pending';
      })
      .addCase(save.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.id) {
            const index = state.books.findIndex(
              (book) => book.id === action.payload?.id
            );
            state.books[index] = action.payload;
          } else {
            state.books.push(action.payload);
          }
        }
        state.saveState = 'completed';
      })
      .addCase(save.rejected, (state) => {
        state.saveState = 'error';
      });
  },
});

function addLoadCase(builder: ActionReducerMapBuilder<BooksState>) {
  builder
    .addCase(loadData.pending, (state) => {
      state.loadingState = 'pending';
    })
    .addCase(loadData.fulfilled, (state, action) => {
      if (action.payload) {
        state.books = action.payload;
      }
      state.loadingState = 'completed';
    })
    .addCase(loadData.rejected, (state) => {
      state.loadingState = 'error';
    });
}

export const selectBooks = (state: RootState) => state.books.books;
export function selectBook(state: RootState): (id?: number) => CreateBook {
  return (id?: number): CreateBook => {
    const book = selectBooks(state).find((book) => book.id === id);
    if (!book) {
      return {
        isbn: '',
        title: '',
        author: '',
        pages: 0,
        price: 0,
        year: 0,
      };
    }
    return book;
  };
}

export const selectLoadingState = (state: RootState) =>
  state.books.loadingState;
export const selectRemoveState = (state: RootState) => state.books.removeState;
export const selectSaveState = (state: RootState) => state.books.saveState;

export default booksSlice.reducer;
