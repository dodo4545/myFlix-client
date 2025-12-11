// Redux store configuration
import { createStore } from 'redux';
import rootReducer from '../reducers';

// Create the Redux store with the root reducer
const store = createStore(
  rootReducer,
  // Enable Redux DevTools Extension if available
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
