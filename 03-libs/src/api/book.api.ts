import { Book } from '../shared/types/Book';

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/books');
  if (!response.ok) {
    throw new Error('Response not OK ⚠️');
  }
  return response.json();
}

export async function removeBook(id: number): Promise<void> {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + '/books/' + id,
    { method: 'DELETE' }
  );

  if (!response.ok) {
    throw new Error('Response not OK ⚠️');
  }
}
