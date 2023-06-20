import React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { CreateBook } from '../shared/types/Book';
import { useBooksContext } from '../BooksContext';
import * as yup from 'yup';

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

const schema = yup.object({
  id: yup.number().optional(),
  author: yup.string().required('Autor ist ein Pflichtfeld'),
  pages: yup
    .number()
    .typeError('Bitte nur Zahlen eingeben')
    .integer('Bitte nur Ganzzahlen angeben')
    .required('Seitenanzahl ist ein Pflichtfeld')
    .min(1, 'Ein Buch hat mindestens 1 Seite')
    .max(200, 'Mehr als 200 Seiten lese ich nicht!'),
  isbn: yup.string(),
  title: yup.string(),
  price: yup.number(),
  year: yup.number(),
});

const Form: React.FC = () => {
  const [, dispatch] = useBooksContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBook>({
    defaultValues,
    resolver: yupResolver(schema) as any,
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
          <input
            type="text"
            {...register('author')}
            className={classNames({ error: errors.author })}
          />
        </label>
        {errors.author && (
          <div className="errorMessage">{errors.author.message}</div>
        )}
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
          <input
            type="text"
            {...register('pages')}
            className={classNames({ error: errors.pages })}
          />
          {errors.pages && (
            <div className="errorMessage">{errors.pages.message}</div>
          )}
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
