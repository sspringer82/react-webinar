import { render, screen } from '@testing-library/react';
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
];

const server = setupServer(...handlers);

describe('List', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

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

  it('should render an empty list', async () => {
    server.use(
      rest.get('http://localhost:3001/books', (request, response, context) => {
        return response(context.status(200), context.json([]));
      })
    );

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    const noBooks = await screen.findByTestId('no-books');
    expect(noBooks).toHaveTextContent('Keine Bücher gefunden.');

    const books = await screen.queryAllByTestId('title');
    expect(books).toHaveLength(0);
  });

  it('should show the error message', async () => {
    server.use(
      rest.get('http://localhost:3001/books', (request, response, context) => {
        return response(context.status(500), context.text('An error happened'));
      })
    );

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    const error = await screen.findByTestId('error');

    expect(error).toHaveTextContent('Es ist ein Fehler aufgetreten');

    expect(screen.queryByTestId('title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('not-found')).not.toBeInTheDocument();
  });
});
