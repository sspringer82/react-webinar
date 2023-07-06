import { describe, it } from 'vitest';
import { sortUnique, sortUniqueAsync } from './util';
import { twoBooks, twoDuplicateBooks } from './testdata';

describe('sortUnique', () => {
  it('should sort books by their title', () => {
    const sortedBooks = sortUnique(twoBooks);

    expect(sortedBooks[0].title).toBe("The Hitchhiker's Guide to the Galaxy");
    expect(sortedBooks[1].title).toBe('The Lord of the Rings');
  });

  it('should eliminate duplicates', () => {
    const sortedBooks = sortUnique(twoDuplicateBooks);

    expect(sortedBooks.length).toBe(1);
  });

  it('should throw an exception if an empty array is provided', () => {
    expect(() => sortUnique([])).toThrow();
    expect(() => sortUnique([])).toThrowError('Books array must not be empty');
  });
});

describe('sortUniqueAsync', () => {
  // done callback funktioniert in vitest nicht
  it('ACHTUNG - FUNKTIONIERT NICHT!!! should sort async', () => {
    sortUniqueAsync(twoBooks).then((sortedBooks) => {
      expect(sortedBooks[0].title).toBe("The Hitchhiker's Guide to the Galaxy");
      expect(sortedBooks[1].title).toBe('The Lord of the Rings');
    });
  });

  it('should sort async', async () => {
    const sortedBooks = await sortUniqueAsync(twoBooks);

    expect(sortedBooks[0].title).toBe("The Hitchhiker's Guide to the Galaxy");
    expect(sortedBooks[1].title).toBe('The Lord of the Rings');
  });

  it('should sort async', async () => {
    const sortedBooksPromise = sortUniqueAsync(twoBooks);
    await sortedBooksPromise;

    expect(sortedBooksPromise).resolves.toHaveLength(2);
  });
});
