// UI state reducer
import { SET_LOADING, SET_AUTH_ERROR, SET_FILTER } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  authError: false,
  searchQuery: ''
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        searchQuery: action.payload
      };
    default:
      return state;
  }
};

export default uiReducer;
