/**
 * ============================================================
 * CONCEPT: MOVIE CARD WITH BLUR-UP IMAGE + MEMOIZATION
 * ============================================================
 *
 * LOADERS USED:
 *   - BlurImage → poster progressively sharpens as it loads
 *
 * OPTIMIZATION:
 *   - React.memo → prevents re-render when parent re-renders
 *     but THIS card's props haven't changed
 *
 * A11Y:
 *   - aria-pressed on toggle button
 *   - Descriptive aria-label with movie title
 *   - <article> semantic wrapper
 *   - <figure> + <figcaption> for image + title
 *
 * ES6+ USED:
 *   - Arrow functions
 *   - Destructuring
 *   - Template literals
 *   - Optional ternary
 * ============================================================
 */

import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoriteSlice";
import { IMAGE_BASE_URL } from "../services/api";
import { useToast } from "../context/ToastContext";

// Premium loader for images
import BlurImage from "./Loaders/BlurImage";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((m) => m.id === movie.id);

  const handleToggle = (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Stop bubbling

    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
      showToast("Removed from favorites", "info");
    } else {
      dispatch(addFavorite(movie));
      showToast("Added to favorites ❤️", "success");
    }
  };

  const posterSrc = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <article className="movie-card">
      <Link
        to={`/movie/${movie.id}`}
        aria-label={`View details for ${movie.title}`}
      >
        <figure>
          {/* Blur-up image loading */}
          <BlurImage src={posterSrc} alt={`${movie.title} poster`} />
          <figcaption>{movie.title}</figcaption>
        </figure>
      </Link>

      <button
        onClick={handleToggle}
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${movie.title} from favorites`
            : `Add ${movie.title} to favorites`
        }
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </article>
  );
};

// Memoize to prevent re-renders when props don't change
export default memo(MovieCard);
