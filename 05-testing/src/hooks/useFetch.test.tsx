import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { twoBooks } from '../testdata';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';
import { Book } from '../Book';

const server = setupServer(
  rest.get('http://localhost:3002/books', (request, response, context) => {
    return response(context.status(200), context.json(twoBooks));
  })
);

const FetchWrapper: React.FC = () => {
  const items = useFetch<Book>('http://localhost:3002/books');
  return (
    <div>
      {items.map((item) => (
        <div data-testid="title" key={item.id}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

describe('Hook Testing', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should use renderHook', async () => {
    const { result } = renderHook(() =>
      useFetch<Book>('http://localhost:3002/books')
    );

    await waitFor(() => {
      expect(result.current).toHaveLength(2);
    });
  });

  it('should render with wrapper', async () => {
    render(<FetchWrapper />);

    const titles = await screen.findAllByTestId('title');

    expect(titles).toHaveLength(2);
  });
});
