import './App.css';
import React from 'react';
import List from './list/List';
import { BooksProvider } from './BooksContext';
import Form from './form/Form';

const App: React.FC = () => {
  return (
    <BooksProvider>
      <Form />
      <hr />
      <List />
    </BooksProvider>
  );
};

export default App;
