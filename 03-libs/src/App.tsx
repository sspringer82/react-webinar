import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import List from './list/List';
import { BooksProvider } from './BooksContext';
import Form from './form/Form';
import NotFound from './NotFound';
import Edit from './edit/Edit';

// const App: React.FC = () => {
//   return (
//     <BooksProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Navigate to="/list" />} />
//           <Route path="/list" element={<List />}>
//             <Route path="edit/:id" element={<Edit />} />
//           </Route>
//           <Route path="/form" element={<Form />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </BooksProvider>
//   );
// };

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/list" />,
  },
  {
    path: '/form',
    element: <Form />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/list',
    element: <List />,
    children: [{ path: 'edit/:id', element: <Edit /> }],
  },
]);

const App: React.FC = () => {
  return (
    <BooksProvider>
      <RouterProvider router={router} />
    </BooksProvider>
  );
};

export default App;
