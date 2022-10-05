import axios from 'axios';

// Fetch Trending Movies
export async function getTrendingMovies() {
  const data = axios
    .get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=097a90822255e1b72c46fb5bcbe7716f`
    )
    .then((result) => {
      return result.data.results;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}

// Fetch Trending Series
export async function getTrendingSeries() {
  const data = axios
    .get(
      'https://api.themoviedb.org/3/trending/tv/week?api_key=097a90822255e1b72c46fb5bcbe7716f'
    )
    .then((result) => {
      return result.data.results;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}
