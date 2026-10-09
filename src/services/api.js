import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  },
);

export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

export const fetchTrendingMovies = () =>
  api.get("/trending/movie/week").then((res) => res.data.results);

export const searchMoviesAPI = (query) =>
  api
    .get("/search/movie", { params: { query } })
    .then((res) => res.data.results);

export const fetchMovieDetails = (id) =>
  api.get(`/movie/${id}`).then((res) => res.data);

export default api;
