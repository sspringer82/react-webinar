import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Form from './features/books/form/Form';
import List from './features/books/list/List';
import Edit from './features/books/edit/Edit';
import NotFound from './NotFound';

// import viteLogo from '/vite.svg'; // import aus dem public verzeichnis
// import reactLogo from './assets/react.svg'; // import aus dem lokalen assets verzeichnis

const App: React.FC = () => {
  return (
    <>
      {/* <img src={reactLogo} /> */}
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
