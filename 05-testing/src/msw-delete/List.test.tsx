import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, afterAll, describe, it, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { twoBooks } from '../testdata';
import List from './List';

const handlers = [
  rest.get('http://localhost:3001/books', (request, response, context) => {
    return response(context.status(200), context.json(twoBooks));
  }),
  rest.delete(
    'http://localhost:3001/books/:id',
    (request, response, context) => {
      const { id } = request.params;
      if (id === '1') {
        return response(context.status(200), context.text(''));
      } else {
        return response(context.status(500), context.text('whoops'));
      }
    }
  ),
];

const server = setupServer(...handlers);

describe('List', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should delete an element', async () => {
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    await waitFor(async () => {
      const books = await screen.findAllByTestId('title');
      expect(books).toHaveLength(2);
    });

    fireEvent.click(screen.queryAllByTestId('delete-btn')[0]);

    await waitFor(async () => {
      const books = await screen.findAllByTestId('title');
      expect(books).toHaveLength(1);
    });
  });
});
