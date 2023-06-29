import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Form from './features/books/form/Form';
import List from './features/books/list/List';
import Edit from './features/books/edit/Edit';
import NotFound from './NotFound';
import { useSelector } from 'react-redux';
import { selectToken } from './features/login/booksSlice';
import Login from './features/login/Login';

// import viteLogo from '/vite.svg'; // import aus dem public verzeichnis
// import reactLogo from './assets/react.svg'; // import aus dem lokalen assets verzeichnis

const App: React.FC = () => {
  const token = useSelector(selectToken);

  return (
    <>
      {/* <img src={reactLogo} /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/list" /> : <Login />}
          />
          <Route path="/list" element={token ? <List /> : <Login />}>
            <Route path="edit/:id" element={token ? <Edit /> : <Login />} />
          </Route>
          <Route
            path="/form"
            element={token ? <Form book={null} /> : <Login />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
