import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import {
  selectBooks,
  remove,
  selectLoadingState,
  loadData,
  selectRemoveState,
} from './booksSlice';

const List: React.FC = () => {
  const books = useSelector(selectBooks);
  const loadingState = useSelector(selectLoadingState);
  const removeState = useSelector(selectRemoveState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  if (loadingState === 'pending') {
    return <div data-testid="loadingState">...loading</div>;
  } else if (loadingState === 'error') {
    return <div data-testid="errorState">Ein Fehler ist aufgetreten!</div>;
  } else {
    return (
      <>
        {removeState === 'pending' && (
          <div data-testid="removePending">Datensatz wird gelöscht</div>
        )}
        {removeState === 'error' && (
          <div data-testid="removeError">
            Beim Löschen ist ein Fehler aufgetreten
          </div>
        )}
        <table>
          <thead>
            <tr>
              <td>Titel</td>
              <td>Autor</td>
              <td>ISBN</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td data-testid="title">{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>
                  <button
                    onClick={() => dispatch(remove(book.id))}
                    data-testid="delete-btn"
                  >
                    löschen
                  </button>
                </td>
                <td>
                  <button onClick={() => navigate(`/edit/${book.id}`)}>
                    bearbeiten
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => navigate('/new')}>neu</button>
      </>
    );
  }
};

export default List;
