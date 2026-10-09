/**
 * ============================================================
 * CONCEPT: BUTTON-EMBEDDED LOADER
 * ============================================================
 *
 * WHY: Buttons that trigger async actions should disable
 *      and show inline progress — prevents double-clicks.
 *
 * WHAT: Small white spinner that pulses smoothly.
 * ============================================================
 */

const ButtonLoader = ({ text = "Loading" }) => (
  <>
    <span className="button-spinner" aria-hidden="true" />
    <span>{text}</span>
  </>
);

export default ButtonLoader;
