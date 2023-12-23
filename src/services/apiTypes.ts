export type ResponseError = {
  detail: string;
};

export type Query = {
  endpoint: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  variables?: { [key: string]: any };
  input?: string;
};

export type CallApiParams = {
  query: Query;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  revenue: number;
  budget: number;
  homepage: string;
  imdb_id: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  videos: {
    results: {
      id: string;
      iso_639_1: string;
      iso_3166_1: string;
      key: string;
      name: string;
      site: string;
      size: number;
      type: string;
    }[];
  };
  images: {
    backdrops: {
      aspect_ratio: number;
      file_path: string;
      height: number;
      iso_639_1: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[];
    posters: {
      aspect_ratio: number;
      file_path: string;
      height: number;
      iso_639_1: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[];
  };
};

export type Series = {
  adult: boolean;
  backdrop_path: string;
  created_by: Object[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Object[];
  name: string;
  networks: Object[];
  next_episode_to_air: Object[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: Season[];
  spoken_languages: Object[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type SeriesFromList = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  vote_average: number;
  vote_count: number;
};

export type MovieList = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type SeriesList = {
  page: number;
  results: SeriesFromList[];
  total_pages: number;
  total_results: number;
};

export type CrewList = {
  cast: Member[];
  crew: Object[];
};

export type Member = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type VideoList = {
  id: number;
  results: Video[];
};

export type Video = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
};

export type Season = {
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
};

export type Episode = {
  air_date: string;
  crew: Object[];
  episode_number: number;
  guest_stars: Object[];
  name: string;
  overview: string;
  id: number;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};

export type SearchResult = {
  page: number;
  results: Movie[] | SeriesFromList[];
  total_pages: number;
  total_results: number;
};

export type GenresList = {
  genres: Genre[];
};

export type Genre = {
  id: number;
  name: string;
};
