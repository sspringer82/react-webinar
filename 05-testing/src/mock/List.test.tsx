import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, vi } from 'vitest';
import { twoBooks } from '../testdata';
import List from './List';

vi.mock('./book.api.ts', () => {
  return {
    getBooks: vi.fn().mockResolvedValue(twoBooks),
    removeBook: vi.fn().mockResolvedValue(true),
  };
});

describe('List', () => {
  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should render the list', async () => {
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    const books = await screen.findAllByTestId('title');

    expect(books).toHaveLength(2);
    expect(books[0]).toHaveTextContent('The Lord of the Rings');
    expect(books[1]).toHaveTextContent("The Hitchhiker's Guide to the Galaxy");
  });

  it('should remove an entry', async () => {
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    const existingBooks = await screen.findAllByTestId('title');
    expect(existingBooks).toHaveLength(2);

    fireEvent.click(screen.getAllByTestId('delete-btn')[0]); // löschen von LOTR

    await waitFor(async () => {
      const books = await screen.findAllByTestId('title');
      expect(books).toHaveLength(1);
    });
    expect(screen.queryByText('The Lord of the Rings')).not.toBeInTheDocument();
    expect(
      screen.getByText("The Hitchhiker's Guide to the Galaxy")
    ).toBeInTheDocument();
  });
});
