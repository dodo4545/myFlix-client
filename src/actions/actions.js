// Action creators for myFlix app
import {
  SET_MOVIES,
  SET_FILTER,
  SET_USER,
  UPDATE_USER,
  LOGOUT_USER,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_LOADING,
  SET_AUTH_ERROR
} from './actionTypes';

// Movie actions
export const setMovies = (movies) => ({
  type: SET_MOVIES,
  payload: movies
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

// User actions
export const setUser = (user, token) => ({
  type: SET_USER,
  payload: { user, token }
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

// Favorite actions
export const addFavorite = (movieId) => ({
  type: ADD_FAVORITE,
  payload: movieId
});

export const removeFavorite = (movieId) => ({
  type: REMOVE_FAVORITE,
  payload: movieId
});

// UI state actions
export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading
});

export const setAuthError = (hasError) => ({
  type: SET_AUTH_ERROR,
  payload: hasError
});
