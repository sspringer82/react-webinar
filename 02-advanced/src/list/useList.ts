import { useState, useEffect, ChangeEvent } from 'react';
import { Book } from '../shared/types/Book';
import { useBooksContext } from '../BooksContext';

type UseListReturnType = [
  books: Book[],
  filter: string,
  error: string,
  handleDelete: (id: number) => Promise<void>,
  handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void
];

export default function useList(): UseListReturnType {
  const [books, dispatch] = useBooksContext();
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch({ type: 'FETCH' });
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
      dispatch({ type: 'DELETE', payload: id });
    }
  }

  return [books, filter, error, handleDelete, handleFilterChange];
}
