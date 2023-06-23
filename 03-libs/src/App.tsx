import './App.css';
import React, { Suspense } from 'react';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import List from './list/List';
import { BooksProvider } from './BooksContext';
import Form from './form/Form';
import NotFound from './NotFound';
import Edit from './edit/Edit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import './i18n';
import LanguageSwitch from './LanguageSwitch';

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
    element: (
      <ErrorBoundary
        FallbackComponent={({ error }) => <div>{error.message}</div>}
      >
        <Suspense fallback={<div>...lade Daten</div>}>
          <List />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [{ path: 'edit/:id', element: <Edit /> }],
  },
]);

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BooksProvider>
        <LanguageSwitch />
        <RouterProvider router={router} />
      </BooksProvider>
    </QueryClientProvider>
  );
};

export default App;
