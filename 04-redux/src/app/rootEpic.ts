import { combineEpics } from 'redux-observable';
import booksEpic from '../features/books/book.epic';
import loginEpic from '../features/login/login.epic';

export default combineEpics(booksEpic, loginEpic);
