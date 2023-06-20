import React from 'react';
import { Book } from '../shared/types/Book';

type Props = {
  book: Book;
  onDelete: (id: number) => Promise<void>;
};

const ListItem: React.FC<Props> = ({ book, onDelete }) => {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.isbn}</td>
      <td>{book.author}</td>
      <td>{book.price}</td>
      <td>{book.pages}</td>
      <td>{book.year}</td>
      <td>
        <button onClick={() => onDelete(book.id)}>löschen</button>
      </td>
    </tr>
  );
};

export default ListItem;
