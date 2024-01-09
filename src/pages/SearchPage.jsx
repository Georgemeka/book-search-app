import axios from "axios";
import { useEffect, useRef, useState } from "react";
import BookList from "../components/BookList";
import PropTypes from "prop-types";
import { useKey } from "../useKey";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputEl = useRef(null);

  useKey("Enter", (e) => {
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    setQuery("");
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const fetchBooks = async () => {
        try {
          setIsLoading(true);
          setError("");

          if (query.length < 3) {
            setBooks([]);
            return;
          }

          const response = await axios.get(
            `https://anapioficeandfire.com/api/books/?name=${query}`,
          );

          if (response.data.length === 0) {
            throw new Error("Book not found");
          }

          setBooks(response.data);
        } catch (error) {
          console.error(error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBooks();
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="flex flex-col gap-5 mt-10 px-4 mx-auto text-center">
      <div className="">
        <h1 className="text-center font-bold text-3xl sm:text-4xl text-stone-200 py-4 ">
          Amazing BooksVille
        </h1>
        <p className="mb-5 text-gray-50 font-semibold italic">
          A Book Store API. Search for your favourite book name...
        </p>
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input rounded-md w-full sm:w-1/3 text-center focus:translate-y-[-2px] focus:outline-none transition-all duration-300 "
          ref={inputEl}
        />
      </div>
      <div className="flex-grow">
        {isLoading && <Loader />}
        {!isLoading && !error && <BookList books={books} />}
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
}

function Loader() {
  return <div className="text-gray-200 font-semibold">Loading...</div>;
}

function ErrorMessage({ error }) {
  return (
    <p className="text-red-600">
      <span>⚠️</span>
      {error}
    </p>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};
