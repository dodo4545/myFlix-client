// Favorites reducer
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/actionTypes';

const initialState = {
  list: []
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      // Add movie ID if it's not already in favorites
      if (state.list.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    case REMOVE_FAVORITE:
      // Remove movie ID from favorites
      return {
        ...state,
        list: state.list.filter(id => id !== action.payload)
      };
    default:
      return state;
  }
};

export default favoritesReducer;
