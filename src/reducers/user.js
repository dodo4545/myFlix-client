// User reducer
import { SET_USER, UPDATE_USER, LOGOUT_USER } from '../actions/actionTypes';

const initialState = {
  user: null,
  token: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    case LOGOUT_USER:
      return {
        user: null,
        token: null
      };
    default:
      return state;
  }
};

export default userReducer;
