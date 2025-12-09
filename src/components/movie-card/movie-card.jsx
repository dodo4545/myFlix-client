import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie, user, onAddFavorite, isFavorite }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        {user && onAddFavorite && (
          <Button
            variant={isFavorite ? "success" : "outline-primary"}
            size="sm"
            className="w-100 mt-2"
            onClick={(e) => {
              e.preventDefault();
              onAddFavorite(movie.id);
            }}
            disabled={isFavorite}
          >
            {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.object,
  onAddFavorite: PropTypes.func,
  isFavorite: PropTypes.bool
};
