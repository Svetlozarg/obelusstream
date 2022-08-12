import axios from "axios";

// Fetch Movie Trailer
export async function getMovieTrailer(movie) {
  const data = axios
    .get(
      `
      https://api.themoviedb.org/3/movie/${movie}/videos?api_key=097a90822255e1b72c46fb5bcbe7716f&language=en-US
      `
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}

// Fetch Series Trailer
export async function getSeriesTrailer(series) {
  const data = axios
    .get(
      `
      https://api.themoviedb.org/3/tv/${series}/videos?api_key=097a90822255e1b72c46fb5bcbe7716f&language=en-US
      `
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}
