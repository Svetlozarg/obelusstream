import axios from "axios";

// Search
export async function getSearch(query) {
  const data = axios
    .get(
      `
https://api.themoviedb.org/3/search/multi?api_key=097a90822255e1b72c46fb5bcbe7716f&language=en-US&query=${query}&page=1&include_adult=false`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}
