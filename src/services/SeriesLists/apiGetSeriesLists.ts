import { Query } from "../apiTypes";

export const getTrendingTvShows: Query = {
  endpoint: "trending/tv/week",
  method: "GET",
};

export const getPopularTvShows: Query = {
  endpoint: "tv/popular",
  method: "GET",
};

export const getTopRatedTvShows: Query = {
  endpoint: "tv/top_rated",
  method: "GET",
};

export const getOnTheAirTvShows: Query = {
  endpoint: "tv/on_the_air",
  method: "GET",
};

export const getAiringTodayTvShows: Query = {
  endpoint: "tv/airing_today",
  method: "GET",
};
