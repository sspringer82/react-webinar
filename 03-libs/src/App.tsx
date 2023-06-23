import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import List from './list/List';
import { BooksProvider } from './BooksContext';
import Form from './form/Form';
import NotFound from './NotFound';
import Edit from './edit/Edit';

const App: React.FC = () => {
  return (
    <BooksProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/list" element={<List />} />
          <Route path="/form" element={<Form />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </BooksProvider>
  );
};

export default App;
