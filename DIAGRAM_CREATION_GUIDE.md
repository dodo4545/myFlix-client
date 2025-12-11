# myFlix Redux Architecture - Visual Diagram Guide

## 📊 How to Create Your Architectural Diagram

Since you need to submit a PDF or PNG to your tutor, here's what to include in your diagram using Google Drawings or similar:

### **Diagram Components:**

```
┌─────────────────────────────────────────────────────────────┐
│                         REDUX STORE                         │
│  ┌────────────┬────────────┬────────────┬─────────────┐   │
│  │  movies    │    user    │ favorites  │     ui      │   │
│  │  { list }  │ {user,     │  { list }  │ {isLoading, │   │
│  │            │  token}    │            │  authError, │   │
│  │            │            │            │  searchQuery}   │
│  └────────────┴────────────┴────────────┴─────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↑
                              │ dispatch(action)
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
   ┌────────┐                                  ┌────────┐
   │ ACTION │                                  │REDUCER │
   │CREATORS│                                  │        │
   └────────┘                                  └────────┘
   • setMovies(movies)                         • moviesReducer
   • setUser(user, token)                      • userReducer
   • logoutUser()                              • favoritesReducer
   • addFavorite(movieId)                      • uiReducer
   • removeFavorite(movieId)                   
   • setLoading(bool)                          Combined with
   • setAuthError(bool)                        combineReducers()
   • setFilter(query)                          
        │                                           │
        └───────────────────┬───────────────────────┘
                            ↓
                    ┌───────────────┐
                    │   COMPONENTS  │
                    └───────────────┘
                    • MainView (useSelector, useDispatch)
                    • MovieCard (favorites)
                    • MovieView (movie details)
                    • ProfileView (user info, favorites)
                    • NavigationBar (user state)
```

### **Action Flow Diagram:**

```
USER INTERACTION
      ↓
[Click "Add to Favorites" button]
      ↓
dispatch(addFavorite(movieId))
      ↓
{ type: 'ADD_FAVORITE', payload: 'movie123' }
      ↓
[Redux Store receives action]
      ↓
[favoritesReducer processes action]
      ↓
state.favorites.list = [...oldList, 'movie123']
      ↓
[Store state updates]
      ↓
[Components with useSelector re-render]
      ↓
[MovieCard shows "★ Favorited" button]
```

### **State Tree Visualization:**

```
Redux Store (Global State)
│
├── movies
│   └── list: Array<Movie>
│       ├── id
│       ├── title
│       ├── description
│       ├── genre
│       ├── director
│       └── imagePath
│
├── user
│   ├── user: Object
│   │   ├── Username
│   │   ├── Email
│   │   ├── Birthday
│   │   └── FavoriteMovies: Array<MovieID>
│   └── token: String (JWT)
│
├── favorites
│   └── list: Array<String> (movie IDs)
│
└── ui
    ├── isLoading: Boolean
    ├── authError: Boolean
    └── searchQuery: String
```

### **Reducer Logic Flow:**

```
                   [ACTION DISPATCHED]
                           ↓
                  ┌────────┴────────┐
                  │  Which type?    │
                  └─────────────────┘
                           ↓
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
   SET_MOVIES        ADD_FAVORITE       SET_LOADING
        ↓                  ↓                  ↓
  Update movies.list   Add to             Update ui.isLoading
                     favorites.list
        ↓                  ↓                  ↓
  [Return new state] [Return new state] [Return new state]
        ↓                  ↓                  ↓
               [Store state updated]
                           ↓
            [Components re-render with new data]
```

## 📋 Instructions for Creating Your Diagram:

1. **Go to Google Drawings** (drawings.google.com)

2. **Create boxes for:**
   - Redux Store (large box at top)
   - 4 reducers inside store (movies, user, favorites, ui)
   - Action Creators (left side)
   - Reducers (right side)
   - Components (bottom)

3. **Add arrows showing:**
   - Components dispatch actions → Store
   - Store passes actions → Reducers
   - Reducers return new state → Store
   - Store updates → Components re-render

4. **Label arrows with:**
   - dispatch(action)
   - useSelector(state => state.movies)
   - action → reducer
   - new state

5. **Add a legend:**
   - Rectangle = State container
   - Arrow = Data flow
   - List = Functions/Actions

6. **Export as PDF or PNG:**
   - File → Download → PDF Document (.pdf)
   - OR File → Download → PNG Image (.png)

## 🎨 Color Coding Suggestion:

- **Blue boxes** = State/Store
- **Green boxes** = Actions
- **Orange boxes** = Reducers
- **Purple boxes** = Components
- **Black arrows** = Data flow

## ✅ What Your Diagram Should Show:

1. ✅ **Redux Store** with 4 state slices
2. ✅ **8 Action types** you're using
3. ✅ **4 Reducers** and what they handle
4. ✅ **Data flow** from component → action → reducer → state → component
5. ✅ **Component integration** (which components use Redux)

## 📝 Text to Include in Diagram:

Add these labels to your diagram:

**Store:**
"Single source of truth for app state"

**Actions:**
"Plain objects describing what happened"

**Reducers:**
"Pure functions that specify how state changes"

**Components:**
"Connect to store via useSelector & useDispatch"

**Flow:**
"User Interaction → Dispatch Action → Reducer Updates State → Components Re-render"

---

Once you create the diagram in Google Drawings, export it and you'll have your Part 1 submission ready! The REDUX_ARCHITECTURE.md file I created above contains all the information you need to reference while creating the visual diagram.
