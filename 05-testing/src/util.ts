import { Book } from './Book';

export function sortUnique(books: Book[]): Book[] {
  if (books.length === 0) {
    throw new Error('Books array must not be empty');
  }
  const uniqueBooks: Record<string, Book> = {};
  books.forEach((book) => {
    if (!uniqueBooks[book.isbn]) {
      uniqueBooks[book.isbn] = book;
    }
  });

  return Object.values(uniqueBooks).sort((a, b) => {
    if (a.title === b.title) {
      return 0;
    }
    return a.title < b.title ? -1 : 1;
  });
}

export function sortUniqueAsync(books: Book[]): Promise<Book[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(sortUnique(books));
    }, 2000);
  });
}
