# myFlix Client

## Overview
myFlix is a client-side React application for browsing movies, built as part of the CareerFoundry Full-Stack Web Development course (Achievement 3). The app connects to a REST API (myFlix API) to provide users with information about movies, directors, and genres.

## Features
- Browse a collection of movies
- View detailed information about movies, directors, and genres
- User registration and login
- Add/remove movies to/from favorites
- Update user profile information

## Technologies Used
- **React** (v19.2.0) - JavaScript library for building user interfaces
- **React DOM** (v19.2.0) - React package for working with the DOM
- **SASS** (v1.94.2) - CSS preprocessor for styling
- **Create React App** (v5.0.1) - Toolchain for React development
- **gh-pages** - Deployment to GitHub Pages

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

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see lint errors in the console.

## Build

Create a production build:
```bash
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployment

Deploy to GitHub Pages:
```bash
npm run deploy
```

This will automatically build the app and deploy it to the `gh-pages` branch.

**Live Demo:** https://dodo4545.github.io/myFlix-client/

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
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── index.js            # Main entry point
│   ├── index.scss          # Global styles
│   ├── App.js              # Root component
│   └── ...
├── package.json            # Project dependencies and scripts
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run deploy` - Deploys to GitHub Pages
- `npm run eject` - Ejects from Create React App (one-way operation)

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

## Related Repositories

- [myFlix API (Backend)](https://github.com/dodo4545/movie_api) - The REST API backend for this application

---

**Last Updated:** November 22, 2025
