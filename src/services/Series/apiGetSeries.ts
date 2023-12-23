import { Query } from "../apiTypes";

export const getSeriesById = (series_id: number): Query => ({
  endpoint: `tv/${series_id}`,
  method: "GET",
});

export const getSeriesCredits = (series_id: number): Query => ({
  endpoint: `tv/${series_id}/credits`,
  method: "GET",
});

export const getSeriesRecommendations = (series_id: number): Query => ({
  endpoint: `tv/${series_id}/similar`,
  method: "GET",
});

export const getSeriesVideos = (series_id: number): Query => ({
  endpoint: `tv/${series_id}/videos`,
  method: "GET",
});

export const getSeriesSeason = (
  series_id: number,
  season_number: number
): Query => ({
  endpoint: `tv/${series_id}/season/${season_number}`,
  method: "GET",
});

export const getSeriesByGenre = (
  genre_id: number | number[],
  page: number
): Query => ({
  endpoint: "discover/tv",
  method: "GET",
  input: `&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre_id}`,
});

export const getDiscoverSeries = (page: number): Query => ({
  endpoint: "discover/tv",
  method: "GET",
  input: `&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`,
});

export const getAllSeriesGenres = (): Query => ({
  endpoint: "genre/tv/list",
  method: "GET",
});
