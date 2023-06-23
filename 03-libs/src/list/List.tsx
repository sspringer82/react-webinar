import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import ListItem from './ListItem';
import useList from './useList';

import './List.scss';

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
        <div className="filterContainer">
          <TextField
            label="Filter"
            variant="standard"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple books overview table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Titel</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Preis</TableCell>
                <TableCell>Seiten</TableCell>
                <TableCell>Jahr</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.length > 0 ? (
                filteredBooks
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>keine Treffer</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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