import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflix-app-711-52fc8f24a6d2.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        const moviesFromApi = data.map((movie) => {
          console.log("Movie data:", movie);
          console.log("ImagePath:", movie.ImagePath);
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450'%3E%3Crect fill='%23333' width='300' height='450'/%3E%3Ctext fill='%23fff' font-family='Arial' font-size='20' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(movie.Title)}%3C/text%3E%3C/svg%3E`,
            genre: movie.Genre.Name,
            director: movie.Director.Name
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        {showSignup ? (
          <SignupView />
        ) : (
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
        )}
        <button 
          onClick={() => setShowSignup(!showSignup)}
          style={{ marginTop: '20px' }}
        >
          {showSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </button>
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <button onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }} style={{ position: 'absolute', top: '10px', right: '10px' }}>
          Logout
        </button>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <button onClick={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        Logout
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};