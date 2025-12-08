import './book-view.scss';
export const BookView = ({ book, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={book.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{book.title}</span>
      </div>
      <div>
        <span>Author: </span>
        <span>{book.author}</span>
      </div>
      <button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
    </div>
  );
};