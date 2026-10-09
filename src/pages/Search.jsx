import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import MovieGridSkeleton from "../components/MovieGridSkeleton";

const Search = () => {
  const { searchResults, loading, error, searchHistory } = useSelector(
    (state) => state.movies,
  );

  return (
    <div className="page">
      <h2>🔍 Search Results</h2>

      {searchHistory.length > 0 && (
        <p className="history-line">
          Recent: {searchHistory.map((h) => `"${h}"`).join(", ")}
        </p>
      )}

      {loading && <MovieGridSkeleton count={10} />}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && searchResults.length === 0 && (
        <p className="status">No results yet. Try searching for a movie.</p>
      )}

      <div className="grid">
        {searchResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;
