import './App.css';
import React from 'react';
import List from './list/List';
import { BooksProvider } from './BooksContext';

const App: React.FC = () => {
  return (
    <BooksProvider>
      <List />
    </BooksProvider>
  );
};

export default App;
