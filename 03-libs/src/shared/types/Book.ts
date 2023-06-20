export type Book = {
  id: number;
  isbn: string;
  title: string;
  author: string;
  price: number;
  pages: number;
  year: number;
};

export type CreateBook = Omit<Book, 'id'> & { id?: number };
