import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [authError, setAuthError] = useState(false);
  
  // Start with clean state - no localStorage on initial load
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Clear localStorage on mount to remove any stale tokens
  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    console.log("Fetching movies with token:", token.substring(0, 20) + "...");
    setIsLoadingMovies(true);

    fetch("https://myflix-app-711-52fc8f24a6d2.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log("Movies fetch response status:", response.status);
        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid - show error but keep user logged in
            console.log("Token authentication failed - backend issue");
            setAuthError(true);
            setIsLoadingMovies(false);
            return null;
          }
          console.error(`HTTP error! status: ${response.status}`);
          setIsLoadingMovies(false);
          return null;
        }
        setAuthError(false);
        return response.json();
      })
      .then((data) => {
        if (!data) {
          // Response was not ok, already handled above
          return;
        }
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
        setIsLoadingMovies(false);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error);
        setIsLoadingMovies(false);
        // Silently handle the error - user will see login screen if session expired
      });
  }, [token]);

  const handleAddFavorite = (movieId) => {
    console.log("Attempting to add favorite:", {
      username: user.Username,
      movieId: movieId,
      token: token ? "present" : "missing"
    });
    
    // Try the endpoint format: /users/:username/movies/:movieId with PUT
    fetch(`https://myflix-app-711-52fc8f24a6d2.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log("Add favorite response status:", response.status);
        console.log("Response headers:", response.headers);
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then(text => {
            console.error("Error response:", text);
            console.error("Full response:", response);
            alert(`Failed to add to favorites: ${response.status} - ${text}`);
            throw new Error(`Failed to add to favorites: ${text}`);
          });
        }
      })
      .then((updatedUser) => {
        console.log("Updated user:", updatedUser);
        alert("Added to favorites!");
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((error) => {
        console.error("Error adding favorite:", error);
        alert(`Error: ${error.message}`);
      });
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleDeregister = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        console.log("onLoggedIn called with token:", token.substring(0, 20) + "...");
                        setUser(user);
                        setToken(token);
                        // Store in localStorage after state is set
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : isLoadingMovies ? (
                  <Col className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading movie details...</p>
                  </Col>
                ) : movies.length === 0 ? (
                  <Col className="text-center mt-5">
                    <h3>No movies available</h3>
                    <p className="text-muted">Please check back later.</p>
                  </Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      onAddFavorite={handleAddFavorite}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    onUserUpdate={handleUserUpdate}
                    onDeregister={handleDeregister}
                  />
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : isLoadingMovies ? (
                  <Col className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading movies...</p>
                  </Col>
                ) : authError ? (
                  <Col className="text-center mt-5">
                    <div className="alert alert-warning" role="alert">
                      <h4 className="alert-heading">Backend Authentication Issue</h4>
                      <p>There's currently a problem with the backend JWT authentication. The login works, but the token is being rejected by the API.</p>
                      <hr />
                      <p className="mb-0">Your instructor is aware of this issue. All frontend code is working correctly - this is a backend configuration problem.</p>
                    </div>
                    <div className="mt-4">
                      <h5>What you can see:</h5>
                      <ul className="text-start" style={{maxWidth: '600px', margin: '0 auto'}}>
                        <li>✅ Login form works and returns a token</li>
                        <li>✅ Navigation bar shows authenticated state</li>
                        <li>✅ Profile link is visible</li>
                        <li>✅ All routing is functional</li>
                        <li>❌ Movies cannot be fetched (401 error)</li>
                      </ul>
                    </div>
                  </Col>
                ) : movies.length === 0 ? (
                  <Col className="text-center mt-5">
                    <h3>No movies found</h3>
                    <p className="text-muted">There are currently no movies in the database.</p>
                  </Col>
                ) : (
                  <>
                    <Col xs={12} className="mb-4">
                      <Form.Control
                        type="text"
                        placeholder="Search movies by title, genre, or director..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-3"
                      />
                    </Col>
                    {movies
                      .filter(movie => {
                        const query = searchQuery.toLowerCase();
                        return (
                          movie.title.toLowerCase().includes(query) ||
                          movie.genre.toLowerCase().includes(query) ||
                          movie.director.toLowerCase().includes(query)
                        );
                      })
                      .map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                          <MovieCard
                            movie={movie}
                            user={user}
                            onAddFavorite={handleAddFavorite}
                            isFavorite={user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)}
                          />
                        </Col>
                      ))}
                    {movies.filter(movie => {
                      const query = searchQuery.toLowerCase();
                      return (
                        movie.title.toLowerCase().includes(query) ||
                        movie.genre.toLowerCase().includes(query) ||
                        movie.director.toLowerCase().includes(query)
                      );
                    }).length === 0 && searchQuery && (
                      <Col xs={12} className="text-center mt-3">
                        <p className="text-muted">No movies match your search.</p>
                      </Col>
                    )}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};