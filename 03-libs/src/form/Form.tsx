import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Book, CreateBook } from '../shared/types/Book';
import { useBooksContext } from '../BooksContext';
import * as yup from 'yup';

import './Form.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

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
  isbn: yup.string().required('ISBN ist ein Pflichtfeld!'),
  title: yup
    .string()
    .required('Titel ist ein Pflichtfeld')
    .max(20, 'Bitte maximal 20 Zeichen eingeben'),
  price: yup.number(),
  year: yup.number(),
});

type Props = {
  book?: Book | null;
};

const Form: React.FC<Props> = ({ book }) => {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (book) {
      reset(book);
    }
  }, [book]);

  function onSubmit(book: CreateBook): void {
    dispatch({ type: 'SAVE', payload: book });
    reset(defaultValues);
    navigate('/list');
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div>
        <TextField
          label="ISBN"
          variant="standard"
          {...register('isbn')}
          error={!!errors.isbn}
          helperText={errors.isbn?.message}
        />
      </div>
      <div>
        <TextField
          label="Titel"
          variant="standard"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
      </div>
      <div>
        <TextField
          label="Autor"
          variant="standard"
          {...register('author')}
          error={!!errors.author}
          helperText={errors.author?.message}
        />
      </div>
      <div>
        <TextField
          label="Preis"
          variant="standard"
          {...register('price')}
          error={!!errors.price}
          helperText={errors.price?.message}
        />
      </div>
      <div>
        <TextField
          label="Seiten"
          variant="standard"
          {...register('pages')}
          error={!!errors.pages}
          helperText={errors.pages?.message}
        />
      </div>
      <div>
        <TextField
          label="Erscheinungsjahr"
          variant="standard"
          {...register('year')}
          error={!!errors.year}
          helperText={errors.year?.message}
        />
      </div>
      <Button variant="outlined" type="submit">
        speichern
      </Button>
      {/* <Link to="/">Abbrechen</Link> */}
      <Button variant="outlined" type="reset" component={Link} to="/">
        abbrechen
      </Button>
    </form>
  );
};

export default Form;
