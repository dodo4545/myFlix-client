export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
      style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ddd', margin: '10px' }}
    >
      {movie.title}
    </div>
  );
};
