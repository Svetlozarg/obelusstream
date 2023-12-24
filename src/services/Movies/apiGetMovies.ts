import { Query } from "../apiTypes";

export const getMovieById = (movie_id: number): Query => ({
  endpoint: `movie/${movie_id}`,
  method: "GET",
});

export const getSimilarMovies = (movie_id: number): Query => ({
  endpoint: `movie/${movie_id}/similar`,
  method: "GET",
});

export const getMovieCredits = (movie_id: number): Query => ({
  endpoint: `movie/${movie_id}/credits`,
  method: "GET",
});

export const getMovieVideos = (movie_id: number): Query => ({
  endpoint: `movie/${movie_id}/videos`,
  method: "GET",
});

export const getMoviesByGenre = (
  genre_id: number | number[],
  page: number
): Query => ({
  endpoint: "discover/movie",
  method: "GET",
  input: `&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre_id}`,
});

export const getDiscoverMovies = (page: number): Query => ({
  endpoint: "discover/movie",
  method: "GET",
  input: `&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`,
});

export const getAllMovieGenres = (): Query => ({
  endpoint: "genre/movie/list",
  method: "GET",
});

export const getMovieKeywords = (movie_id: number): Query => ({
  endpoint: `movie/${movie_id}/keywords`,
  method: "GET",
});
