import './App.css';
import React, { Suspense } from 'react';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import LanguageSwitch from './LanguageSwitch';
import { BooksProvider } from './BooksContext';

const List = React.lazy(() => import('./list/List'));
const Form = React.lazy(() => import('./form/Form'));
const Edit = React.lazy(() => import('./edit/Edit'));
const NotFound = React.lazy(() => import('./NotFound'));

import './i18n';

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
        <Suspense fallback={<div>...loading</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </BooksProvider>
    </QueryClientProvider>
  );
};

export default App;
