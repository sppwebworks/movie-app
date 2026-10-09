import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const favoriteCount = useSelector((state) => state.favorites.items.length);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          🎬 MovieApp
        </Link>
        <SearchBar />
        <div className="nav-links">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/favorites" className="nav-link">
            Favorites
            {favoriteCount > 0 && (
              <span className="badge">{favoriteCount}</span>
            )}
          </NavLink>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
