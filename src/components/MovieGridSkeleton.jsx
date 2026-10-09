/**
 * ============================================================
 * CONCEPT: SKELETON SCREENS WITH SHIMMER
 * ============================================================
 *
 * WHY: Skeletons feel faster than spinners because they match
 *      the final layout (perceived performance).
 *
 * WHAT: Placeholder cards that pulse with a moving highlight.
 *
 * CSS3 USED: linear-gradient background, background-position
 *            animation for the shimmer sweep.
 * ============================================================
 */

const MovieCardSkeleton = () => (
  <div className="movie-card skeleton-card">
    <div className="skeleton-poster shimmer" />
    <div className="skeleton-meta">
      <div className="skeleton-line shimmer" style={{ width: "80%" }} />
      <div className="skeleton-line shimmer" style={{ width: "50%" }} />
    </div>
  </div>
);

const MovieGridSkeleton = ({ count = 10 }) => (
  <div className="grid" role="status" aria-label="Loading content">
    {Array.from({ length: count }).map((_, i) => (
      <MovieCardSkeleton key={i} />
    ))}
  </div>
);

export default MovieGridSkeleton;
