import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../form/Form';
import { useEffect, useState } from 'react';
import { Book } from '../../../shared/types/Book';
import { useSelector } from 'react-redux';
import { selectBook } from '../booksSlice';

const Edit: React.FC = () => {
  const getBook = useSelector(selectBook);

  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      setBook(getBook(parseInt(id, 10)) as Book);
    }
  }, [id]);

  return (
    <Dialog
      open={true}
      onClose={() => {
        navigate('/list');
      }}
      aria-labelledby="form-dialog-title"
      aria-describedby="form-dialog-description"
    >
      <DialogTitle id="form-dialog-title">Buch bearbeiten</DialogTitle>
      <DialogContent id="form-dialog-description">
        <Form book={book} />
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
