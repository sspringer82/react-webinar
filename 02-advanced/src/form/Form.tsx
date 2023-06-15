import React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { CreateBook } from '../shared/types/Book';
import { useBooksContext } from '../BooksContext';

import './Form.scss';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues: CreateBook = {
  isbn: '',
  title: '',
  author: '',
  price: 0,
  pages: 0,
  year: 0,
};

const Form: React.FC = () => {
  const [, dispatch] = useBooksContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBook>({
    defaultValues,
  });

  function onSubmit(book: CreateBook): void {
    dispatch({ type: 'SAVE', payload: book });
    reset(defaultValues);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div>
        <label>
          ISBN:
          <input type="text" {...register('isbn')} />
        </label>
      </div>
      <div>
        <label>
          Titel:
          <input
            type="text"
            className={classNames({ error: errors.title })}
            {...register('title', { required: true, maxLength: 20 })}
          />
        </label>
        {errors.title && errors.title.type === 'required' && (
          <div className="errorMessage">Der Titel ist ein Pflichtfeld</div>
        )}
        {errors.title && errors.title.type === 'maxLength' && (
          <div className="errorMessage">
            Für den Titel bitte maximal 20 Zeichen eingeben
          </div>
        )}
      </div>
      <div>
        <label>
          Autor:
          <input type="text" {...register('author')} />
        </label>
      </div>
      <div>
        <label>
          Preis:
          <input type="text" {...register('price')} />
        </label>
      </div>
      <div>
        <label>
          Seiten:
          <input type="text" {...register('pages')} />
        </label>
      </div>
      <div>
        <label>
          Erscheinungsjahr:
          <input type="text" {...register('year')} />
        </label>
      </div>
      <button type="submit">speichern</button>
    </form>
  );
};

export default Form;
