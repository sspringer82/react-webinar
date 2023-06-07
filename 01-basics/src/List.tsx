import React, { useState } from 'react';
import { Book } from './Book';
import ListItem from './ListItem';

const List: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  function handleDelete(id: number): void {
    setBooks((previousBooks) => {
      return previousBooks.filter((book) => book.id !== id);
    });
  }

  let content = <div>Keine Bücher gefunden</div>;
  if (books.length > 0) {
    content = (
      <table>
        <thead>
          <tr>
            <th>Titel</th>
            <th>ISBN</th>
            <th>Autor</th>
            <th>Preis</th>
            <th>Seiten</th>
            <th>Jahr</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <ListItem key={book.id} book={book} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div>
      <h1>Bücherliste</h1>
      {content}
    </div>
  );
};

export default List;
