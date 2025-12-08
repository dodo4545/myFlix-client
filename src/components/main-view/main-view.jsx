import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
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
        const moviesFromApi = data.map((movie) => {
          // Map movie titles to poster URLs
          const posterMap = {
            'Inception': 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
            'The Dark Knight': 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
            'The Shawshank Redemption': 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
            'Pulp Fiction': 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
            'The Matrix': 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
            'Goodfellas': 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
            'The Lord of the Rings: The Fellowship of the Ring': 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
            'Forrest Gump': 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
            'Star Wars': 'https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
            'The Godfather': 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'
          };
          
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            image: posterMap[movie.Title] || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450'%3E%3Crect fill='%23333' width='300' height='450'/%3E%3Ctext fill='%23fff' font-family='Arial' font-size='20' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${encodeURIComponent(movie.Title)}%3C/text%3E%3C/svg%3E`,
            genre: movie.Genre.Name,
            director: movie.Director.Name
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error);
        alert("Failed to fetch movies. Please log out and log in again.");
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
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
          <Button 
            onClick={() => setShowSignup(!showSignup)}
            style={{ marginTop: '20px' }}
          >
            {showSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
          </Button>
        </Col>
      ) : selectedMovie ? (
        <>
          <Button 
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }} 
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            Logout
          </Button>
          <Col md={8}>
            <MovieView 
              movie={selectedMovie} 
              onBackClick={() => setSelectedMovie(null)} 
            />
          </Col>
        </>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          <Button 
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }} 
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            Logout
          </Button>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};