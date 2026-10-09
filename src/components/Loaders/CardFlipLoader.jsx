/**
 * ============================================================
 * CONCEPT: 3D TRANSFORM LOADER
 * ============================================================
 *
 * WHY: 3D transforms create memorable loading experiences
 *      without heavy JS — all CSS.
 *
 * CSS3 USED: perspective, transform-style: preserve-3d,
 *            rotateY animation
 * ============================================================
 */

const CardFlipLoader = ({ text = "Loading..." }) => (
  <div className="card-flip-loader" role="status" aria-live="polite">
    <div className="flip-card">
      <div className="flip-front">🎬</div>
      <div className="flip-back">🎥</div>
    </div>
    <p className="flip-text">{text}</p>
  </div>
);

export default CardFlipLoader;
