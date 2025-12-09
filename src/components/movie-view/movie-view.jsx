import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../book-view/book-view.scss";

export const MovieView = ({ movies, user, token, onAddFavorite }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);
  const isFavorite = user && user.FavoriteMovies && user.FavoriteMovies.includes(movieId);

  const handleAddToFavorites = () => {
    onAddFavorite(movie.id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <img className="w-100" src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      
      {user && (
        <Button
          variant={isFavorite ? "success" : "primary"}
          onClick={handleAddToFavorites}
          disabled={isFavorite}
          className="me-2 mt-3"
        >
          {isFavorite ? "Already in Favorites" : "Add to Favorites"}
        </Button>
      )}

      <Link to={`/`}>
        <button className="back-button" style={{ cursor: "pointer", marginTop: '12px' }}>
          Back
        </button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired
    })
  ).isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  onAddFavorite: PropTypes.func
};
