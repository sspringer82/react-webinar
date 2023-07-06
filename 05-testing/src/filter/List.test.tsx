import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import List from './List';
import { twoBooks } from '../testdata';
import { MemoryRouter } from 'react-router-dom';

describe('List', () => {
  it('should filter the list', () => {
    render(
      <MemoryRouter>
        <List books={twoBooks} onDelete={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('title')).toHaveLength(2);

    fireEvent.change(screen.getByTestId('filter'), {
      target: { value: 'Guid' },
    });

    const titles = screen.getAllByTestId('title');
    expect(titles).toHaveLength(1);
    expect(titles[0]).toHaveTextContent("The Hitchhiker's Guide to the Galaxy");

    const lordoftherings = screen.queryByText('The Lord of the Rings');
    expect(lordoftherings).not.toBeInTheDocument();
  });
});
