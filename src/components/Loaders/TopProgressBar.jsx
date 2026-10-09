/**
 * ============================================================
 * CONCEPT: GLOBAL LOADING BAR
 * ============================================================
 *
 * WHY: Non-intrusive way to show ANY async work in the app.
 *      Used by YouTube, GitHub, Vercel.
 *
 * WHAT: Reads a shared loading state and renders a top bar.
 * ============================================================
 */

import { useSelector } from "react-redux";

const TopProgressBar = () => {
  const isLoading = useSelector((state) => state.movies.loading);
  if (!isLoading) return null;

  return (
    <div className="top-bar" role="progressbar" aria-label="Loading">
      <div className="top-bar-fill" />
    </div>
  );
};

export default TopProgressBar;
