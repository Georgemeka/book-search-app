import PropTypes from "prop-types";

export default function Book({ book }) {
  return (
    <li
      key={book.name}
      className=" bg-slate-500 rounded-lg text-stone-100 py-3 flex gap-2 flex-col px-6 shadow-2xl sm:w-1/2 sm:mx-auto hover:bg-slate-600 transition-all duration-700"
    >
      {/* <img src={book.Poster} alt={`${book.Title} poster`} /> */}
      <h2 className="text-xl text-center font-bold">{book.name}</h2>

      <div className="pb-3">
        <p>
          <span className="font-bold pr-5 ">Author(s):</span>
          {book.authors}
        </p>
        <p>
          <span className="font-bold pr-5 ">Number of Pages:</span>
          {book.numberOfPages}
        </p>

        <p>
          <span className="font-bold pr-5 ">Publisher:</span>
          {book.publisher}
        </p>

        <p>
          <span className="font-bold pr-5 ">Country:</span>
          {book.country}
        </p>

        <p>
          <span className="font-bold pr-5 ">Media Type:</span>
          {book.mediaType}
        </p>
      </div>
    </li>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
};
