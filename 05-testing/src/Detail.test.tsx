import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { book } from './testdata';
import Detail from './Detail';

describe('Detail', () => {
  it('should render', () => {
    render(<Detail book={book} />);

    expect(screen.getByRole('heading')).toHaveTextContent(
      'The Lord of the Rings'
    );
    expect(screen.getByTestId('author')).toHaveTextContent('J.R.R. Tolkien');
    expect(screen.getByTestId('isbn')).toHaveTextContent('978-3-548-06409-4');
  });

  it.each([
    { id: 'title', value: 'The Lord of the Rings' },
    { id: 'author', value: 'J.R.R. Tolkien' },
    { id: 'isbn', value: '978-3-548-06409-4' },
  ])('ensure $id is rendered with $value', ({ id, value }) => {
    render(<Detail book={book} />);
    expect(screen.getByTestId(id)).toHaveTextContent(value);
  });

  it('should match a snapshot', () => {
    const { asFragment } = render(<Detail book={book} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
