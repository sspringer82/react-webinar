import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import {
  selectBooks,
  selectLoadingState,
  selectRemoveState,
} from '../booksSlice';
import { useAppDispatch } from '../../../app/hooks';

import ListItem from './ListItem';
import { loadDataAction, removeAction } from '../books.actions';

const List: React.FC = () => {
  const { filter, handleFilterChange } = useFilter();
  const dispatch = useAppDispatch();
  const loadingState = useSelector(selectLoadingState);
  const removeState = useSelector(selectRemoveState);

  const books = useSelector(selectBooks);

  useEffect(() => {
    dispatch(loadDataAction.request());
  }, []);

  async function handleDelete(id: number): Promise<void> {
    dispatch(removeAction.request(id));
  }

  let content = <div>Keine Bücher gefunden.</div>;

  if (loadingState === 'pending') {
    return <div>...lade</div>;
  } else if (loadingState === 'error') {
    return <div>Es ist ein Fehler aufgetreten</div>;
  } else {
    if (books && books.length > 0) {
      const filteredBooks = books
        .filter((book) =>
          book.title.toLowerCase().includes(filter.toLowerCase())
        )
        .map((book) => (
          <ListItem key={book.id} book={book} onDelete={handleDelete} />
        ));

      content = (
        <>
          {removeState === 'pending' && <div>Datensatz wird gelöscht</div>}
          {removeState === 'error' && (
            <div>Beim löschen ist ein Fehler aufgetreten</div>
          )}
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
  }
};

export default List;
