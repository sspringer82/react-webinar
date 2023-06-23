import './App.css';
import React from 'react';
import List from './list/List';
import { BooksProvider } from './BooksContext';
import Form from './form/Form';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './NotFound';

const App: React.FC = () => {
  return (
    <BooksProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/list" element={<List />} />
          <Route path="/form" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </BooksProvider>
  );
};

export default App;
