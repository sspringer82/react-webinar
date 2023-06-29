import { Book, CreateBook } from '../shared/types/Book';

export async function getBooks(token: string): Promise<Book[]> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/books/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Response not OK');
  }
  const data = await response.json();
  return data;
}

export async function getBook(id: number, token: string): Promise<Book> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/books/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!response.ok) {
    throw new Error('Response not OK');
  }
  const data = await response.json();
  return data;
}

export async function removeBook(id: number, token: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/books/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Response not OK');
  }
}

export async function saveBook(book: CreateBook, token: string): Promise<Book> {
  let url = `${import.meta.env.VITE_BACKEND_URL}/books`;
  let method = 'POST';
  if (book.id) {
    url += `/${book.id}`;
    method = 'PUT';
  }
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error('Unable to save');
  }

  const data = await response.json();
  return data;
}
