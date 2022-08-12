import axios from "axios";

// Fetch Series
export async function getSeries(id) {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=097a90822255e1b72c46fb5bcbe7716f`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}

// Fetch episodes
export async function getEpisodes(id, season) {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=097a90822255e1b72c46fb5bcbe7716f`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}
