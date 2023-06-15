import React, { useState } from 'react';
import ListItem from './ListItem';

import './List.scss';
import useList from './useList';

const List: React.FC = () => {
  const [books, filter, error, handleDelete, handleFilterChange] = useList();

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
        <table>
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
