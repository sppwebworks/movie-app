/**
 * ============================================================
 * CONCEPT: SCROLL TO TOP ON ROUTE CHANGE
 * ============================================================
 *
 * WHY: React Router does NOT reset scroll position on navigation.
 *      If a user scrolls down and clicks a link, they land mid-page.
 *
 * WHAT: A null-rendering component that watches the pathname and
 *       scrolls to top whenever it changes.
 *
 * ES6+ USED: destructuring, useEffect hook, useLocation hook
 * ============================================================
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

// ⚠️ THIS LINE IS REQUIRED FOR DEFAULT IMPORT
export default ScrollToTop;
