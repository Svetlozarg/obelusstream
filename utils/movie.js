import axios from "axios";

// Fetch Movie
export async function getMovie(id) {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=097a90822255e1b72c46fb5bcbe7716f`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}
