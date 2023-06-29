import { combineEpics } from 'redux-observable';
import booksEpic from '../features/books/book.epic';

export default combineEpics(booksEpic);
