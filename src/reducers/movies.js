// Movies reducer
import { SET_MOVIES } from '../actions/actionTypes';

const initialState = {
  list: []
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};

export default moviesReducer;
