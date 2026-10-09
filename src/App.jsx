/**
 * ============================================================
 * CONCEPT: APP SHELL WITH MULTI-LEVEL LOADING
 * ============================================================
 *
 * LOADERS USED:
 *   - SplashLoader    → first app mount (branded intro)
 *   - TopProgressBar  → global async indicator (any thunk)
 *   - FilmReelLoader  → per-route lazy chunk loading
 *
 * ROUTES:
 *   - /             → Home (trending movies)
 *   - /search       → Search results
 *   - /favorites    → User favorites
 *   - /movie/:id    → Movie details
 *   - *             → 404 NotFound
 *
 * PATTERNS:
 *   - React.lazy for code splitting
 *   - Suspense fallback for chunks
 *   - ScrollToTop for route scroll reset
 * ============================================================
 */

import { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

// Premium loaders
import SplashLoader from "./components/Loaders/SplashLoader";
import FilmReelLoader from "./components/Loaders/FilmReelLoader";
import TopProgressBar from "./components/Loaders/TopProgressBar";

// Lazy-loaded pages (code splitting per route)
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Favorites = lazy(() => import("./pages/Favorites"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  // Splash screen — shown briefly on first load
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Full-screen splash on first mount
  if (booting) return <SplashLoader />;

  return (
    <>
      {/* Global loading indicator — always visible when any thunk runs */}
      <TopProgressBar />

      {/* Scroll reset on route change */}
      <ScrollToTop />

      {/* Persistent navbar */}
      <Navbar />

      <main className="container">
        {/* Suspense with branded film-reel loader */}
        <Suspense fallback={<FilmReelLoader text="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
