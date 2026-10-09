import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: { items: loadFavorites() },
  reducers: {
    addFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.items.find((m) => m.id === movie.id);
      if (!exists) {
        state.items.push(movie);
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((m) => m.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
