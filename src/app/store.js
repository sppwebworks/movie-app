import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/movieSlice";
import favoriteReducer from "../features/favorites/favoriteSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    favorites: favoriteReducer,
  },
});
