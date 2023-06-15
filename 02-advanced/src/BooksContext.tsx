import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Book } from './shared/types/Book';

type BooksContextType = [Book[], Dispatch<SetStateAction<Book[]>>];

const BooksContext = createContext<BooksContextType | null>(null);

type Props = {
  children: ReactNode;
};
const BooksProvider: React.FC<Props> = ({ children }) => {
  const booksState = useState<Book[]>([]);

  return (
    <BooksContext.Provider value={booksState}>{children}</BooksContext.Provider>
  );
};

function useBooksContext(): BooksContextType {
  const booksContext = useContext(BooksContext);

  if (booksContext === null) {
    throw new Error('useBooksContext can only be used within a BooksProvider');
  }

  return booksContext;
}

export { BooksProvider, useBooksContext };
