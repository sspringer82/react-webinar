import React from 'react';
import { Button, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { Book } from '../Book';

type Props = {
  book: Book;
  onDelete: (id: number) => Promise<void>;
};

const ListItem: React.FC<Props> = ({ book, onDelete }) => {
  return (
    <TableRow>
      <TableCell data-testid="title">{book.title}</TableCell>
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
          data-testid="delete-btn"
        >
          löschen
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          component={Link}
          to={`/list/edit/${book.id}`}
        >
          bearbeiten
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
