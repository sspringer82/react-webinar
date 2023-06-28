import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Form from './form/Form';
import List from './list/List';
import Edit from './edit/Edit';
import NotFound from './NotFound';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/list" element={<List />}>
            <Route path="edit/:id" element={<Edit />} />
          </Route>
          <Route path="/form" element={<Form book={null} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
