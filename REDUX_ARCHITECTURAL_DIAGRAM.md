# myFlix Redux Architectural Diagram
**Student:** James J.  
**Exercise:** 3.8 Part 1  
**Date:** December 11, 2025

---

## Visual Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          REDUX STORE (Single Source of Truth)          │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │   movies     │  │     user     │  │  favorites   │  │    ui     │ │
│  │              │  │              │  │              │  │           │ │
│  │  list: []    │  │  user: null  │  │  list: []    │  │ isLoading │ │
│  │              │  │  token: null │  │              │  │ authError │ │
│  │              │  │              │  │              │  │ searchQry │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └───────────┘ │
└────────────────────────────────────────────────────────────────────────┘
                                  ▲
                                  │
                                  │ dispatch(action)
                                  │
        ┌─────────────────────────┴──────────────────────────┐
        │                                                     │
        │                                                     │
┌───────▼─────────┐                                  ┌───────▼────────┐
│                 │                                  │                │
│  ACTION         │                                  │   REDUCERS     │
│  CREATORS       │                                  │                │
│                 │                                  │                │
│ • setMovies()   │                                  │ moviesReducer  │
│ • setFilter()   │                                  │ userReducer    │
│ • setUser()     │                                  │ favoritesRdcr  │
│ • updateUser()  │                                  │ uiReducer      │
│ • logoutUser()  │────────────────────────────────► │                │
│ • addFavorite() │  {type, payload}                 │ Pure functions │
│ • removeFav()   │                                  │ Return new     │
│ • setLoading()  │                                  │ state object   │
│ • setAuthError()│                                  │                │
│                 │                                  │ Combined with  │
└─────────────────┘                                  │ combineRdcrs() │
        ▲                                            └────────────────┘
        │                                                     │
        │                                                     │
        │ dispatch()                           state updated  │
        │                                                     ▼
┌───────┴──────────────────────────────────────────────────────────────┐
│                                                                       │
│                         REACT COMPONENTS                              │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  MainView    │  │  MovieCard   │  │  MovieView   │              │
│  │              │  │              │  │              │              │
│  │ useSelector  │  │ Gets user/   │  │ Shows movie  │              │
│  │ useDispatch  │  │ favorites    │  │ details      │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ ProfileView  │  │ LoginView    │  │ NavigationBar│              │
│  │              │  │              │  │              │              │
│  │ User info +  │  │ Dispatches   │  │ Shows user   │              │
│  │ favorites    │  │ setUser()    │  │ state        │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
USER INTERACTION (e.g., Click "Add to Favorites")
         │
         ▼
┌─────────────────────────────────┐
│  Component calls dispatch()     │
│  dispatch(addFavorite(movieId)) │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Action Creator returns object:     │
│  {                                  │
│    type: 'ADD_FAVORITE',            │
│    payload: 'movie123'              │
│  }                                  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Redux Store receives action        │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Store passes action to all reducers│
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  favoritesReducer checks action type│
│  Matches 'ADD_FAVORITE'             │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Reducer creates new state:         │
│  return {                           │
│    ...state,                        │
│    list: [...state.list, movieId]  │
│  }                                  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Store updates with new state       │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  All subscribed components notified │
│  (via useSelector)                  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Components re-render with new data │
│  MovieCard shows "★ Favorited"     │
└─────────────────────────────────────┘
```

---

## State Tree Structure

```
Redux Store
│
├─── movies
│    └─── list: Array<Movie>
│         ├── [0]
│         │   ├── id: String
│         │   ├── title: String
│         │   ├── description: String
│         │   ├── genre: Object { Name, Description }
│         │   ├── director: Object { Name, Bio, Birth, Death }
│         │   └── imagePath: String
│         ├── [1] { ... }
│         └── [2] { ... }
│
├─── user
│    ├── user: Object | null
│    │   ├── _id: String
│    │   ├── Username: String
│    │   ├── Email: String
│    │   ├── Birthday: Date
│    │   └── FavoriteMovies: Array<MovieID>
│    │
│    └── token: String | null (JWT)
│
├─── favorites
│    └── list: Array<String>
│         ├── [0] "movieId1"
│         ├── [1] "movieId2"
│         └── [2] "movieId3"
│
└─── ui
     ├── isLoading: Boolean
     ├── authError: Boolean
     └── searchQuery: String
```

---

## Actions and Their Flow

### 1. SET_MOVIES
```
User logs in → MainView useEffect → fetch(/movies) → 
dispatch(setMovies(data)) → moviesReducer → state.movies.list updated
```

### 2. SET_USER
```
User submits login → LoginView → API call → 
dispatch(setUser(user, token)) → userReducer → 
state.user.user & state.user.token updated
```

### 3. ADD_FAVORITE
```
User clicks "Add to Favorites" → MovieCard/MovieView → 
API PUT request → dispatch(addFavorite(movieId)) → 
favoritesReducer → state.favorites.list updated → 
Component re-renders showing "Favorited"
```

### 4. REMOVE_FAVORITE
```
User clicks remove in ProfileView → 
API DELETE request → dispatch(removeFavorite(movieId)) → 
favoritesReducer filters out movieId → 
state.favorites.list updated → UI updates
```

### 5. SET_FILTER
```
User types in search box → MainView onChange → 
dispatch(setFilter(query)) → uiReducer → 
state.ui.searchQuery updated → Filtered movies displayed
```

### 6. LOGOUT_USER
```
User clicks logout → NavigationBar → 
dispatch(logoutUser()) → userReducer → 
state.user = {user: null, token: null} → 
Navigate to /login
```

### 7. SET_LOADING
```
Before API call → dispatch(setLoading(true)) → 
uiReducer → state.ui.isLoading = true → 
Spinner shown → After API → 
dispatch(setLoading(false)) → Spinner hidden
```

### 8. SET_AUTH_ERROR
```
API returns 401 → dispatch(setAuthError(true)) → 
uiReducer → state.ui.authError = true → 
Error message displayed
```

---

## Reducer Logic Flow

```
                    ACTION DISPATCHED
                          │
                          ▼
              ┌───────────────────────┐
              │  What's the type?     │
              └───────────────────────┘
                          │
      ┌───────────────────┼───────────────────┐
      │                   │                   │
      ▼                   ▼                   ▼
  SET_MOVIES        ADD_FAVORITE         SET_LOADING
      │                   │                   │
      ▼                   ▼                   ▼
┌──────────┐      ┌──────────────┐    ┌──────────┐
│ movies   │      │ favorites    │    │ ui       │
│ reducer  │      │ reducer      │    │ reducer  │
└─────┬────┘      └──────┬───────┘    └────┬─────┘
      │                  │                  │
      ▼                  ▼                  ▼
  return {          return {            return {
    ...state,        ...state,           ...state,
    list: payload    list: [            isLoading: payload
  }                   ...state.list,    }
                      payload]
                    }
      │                  │                  │
      └──────────────────┼──────────────────┘
                         ▼
                  STORE UPDATED
                         │
                         ▼
              COMPONENTS RE-RENDER
```

---

## Component-Redux Integration Pattern

### Example: MainView Component

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { setMovies, setUser, setLoading } from '../../actions/actions';

export const MainView = () => {
  // READING STATE (useSelector)
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const isLoading = useSelector((state) => state.ui.isLoading);
  
  // DISPATCHING ACTIONS (useDispatch)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!token) return;
    
    dispatch(setLoading(true));
    
    fetch('/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setMovies(data));
        dispatch(setLoading(false));
      });
  }, [token, dispatch]);
  
  // Render uses Redux state
  return (
    <div>
      {isLoading ? <Spinner /> : <MovieGrid movies={movies} />}
    </div>
  );
};
```

---

## Why Redux for myFlix?

### Problems Redux Solves:

**Before Redux:**
- ❌ Props drilling through multiple components
- ❌ Lifting state up repeatedly
- ❌ Duplicate state in different components
- ❌ Hard to track state changes
- ❌ Complex useState management

**After Redux:**
- ✅ Single source of truth for app state
- ✅ Any component can access state via useSelector
- ✅ Predictable state updates through actions
- ✅ Easy debugging with Redux DevTools
- ✅ Testable pure reducer functions
- ✅ Clear separation of concerns

### States That Belong in Redux:

1. **Movies List** ✅
   - Shared across: MainView, MovieCard, MovieView, ProfileView
   - Large dataset that shouldn't be duplicated

2. **User Authentication** ✅
   - Needed globally: NavigationBar, MainView, ProfileView
   - Token required for all API calls

3. **Favorites** ✅
   - Used in: MovieCard, MovieView, ProfileView
   - Needs synchronization across components

4. **UI State (loading, errors)** ✅
   - Affects multiple components
   - Consistent UX requires shared state

### States That DON'T Belong in Redux:

1. **Form Input Values** ❌
   - Local to LoginView, SignupView, ProfileView
   - No need for global access

2. **Modal Open/Close** ❌
   - Temporary UI state
   - Component-specific

3. **Hover States** ❌
   - Purely visual, component-local

---

## Redux DevTools Integration

```javascript
// store.js
import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
```

**DevTools Shows:**
- All dispatched actions in real-time
- State before and after each action
- Action payload inspection
- Time-travel debugging
- State diff visualization

---

## File Structure

```
src/
├── actions/
│   ├── actionTypes.js          # Action type constants
│   │   ├── SET_MOVIES
│   │   ├── SET_FILTER
│   │   ├── SET_USER
│   │   ├── UPDATE_USER
│   │   ├── LOGOUT_USER
│   │   ├── ADD_FAVORITE
│   │   ├── REMOVE_FAVORITE
│   │   ├── SET_LOADING
│   │   └── SET_AUTH_ERROR
│   │
│   └── actions.js              # Action creator functions
│       ├── setMovies(movies)
│       ├── setFilter(query)
│       ├── setUser(user, token)
│       ├── updateUser(user)
│       ├── logoutUser()
│       ├── addFavorite(movieId)
│       ├── removeFavorite(movieId)
│       ├── setLoading(isLoading)
│       └── setAuthError(hasError)
│
├── reducers/
│   ├── movies.js               # Movies state management
│   ├── user.js                 # User/auth state management
│   ├── favorites.js            # Favorites state management
│   ├── ui.js                   # UI state management
│   └── index.js                # Root reducer (combineReducers)
│
├── store/
│   └── store.js                # Store configuration + DevTools
│
├── components/
│   └── main-view/
│       └── main-view.jsx       # Uses useSelector & useDispatch
│
└── index.jsx                   # <Provider store={store}>
```

---

## Implementation Summary

### ✅ Completed Implementation:

- **9 Action Types** defined in actionTypes.js
- **9 Action Creators** implemented in actions.js
- **4 Domain Reducers** (movies, user, favorites, ui)
- **1 Root Reducer** combining all with combineReducers()
- **Redux Store** with DevTools support
- **Provider** wrapping App in index.jsx
- **MainView** converted to use useSelector/useDispatch
- **Tested** and working in browser

### 📊 Lines of Code:
- Actions: ~40 lines
- Reducers: ~120 lines
- Store: ~15 lines
- Component integration: ~100 lines modified
- **Total: 12 files changed, 300+ insertions**

### 🚀 Benefits Achieved:
- Centralized state management
- Predictable state updates
- Easier debugging with DevTools
- Scalable architecture
- Production-ready implementation

---

**Date:** December 11, 2025  
**Repository:** dodo4545/myFlix-client  
**Branch:** bootstrap-styling-integration  
**Commit:** ad41d52 (Redux implementation)

