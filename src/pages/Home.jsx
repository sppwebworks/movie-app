import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingMovies } from "../features/movies/movieSlice";
import MovieCard from "../components/MovieCard";
import MovieGridSkeleton from "../components/MovieGridSkeleton";

const Home = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getTrendingMovies());
  }, [dispatch]);

  if (loading) return <MovieGridSkeleton count={10} />;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="page">
      <h2>🔥 Trending This Week</h2>
      <div className="grid">
        {list.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
