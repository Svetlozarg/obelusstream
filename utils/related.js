import axios from "axios";

// Fetch Related Movie
export async function getRelated(movie) {
  const data = axios
    .get(
      `
      https://api.themoviedb.org/3/movie/${movie}/similar?api_key=097a90822255e1b72c46fb5bcbe7716f&language=en-US&page=1`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}

// Fetch Related Series
export async function getRelatedSeries(series) {
  const data = axios
    .get(
      `
      https://api.themoviedb.org/3/tv/${series}/similar?api_key=097a90822255e1b72c46fb5bcbe7716f&language=en-US&page=1`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}
