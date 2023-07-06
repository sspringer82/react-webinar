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

import ListItem from './ListItem';
import { Book } from '../Book';
import { getBooks, removeBook } from './book.api';

const List: React.FC = () => {
  const { filter, handleFilterChange } = useFilter();

  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    getBooks()
      .then((data) => setBooks(data))
      .catch(() => setError(true));
  }, []);

  async function handleDelete(id: number): Promise<void> {
    await removeBook(id);
    setBooks((prevBooks) => prevBooks.filter((b) => b.id !== id));
  }

  let content = <div data-testid="no-books">Keine Bücher gefunden.</div>;

  if (error) {
    content = <div data-testid="error">Es ist ein Fehler aufgetreten</div>;
  } else if (books && books.length > 0) {
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
            inputProps={{ 'data-testid': 'filter' }}
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
                  <TableCell colSpan={7} data-testid="no-matches">
                    keine Treffer
                  </TableCell>
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
      {deleteError && (
        <div data-testid="delete-error">
          Beim Löschen ist ein Fehler aufgetreten
        </div>
      )}
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
