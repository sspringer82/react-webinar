import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import './List.scss';
import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import useFilter from './useFilter';
import { Book } from '../shared/types/Book';
import { getBooks, removeBook } from '../api/book.api';

const ListItem = React.lazy(() => import('./ListItem'));

const List: React.FC = () => {
  const { filter, handleFilterChange } = useFilter();

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);

  async function handleDelete(id: number): Promise<void> {
    await removeBook(id);
    setBooks((prevBooks) => {
      return prevBooks.filter((book) => book.id !== id);
    });
  }

  let content = <div>Keine Bücher gefunden.</div>;

  if (books && books.length > 0) {
    const filteredBooks = books
      .filter((book) => book.title.toLowerCase().includes(filter.toLowerCase()))
      .map((book) => (
        <ListItem key={book.id} book={book} onDelete={handleDelete} />
      ));

    content = (
      <>
        <div>
          <TextField
            label="Filter"
            type="text"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        <div>Treffer: {filteredBooks.length}</div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Titel</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Preis</TableCell>
                <TableCell>Seiten</TableCell>
                <TableCell>Jahr</TableCell>
                <TableCell></TableCell>
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
        <Outlet></Outlet>
      </>
    );
  }
  return (
    <div className="listContainer">
      <h1
        style={{
          textDecoration: 'underline',
        }}
      >
        Bücherliste 📚
      </h1>
      {content}
      <Fab
        color="primary"
        aria-label="add"
        className="fab"
        component={Link}
        to="/form"
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default List;
