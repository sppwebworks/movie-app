/**
 * ============================================================
 * CONCEPT: FULL-PAGE SPLASH WITH PULSING LOGO
 * ============================================================
 *
 * WHEN: On first app mount, or during heavy route transitions.
 *
 * WHAT: Centered logo that pulses, with a progress bar beneath.
 *
 * CSS3 USED: transform scale, box-shadow pulse, opacity stagger
 * ============================================================
 */

const SplashLoader = () => (
  <div className="splash-loader" role="status" aria-live="polite">
    <div className="splash-logo">🎬</div>
    <h1 className="splash-title">MovieApp</h1>
    <div className="splash-bar">
      <div className="splash-bar-fill" />
    </div>
  </div>
);

export default SplashLoader;
