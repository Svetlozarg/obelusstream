import axios from "axios";

// Fetch Movie Cast
export async function fetchCast(movie) {
  const data = axios
    .get(
      `
      https://api.themoviedb.org/3/movie/${movie}/credits?api_key=097a90822255e1b72c46fb5bcbe7716f&language=en-US`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}

// Fetch Series Cast
export async function fetchCastSeries(movie) {
  const data = axios
    .get(
      `
      https://api.themoviedb.org/3/tv/${movie}/credits?api_key=097a90822255e1b72c46fb5bcbe7716f&language=en-US
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
