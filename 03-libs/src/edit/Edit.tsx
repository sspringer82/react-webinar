import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Book } from '../shared/types/Book';

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + '/books/' + id)
      .then((response) => response.json())
      .then((existingBook) => setBook(existingBook));
  }, [id]);

  return (
    <div>
      Edit {book?.title} works
      <Link to="/list">zurück</Link>
    </div>
  );
};

export default Edit;
