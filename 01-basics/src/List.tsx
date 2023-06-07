import React, { ChangeEvent, useEffect, useState } from 'react';
import { Book } from './Book';
import ListItem from './ListItem';

import './List.css';
import styles from './List.module.css';
import './List.scss';

const List: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then((response) => {
        if (!response.ok) {
          setError('Das Laden der Bücher ist fehlgeschlagen');
        }
        return response.json();
      })
      .then((booksFromServer) => setBooks(booksFromServer));
  }, []);

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  }, [error]);

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
  }

  async function handleDelete(id: number): Promise<void> {
    if (confirm('biste sicher?')) {
      const response = await fetch(`http://localhost:3001/books/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBooks((previousBooks) => {
          return previousBooks.filter((book) => book.id !== id);
        });
      } else {
        setError('Das Löschen ist fehlgeschlagen');
      }
    }
  }

  let content = <div>Keine Bücher gefunden</div>;
  if (books.length > 0) {
    const filteredBooks = books
      .filter((book) => book.title.toLowerCase().includes(filter.toLowerCase()))
      .map((book) => (
        <ListItem key={book.id} book={book} onDelete={handleDelete} />
      ));

    content = (
      <>
        <div>
          <label>
            Filter:{' '}
            <input type="text" value={filter} onChange={handleFilterChange} />
          </label>
        </div>
        <table className={styles.listTable}>
          <thead>
            <tr>
              <th>Titel</th>
              <th>ISBN</th>
              <th>Autor</th>
              <th>Preis</th>
              <th>Seiten</th>
              <th>Jahr</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks
            ) : (
              <tr>
                <td colSpan={7}>keine Treffer</td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
  return (
    <div className="listContainer">
      <h1
        style={{
          color: error !== '' ? 'red' : 'green',
          textDecoration: 'underline',
        }}
      >
        Bücherliste
      </h1>
      {error != '' && <div>{error}</div>}
      {content}
    </div>
  );
};

export default List;
