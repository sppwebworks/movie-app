import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  searchMovies,
  addToSearchHistory,
  clearSearchResults,
} from "../features/movies/movieSlice";
import useDebounce from "../hooks/useDebounce";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = useSelector((state) => state.movies.searchHistory);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      dispatch(clearSearchResults());
      return;
    }
    dispatch(searchMovies(debouncedQuery));
    navigate("/search");
  }, [debouncedQuery, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    dispatch(addToSearchHistory(query));
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="search-input"
        aria-label="Search movies"
      />
      {history.length > 0 && query && (
        <div className="search-history">
          {history
            .filter((h) => h.toLowerCase().includes(query.toLowerCase()))
            .map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setQuery(h)}
                className="history-item"
              >
                🕐 {h}
              </button>
            ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
