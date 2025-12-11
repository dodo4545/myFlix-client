// Root reducer - combines all reducers
import { combineReducers } from 'redux';
import moviesReducer from './movies';
import userReducer from './user';
import favoritesReducer from './favorites';
import uiReducer from './ui';

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  favorites: favoritesReducer,
  ui: uiReducer
});

export default rootReducer;
