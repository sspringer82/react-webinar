import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import ListItem from './ListItem';
import { book } from './testdata';
import { MemoryRouter, useLocation } from 'react-router-dom';

const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

describe('ListItem', () => {
  describe('render', () => {
    it('should render a book correctly', () => {
      render(
        <MemoryRouter>
          <table>
            <tbody>
              <ListItem book={book} onDelete={vi.fn()} />
            </tbody>
          </table>
        </MemoryRouter>
      );

      expect(screen.getByTestId('title')).toHaveTextContent(
        'The Lord of the Rings'
      );
    });
  });

  describe('delete', () => {
    it('should trigger the onDelete function correctly', () => {
      const onDelete = vi.fn();
      render(
        <MemoryRouter>
          <table>
            <tbody>
              <ListItem book={book} onDelete={onDelete} />
            </tbody>
          </table>
        </MemoryRouter>
      );

      fireEvent.click(screen.getByTestId('delete-btn'));

      expect(onDelete).toHaveBeenCalled();
      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledWith(1);
    });
  });

  describe('edit', () => {
    it('should handle the edit link correctly', () => {
      render(
        <MemoryRouter>
          <LocationDisplay />
          <table>
            <tbody>
              <ListItem book={book} onDelete={vi.fn()} />
            </tbody>
          </table>
        </MemoryRouter>
      );

      fireEvent.click(screen.getByTestId('edit-btn'));

      expect(screen.getByTestId('location-display')).toHaveTextContent(
        '/list/edit/1'
      );
    });
  });
});
