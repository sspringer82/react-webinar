import { describe, it, vi } from 'vitest';
import { twoBooks } from '../testdata';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import List from './List';

let loadingState = 'completed';
let removeState = 'completed';

vi.mock('react-redux', () => {
  return {
    useSelector(selector: string) {
      switch (selector) {
        case 'selectBooks':
          return twoBooks;
        case 'selectLoadingState':
          return loadingState;
        case 'selectRemoveState':
          return removeState;
      }
    },
  };
});

vi.mock('../../app/hooks', () => {
  return {
    useAppDispatch() {
      return dispatchSpy;
    },
  };
});

let removeSpy;
let loadDataSpy;
let dispatchSpy;

vi.mock('./booksSlice', () => {
  return {
    selectBooks: 'selectBooks',
    remove: (...args) => removeSpy(...args),
    selectLoadingState: 'selectLoadingState',
    loadData: () => loadDataSpy(),
    selectRemoveState: 'selectRemoveState',
  };
});

describe('List', () => {
  beforeEach(() => {
    removeSpy = vi.fn();
    dispatchSpy = vi.fn();
    loadDataSpy = vi.fn();
  });
  afterEach(() => {
    loadingState = null;
    removeState = null;
  });

  it('should render the list', () => {
    loadingState = 'completed';
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    const titles = screen.getAllByTestId('title');
    expect(titles).toHaveLength(2);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(loadDataSpy).toHaveBeenCalled();
  });

  it('should show the loading state', () => {
    loadingState = 'pending';
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loadingState')).toHaveTextContent('...loading');
  });

  it('should show an error message', () => {
    loadingState = 'error';
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );
    expect(screen.getByTestId('errorState')).toHaveTextContent(
      'Ein Fehler ist aufgetreten!'
    );
  });

  it('should show the delete pending message', () => {
    removeState = 'pending';
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );
    expect(screen.getByTestId('removePending')).toHaveTextContent(
      'Datensatz wird gelöscht'
    );
  });

  it('should show the delete error message', () => {
    removeState = 'error';
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );
    expect(screen.getByTestId('removeError')).toHaveTextContent(
      'Beim Löschen ist ein Fehler aufgetreten'
    );
  });

  it('should dispatch the remove action', () => {
    removeSpy = vi.fn().mockReturnValue('removeSpy');
    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByTestId('delete-btn')[0]);

    expect(removeSpy).toHaveBeenCalledWith(1);
    expect(dispatchSpy).toHaveBeenCalledWith('removeSpy');
  });
});
