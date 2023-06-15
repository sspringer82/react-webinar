import { useState, useEffect, ChangeEvent } from 'react';
import { Book } from '../shared/types/Book';

type UseListReturnType = [
  books: Book[],
  filter: string,
  error: string,
  handleDelete: (id: number) => Promise<void>,
  handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void
];

export default function useList(): UseListReturnType {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + '/books')
      .then((response) => {
        if (!response.ok) {
          setError('Das Laden der Bücher ist fehlgeschlagen');
        }
        return response.json();
      })
      .then((booksFromServer) => setBooks(booksFromServer));
  }, []);

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  }, [error]);

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
  }

  async function handleDelete(id: number): Promise<void> {
    if (confirm('biste sicher?')) {
      const response = await fetch(`http://localhost:3001/books/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBooks((previousBooks) => {
          return previousBooks.filter((book) => book.id !== id);
        });
      } else {
        setError('Das Löschen ist fehlgeschlagen');
      }
    }
  }

  return [books, filter, error, handleDelete, handleFilterChange];
}
