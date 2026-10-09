/**
 * ============================================================
 * CONCEPT: MOVIE DETAILS PAGE WITH PREMIUM LOADERS
 * ============================================================
 *
 * LOADERS USED:
 *   - CardFlipLoader → full-page transition while fetching
 *   - BlurImage      → poster fades in with blur-up effect
 *   - ButtonLoader   → inline spinner on the favorite button
 *
 * A11Y:
 *   - aria-busy on container while loading
 *   - aria-live on error message
 *   - role="status" from loaders themselves
 *
 * ES6+ USED:
 *   - Optional chaining (?.)
 *   - Destructuring
 *   - Arrow functions
 *   - Template literals
 * ============================================================
 */

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieDetails,
  clearSelectedMovie,
} from "../features/movies/movieSlice";
import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoriteSlice";
import { IMAGE_BASE_URL } from "../services/api";
import { useToast } from "../context/ToastContext";

// Premium loaders
import CardFlipLoader from "../components/Loaders/CardFlipLoader";
import BlurImage from "../components/Loaders/BlurImage";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { selectedMovie, loading, error } = useSelector(
    (state) => state.movies,
  );
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((m) => m.id === Number(id));

  useEffect(() => {
    dispatch(getMovieDetails(id));
    // Cleanup: clear selected movie when leaving page
    return () => dispatch(clearSelectedMovie());
  }, [dispatch, id]);

  // Retry handler for error state
  const handleRetry = () => {
    dispatch(getMovieDetails(id));
  };

  // Premium loader — cinematic card flip
  if (loading) {
    return <CardFlipLoader text="Loading movie details..." />;
  }

  // Error state with retry button
  if (error) {
    return (
      <div className="status error" role="alert" aria-live="polite">
        <p>⚠️ {error}</p>
        <button onClick={handleRetry} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  if (!selectedMovie) return null;

  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    runtime,
    genres,
    tagline,
    status,
  } = selectedMovie;

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(selectedMovie.id));
      showToast("Removed from favorites", "info");
    } else {
      dispatch(
        addFavorite({
          id: selectedMovie.id,
          title: selectedMovie.title,
          poster_path: selectedMovie.poster_path,
          vote_average: selectedMovie.vote_average,
        }),
      );
      showToast("Added to favorites ❤️", "success");
    }
  };

  return (
    <div className="details-page" aria-busy={loading}>
      <button onClick={() => navigate(-1)} className="btn-back">
        ← Back
      </button>

      {/* Backdrop image — uses original resolution */}
      {backdrop_path && (
        <div
          className="backdrop"
          style={{
            backgroundImage: `url(${IMAGE_BASE_URL.replace(
              "/w500",
              "/original",
            )}${backdrop_path})`,
          }}
        />
      )}

      <div className="details-content">
        {/* Poster with blur-up effect */}
        {poster_path && (
          <BlurImage
            src={`${IMAGE_BASE_URL}${poster_path}`}
            alt={`${title} poster`}
            className="details-poster"
          />
        )}

        <div className="details-info">
          <h1>
            {title} <span className="year">({release_date?.slice(0, 4)})</span>
          </h1>

          {tagline && <p className="tagline">"{tagline}"</p>}

          <div className="meta">
            <span>⭐ {vote_average?.toFixed(1)}/10</span>
            {runtime && <span>⏱ {runtime} min</span>}
            {status && <span>📽 {status}</span>}
          </div>

          {genres?.length > 0 && (
            <div className="genres">
              {genres.map((g) => (
                <span key={g.id} className="genre-tag">
                  {g.name}
                </span>
              ))}
            </div>
          )}

          <h3>Overview</h3>
          <p className="overview">{overview || "No overview available."}</p>

          <button
            onClick={toggleFavorite}
            className={isFavorite ? "btn-danger" : "btn-primary"}
            aria-pressed={isFavorite}
          >
            {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
