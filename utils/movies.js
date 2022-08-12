import axios from "axios";

// Fetch movies by page
export async function fetchMovies(page) {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=097a90822255e1b72c46fb5bcbe7716f&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_watch_monetization_types=free`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}
