import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearFavorites } from "../features/favorites/favoriteSlice";
import MovieCard from "../components/MovieCard";
import { useToast } from "../context/ToastContext";

const Favorites = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const favorites = useSelector((state) => state.favorites.items);

  if (favorites.length === 0) {
    return (
      <div className="page empty-state">
        <h2>No favorites yet</h2>
        <p>Start adding movies you love ❤️</p>
        <Link to="/" className="btn-primary">
          Browse Movies
        </Link>
      </div>
    );
  }

  const handleClear = () => {
    if (window.confirm("Clear all favorites?")) {
      dispatch(clearFavorites());
      showToast("All favorites cleared", "info");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>❤️ Your Favorites ({favorites.length})</h2>
        <button className="btn-danger" onClick={handleClear}>
          Clear All
        </button>
      </div>

      <div className="grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
