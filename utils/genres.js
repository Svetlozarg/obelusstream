import axios from 'axios';

export async function getGenre(genre, page) {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=097a90822255e1b72c46fb5bcbe7716f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}

export async function getGenreText() {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=097a90822255e1b72c46fb5bcbe7716f&language=en-US`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}
