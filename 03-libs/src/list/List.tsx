import React from 'react';
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
import AddIcon from '@mui/icons-material/Add';

import ListItem from './ListItem';
import useList from './useList';

import './List.scss';
import { Link, Outlet } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBooks, removeBook } from '../api/book.api';
import { useTranslation } from 'react-i18next';

const List: React.FC = () => {
  const [, filter, error, , handleFilterChange] = useList();

  const { t } = useTranslation();

  const { data: books } = useQuery(['books'], getBooks, { suspense: true });

  const queryClient = useQueryClient();
  const mutation = useMutation(removeBook, {
    onSuccess() {
      queryClient.invalidateQueries(['books']);
    },
  });

  let content = <div>Keine Bücher gefunden</div>;
  if (books && books.length > 0) {
    const filteredBooks = books
      .filter((book) => book.title.toLowerCase().includes(filter.toLowerCase()))
      .map((book) => (
        <ListItem
          key={book.id}
          book={book}
          onDelete={async (id: number) => {
            mutation.mutate(id);
          }}
        />
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
        <div>{t('list.filterResults', { count: filteredBooks.length })}</div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple books overview table"
          >
            <TableHead>
              <TableRow>
                <TableCell>{t('list.title')}</TableCell>
                <TableCell>{t('list.isbn')}</TableCell>
                <TableCell>{t('list.author')}</TableCell>
                <TableCell>{t('list.price')}</TableCell>
                <TableCell>{t('list.pages')}</TableCell>
                <TableCell>{t('list.year')}</TableCell>
                <TableCell colSpan={2}></TableCell>
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
        {t('title')}
      </h1>
      {error != '' && <div>{error}</div>}
      {content}
      <Fab
        color="primary"
        aria-label="add new book"
        className="fab"
        component={Link}
        to="/form"
      >
        <AddIcon />
      </Fab>
      <Outlet></Outlet>
    </div>
  );
};

export default List;
