import React from 'react';
import { Book } from './Book';

type Props = {
  book: Book;
};

const Detail: React.FC<Props> = ({ book }) => {
  return (
    <div>
      <h1 data-testid="title">{book.title}</h1>
      <div data-testid="author">{book.author}</div>
      <div data-testid="isbn">{book.isbn}</div>
    </div>
  );
};

export default Detail;
