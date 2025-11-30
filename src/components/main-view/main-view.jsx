import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflix-app-711-52fc8f24a6d2.herokuapp.com/movies")
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
            image: `https://myflix-app-711-52fc8f24a6d2.herokuapp.com/images/${movie.ImagePath}`,
            genre: movie.Genre.Name,
            director: movie.Director.Name
          };
        });
        console.log("Processed movies:", moviesFromApi);
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
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