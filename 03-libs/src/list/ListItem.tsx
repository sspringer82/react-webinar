import React from 'react';
import { Book } from '../shared/types/Book';
import { Button, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  book: Book;
  onDelete: (id: number) => Promise<void>;
};

const ListItem: React.FC<Props> = ({ book, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{book.title}</TableCell>
      <TableCell>{book.isbn}</TableCell>
      <TableCell>{book.author}</TableCell>
      <TableCell>{book.price}</TableCell>
      <TableCell>{book.pages}</TableCell>
      <TableCell>{book.year}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(book.id)}
        >
          löschen
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
