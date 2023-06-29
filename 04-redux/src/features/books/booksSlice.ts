import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Book, CreateBook } from '../../shared/types/Book';
import { getBooks, removeBook } from '../../api/book.api';

export const loadData = createAsyncThunk(
  'books/loadData',
  async (obj, { rejectWithValue }) => {
    try {
      const books = await getBooks();
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
      await removeBook(id);
      return id;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState: { books: [] as Book[] },
  reducers: {
    remove(state, action: PayloadAction<number>) {
      const index = state.books.findIndex((book) => book.id === action.payload);
      state.books.splice(index, 1);
    },
    save(state, action: PayloadAction<CreateBook>) {
      if (action.payload.id) {
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        state.books[index] = action.payload as Book;
      } else {
        const nextId = Math.max(...state.books.map((book) => book.id)) + 1;
        state.books.push({ ...action.payload, id: nextId });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadData.fulfilled, (state, action) => {
      if (action.payload) {
        state.books = action.payload;
      }
    });

    builder.addCase(remove.fulfilled, (state, action) => {
      const index = state.books.findIndex((book) => book.id === action.payload);
      state.books.splice(index, 1);
    });
  },
});

export const { save } = booksSlice.actions;

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

export default booksSlice.reducer;
