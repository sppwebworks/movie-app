/**
 * ============================================================
 * CONCEPT: BRANDED SVG LOADER WITH CSS ANIMATION
 * ============================================================
 *
 * WHY: A generic spinner feels cheap. A film-reel spinner
 *      reinforces the movie theme instantly.
 *
 * WHAT: SVG with rotating reels + flickering center.
 *
 * ES6+ USED: Arrow function, destructuring, default props
 * CSS3 USED: @keyframes rotate, animation-play-state, filter
 * ============================================================
 */

const FilmReelLoader = ({ size = 80, text = "Loading..." }) => (
  <div className="film-reel-loader" role="status" aria-live="polite">
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="film-reel-svg"
      aria-hidden="true"
    >
      {/* Outer reel */}
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="10 6"
        className="reel-outer"
      />
      {/* Inner ring */}
      <circle
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.5"
      />
      {/* Holes (like a real film reel) */}
      <circle cx="50" cy="24" r="7" fill="currentColor" />
      <circle cx="76" cy="50" r="7" fill="currentColor" />
      <circle cx="50" cy="76" r="7" fill="currentColor" />
      <circle cx="24" cy="50" r="7" fill="currentColor" />
      {/* Center hub */}
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </svg>
    {text && <p className="film-reel-text">{text}</p>}
  </div>
);

export default FilmReelLoader;
