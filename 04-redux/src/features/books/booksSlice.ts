import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import books from '../../books';
import { RootState } from '../../app/store';
import { Book, CreateBook } from '../../shared/types/Book';

export const booksSlice = createSlice({
  name: 'books',
  initialState: { books: books },
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
});

export const { remove, save } = booksSlice.actions;

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
