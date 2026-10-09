import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTrendingMovies,
  searchMoviesAPI,
  fetchMovieDetails,
} from "../../services/api";

export const getTrendingMovies = createAsyncThunk(
  "movies/getTrending",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTrendingMovies();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch movies");
    }
  },
);

export const searchMovies = createAsyncThunk(
  "movies/search",
  async (query, { rejectWithValue }) => {
    try {
      if (!query.trim()) return [];
      return await searchMoviesAPI(query);
    } catch (error) {
      return rejectWithValue(error.message || "Search failed");
    }
  },
);

export const getMovieDetails = createAsyncThunk(
  "movies/getDetails",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchMovieDetails(id);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch details");
    }
  },
);

const initialState = {
  list: [],
  searchResults: [],
  selectedMovie: null,
  searchHistory: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    addToSearchHistory: (state, action) => {
      const query = action.payload.trim();
      if (!query) return;
      state.searchHistory = [
        query,
        ...state.searchHistory.filter((q) => q !== query),
      ].slice(0, 5);
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearSearchResults,
  clearSelectedMovie,
  addToSearchHistory,
  clearSearchHistory,
} = movieSlice.actions;

export default movieSlice.reducer;
