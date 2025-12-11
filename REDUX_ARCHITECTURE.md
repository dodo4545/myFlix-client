# myFlix Redux Architecture

## State Structure

```
Redux Store
├── movies
│   └── list: []                    // Array of movie objects
├── user
│   ├── user: null                  // User object with username, email, favorites
│   └── token: null                 // JWT authentication token
├── favorites
│   └── list: []                    // Array of favorite movie IDs
└── ui
    ├── isLoading: false           // Loading state for API calls
    ├── authError: false           // Backend authentication error flag
    └── searchQuery: ''            // Search/filter text
```

## Actions & Action Creators

### Movie Actions
- **SET_MOVIES** - Load movies from API
  - Payload: Array of movie objects
  - Used when: After successful API fetch

- **SET_FILTER** - Update search query
  - Payload: String (search text)
  - Used when: User types in search box

### User Actions
- **SET_USER** - Login user
  - Payload: { user, token }
  - Used when: Successful login

- **UPDATE_USER** - Update user profile
  - Payload: Updated user object
  - Used when: Profile form submitted

- **LOGOUT_USER** - Logout user
  - Payload: None
  - Used when: User clicks logout

### Favorite Actions
- **ADD_FAVORITE** - Add movie to favorites
  - Payload: movieId (string)
  - Used when: User clicks "Add to Favorites"

- **REMOVE_FAVORITE** - Remove movie from favorites
  - Payload: movieId (string)
  - Used when: User clicks remove in Profile view

### UI Actions
- **SET_LOADING** - Toggle loading state
  - Payload: boolean
  - Used when: Starting/ending API calls

- **SET_AUTH_ERROR** - Set authentication error
  - Payload: boolean
  - Used when: Backend returns 401

## Reducers

### 1. Movies Reducer (`src/reducers/movies.js`)
Handles: SET_MOVIES
- Updates movies list in store

### 2. User Reducer (`src/reducers/user.js`)
Handles: SET_USER, UPDATE_USER, LOGOUT_USER
- Manages authentication state
- Stores user data and token

### 3. Favorites Reducer (`src/reducers/favorites.js`)
Handles: ADD_FAVORITE, REMOVE_FAVORITE
- Manages favorite movie IDs
- Prevents duplicates on add
- Filters out on remove

### 4. UI Reducer (`src/reducers/ui.js`)
Handles: SET_LOADING, SET_AUTH_ERROR, SET_FILTER
- Manages loading states
- Manages error flags
- Manages search query

### 5. Root Reducer (`src/reducers/index.js`)
Combines all reducers using `combineReducers()`

## Data Flow

```
Component Action Dispatch Flow:
1. User interacts with UI (e.g., clicks "Add to Favorites")
2. Component dispatches action: dispatch(addFavorite(movieId))
3. Action object created: { type: 'ADD_FAVORITE', payload: movieId }
4. Redux store receives action
5. Appropriate reducer processes action
6. Store state updates
7. Components subscribed via useSelector re-render with new data

Example Flow - Adding Favorite:
User clicks button → 
dispatch(addFavorite('movie123')) → 
{ type: 'ADD_FAVORITE', payload: 'movie123' } → 
favoritesReducer processes → 
state.favorites.list = [...oldList, 'movie123'] → 
MovieCard re-renders with isFavorite=true
```

## Component Integration

### Using Redux in Components

**Reading State:**
```javascript
const movies = useSelector((state) => state.movies.list);
const user = useSelector((state) => state.user.user);
const isLoading = useSelector((state) => state.ui.isLoading);
```

**Dispatching Actions:**
```javascript
const dispatch = useDispatch();

// Login
dispatch(setUser(user, token));

// Add favorite
dispatch(addFavorite(movieId));

// Update search
dispatch(setFilter(searchText));
```

## Why Redux for myFlix?

### States Managed by Redux:
1. **Movies** - Shared across multiple components (MovieCard, MovieView, ProfileView)
2. **User/Auth** - Needed globally for authentication checks and user info display
3. **Favorites** - Accessed in multiple views, needs consistent state
4. **UI State** - Loading indicators and errors affect multiple components

### Benefits:
- ✅ **Centralized state** - Single source of truth
- ✅ **Predictable updates** - Actions clearly define what changes
- ✅ **Easier debugging** - Redux DevTools show all state changes
- ✅ **Better testing** - Pure reducer functions easy to test
- ✅ **Scalability** - Easy to add new features/state

### When NOT to Use Redux:
- ❌ Form input states (local to component)
- ❌ UI-only states like modal open/close
- ❌ Temporary component states

## Implementation Files

```
src/
├── actions/
│   ├── actionTypes.js          // Action type constants
│   └── actions.js              // Action creator functions
├── reducers/
│   ├── movies.js               // Movies reducer
│   ├── user.js                 // User/auth reducer
│   ├── favorites.js            // Favorites reducer
│   ├── ui.js                   // UI state reducer
│   └── index.js                // Root reducer (combines all)
├── store/
│   └── store.js                // Redux store configuration
├── components/
│   └── main-view/
│       └── main-view.jsx       // Uses useSelector & useDispatch
└── index.jsx                   // Wraps app with <Provider>
```

## Testing Redux

### Console Logging Initial State:
```javascript
console.log('Initial Redux State:', store.getState());
```

### Watching Actions in DevTools:
1. Install Redux DevTools browser extension
2. Open DevTools → Redux tab
3. See all dispatched actions and state changes in real-time

### Example Action Dispatch:
```javascript
// Before: state.user = null
dispatch(setUser(userData, token));
// After: state.user = { Username: 'test', Email: '...', ... }
```
