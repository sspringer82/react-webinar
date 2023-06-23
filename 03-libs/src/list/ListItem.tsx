import React from 'react';
import { Book } from '../shared/types/Book';
import { Button, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  book: Book;
  onDelete: (id: number) => Promise<void>;
};

const ListItem: React.FC<Props> = ({ book, onDelete }) => {
  const { t } = useTranslation();
  return (
    <TableRow>
      <TableCell>{book.title}</TableCell>
      <TableCell>{book.isbn}</TableCell>
      <TableCell>{book.author}</TableCell>
      <TableCell>{t('listItem.price', { price: book.price })}</TableCell>
      <TableCell>{t('listItem.pages', { pages: book.pages })}</TableCell>
      <TableCell>
        {t('listItem.release', {
          release: new Date(book.year, 0, 1),
          formatParams: {
            release: {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            },
          },
        })}
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(book.id)}
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
