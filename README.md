# myFlix Client

## Overview
myFlix is a single-page, responsive React application for browsing movies, built as part of the CareerFoundry Full-Stack Web Development course (Achievement 3). The app provides users with access to information about movies, directors, and genres, and allows them to create a profile to save their favorite movies.

## Live Demo
**Netlify:** https://myflix-james.netlify.app/

## Features
- **User Authentication:** Register new account and login with JWT authentication
- **Browse Movies:** View a collection of movies with images, descriptions, genres, and directors
- **Movie Details:** Click on a movie to see detailed information including synopsis, director, and genre
- **Search & Filter:** Real-time search/filter movies by title, genre, or director
- **Favorites Management:** Add and remove movies from your personal favorites list
- **User Profile:** View and update profile information (username, email, birthday)
- **Account Management:** Update profile details or deregister account
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices
- **State Management:** Redux for centralized application state

## Technologies Used
- **React** (v19.2.0) - JavaScript library for building user interfaces
- **Redux** (v5.0.1) - State management library
- **React-Redux** (v9.1.2) - Official React bindings for Redux
- **React Router** (v6.3.0) - Client-side routing
- **React Bootstrap** (v2.5.0) - UI component library
- **Bootstrap** (v5.2.0) - CSS framework for responsive design
- **Parcel** (v2.9.3) - Build tool and bundler
- **SASS** (v1.94.2) - CSS preprocessor for styling
- **PropTypes** (v15.8.1) - Runtime type checking for React props

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dodo4545/myFlix-client.git
cd myflix-client
```

2. Install dependencies:
```bash
npm install
```

## Development

Run the app in development mode:
```bash
npm start
```

The app will automatically open at [http://localhost:3000](http://localhost:3000) (or http://localhost:1234 with Parcel).

The page will reload when you make changes. You may also see lint errors in the console.

### Testing with React DevTools
Install the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools) browser extension to inspect component hierarchy, props, and state during development.

## Build

Create a production build:
```bash
npm run build
```

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployment

This app is deployed on Netlify:
**Live Site:** https://myflix-james.netlify.app/

The app automatically rebuilds and deploys when changes are pushed to the main branch.

## API

This client connects to the myFlix API:
- **API URL:** https://myflix-app-711-52fc8f24a6d2.herokuapp.com/
- **Database:** MongoDB Atlas (myFlix database)

### API Endpoints
- `POST /users` - Register new user
- `POST /login` - User login (returns JWT token)
- `GET /movies` - Get all movies (protected)
- `GET /movies/:title` - Get single movie (protected)
- `GET /movies/genre/:genreName` - Get genre info (protected)
- `GET /movies/directors/:directorName` - Get director info (protected)
- `PUT /users/:Username` - Update user info (protected)
- `POST /users/:Username/movies/:MovieID` - Add favorite movie (protected)
- `DELETE /users/:Username/movies/:MovieID` - Remove favorite movie (protected)
- `DELETE /users/:Username` - Delete user account (protected)

## Project Structure
```
myflix-client/
├── src/
│   ├── index.html              # HTML entry point
│   ├── index.jsx               # React app entry point with Redux Provider
│   ├── index.scss              # Global styles (Bootstrap imports)
│   ├── actions/
│   │   ├── actionTypes.js      # Redux action type constants
│   │   └── actions.js          # Redux action creators
│   ├── reducers/
│   │   ├── index.js            # Root reducer (combineReducers)
│   │   ├── movies.js           # Movies state reducer
│   │   ├── user.js             # User/auth state reducer
│   │   ├── favorites.js        # Favorites state reducer
│   │   └── ui.js               # UI state reducer (loading, errors, search)
│   ├── store/
│   │   └── store.js            # Redux store configuration
│   ├── components/
│   │   ├── main-view/          # Main container with routing
│   │   ├── movie-card/         # Movie card component
│   │   ├── movie-view/         # Movie details view
│   │   ├── login-view/         # Login form
│   │   ├── signup-view/        # Registration form
│   │   ├── profile-view/       # User profile and favorites
│   │   └── navigation-bar/     # Navigation component
│   └── mockData.js             # Mock data for development
├── netlify.toml                # Netlify deployment configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```

## Key Features Implementation

### Redux State Management
The app uses Redux for centralized state management with the following structure:
- **Movies:** List of all movies
- **User:** Current user data and JWT token
- **Favorites:** User's favorite movie IDs
- **UI:** Loading states, error messages, and search query

### React Router
Client-side routing with the following routes:
- `/` - Main view with movie grid
- `/login` - User login
- `/signup` - User registration
- `/profile` - User profile and favorites
- `/movies/:movieId` - Individual movie details

### Search & Filter
Real-time search functionality filters movies by:
- Movie title
- Genre
- Director name

## Available Scripts

- `npm start` - Runs the app in development mode with Parcel
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

## Testing

Run tests:
```bash
npm test
```

Launches the test runner in interactive watch mode.

## Contributing

This is a student project for educational purposes. Not accepting contributions at this time.

## Author

James J. - Full-Stack Web Development Student (CareerFoundry)

## License

This project is part of CareerFoundry's coursework and is for educational purposes only.

## Acknowledgments

- CareerFoundry for the project requirements and guidance
- The React community for excellent documentation
- Movie data provided through the myFlix API backend

## Development Notes

### Backend Status
The backend API is currently experiencing authentication issues that are being addressed by the instructor. In the meantime, the app includes a mock data bypass system that allows full functionality testing:
- Login works with test credentials
- Mock movies load automatically
- Favorites are managed locally with localStorage
- All features remain fully functional for demonstration

### Known Issues
- Backend JWT authentication requires instructor fix
- User signup endpoint returns 500 errors (backend issue)
- Once backend is fixed, mock data bypass code can be removed

## Related Repositories

- [myFlix API (Backend)](https://github.com/dodo4545/movie_api) - The REST API backend for this application

## Contact

**James J.**  
Full-Stack Web Development Student  
CareerFoundry Achievement 3

## Acknowledgments

- CareerFoundry for project requirements and guidance
- Course mentor and tutor for support
- The React and Redux communities for excellent documentation

---

**Last Updated:** December 16, 2025
