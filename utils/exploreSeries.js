import axios from "axios";

// Fetch series by page
export async function exploreSeries(page) {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/discover/tv?api_key=097a90822255e1b72c46fb5bcbe7716f&language=en-US&sort_by=popularity.desc&page=${page}&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}
