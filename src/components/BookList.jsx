import Book from "./Book";
import PropTypes from "prop-types";

export default function BookList({ books }) {
  return (
    <ul className="list list-movies divide-y-2 divide-stone-600 space-y-2 ">
      {books?.map((book) => (
        <Book key={book.name} book={book} />
      ))}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
};
