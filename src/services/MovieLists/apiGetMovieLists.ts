import { Query } from "../apiTypes";

export const getTrendingMovies: Query = {
  endpoint: "trending/movie/week",
  method: "GET",
};

export const getNowPlayingMovieList: Query = {
  endpoint: "movie/now_playing",
  method: "GET",
};

export const getPopularMovieList: Query = {
  endpoint: "movie/popular",
  method: "GET",
};

export const getTopRatedMovieList: Query = {
  endpoint: "movie/top_rated",
  method: "GET",
};

export const getUpcomingMovieList: Query = {
  endpoint: "movie/upcoming",
  method: "GET",
};
