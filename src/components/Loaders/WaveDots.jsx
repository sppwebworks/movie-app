/**
 * ============================================================
 * CONCEPT: STAGGERED ANIMATION WITH CSS DELAYS
 * ============================================================
 *
 * WHY: Delightful micro-interaction for text-only waits.
 *
 * CSS3 USED: animation-delay for staggered bounce effect.
 * ============================================================
 */

const WaveDots = ({ text = "" }) => (
  <span className="wave-dots" role="status" aria-label="Loading">
    <span className="wave-dot" />
    <span className="wave-dot" />
    <span className="wave-dot" />
    {text && <span className="wave-text">{text}</span>}
  </span>
);

export default WaveDots;
