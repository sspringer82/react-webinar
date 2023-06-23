import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from '../shared/types/Book';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Form from '../form/Form';

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + '/books/' + id)
      .then((response) => response.json())
      .then((existingBook) => setBook(existingBook));
  }, [id]);

  return (
    <Dialog open={true} onClose={() => navigate('/list')}>
      <DialogTitle>Buch bearbeiten</DialogTitle>
      <DialogContent>
        <Form book={book} />
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
