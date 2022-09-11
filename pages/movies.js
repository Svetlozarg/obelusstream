import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchMovies } from '../utils/movies';
import MovieCard from '../components/MovieCard';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Movies() {
  const [getMovies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch first 2 pages on load
  const handleFetchMovies = async () => {
    setLoading(true);

    setMovies([]);
    setPage([]);

    const pageOne = await fetchMovies(1);
    const pageTwo = await fetchMovies(2);

    setPage(3);

    const moviesArr = [];
    pageOne.results.map((item) => {
      moviesArr.push(item);
    });
    pageTwo.results.map((item) => {
      moviesArr.push(item);
    });
    setMovies(moviesArr);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // Fetch next page
  const loadMore = async () => {
    setPage(page + 1);

    const moviesData = await fetchMovies(page);

    const moviesArr = [];
    moviesData.results.map((item) => {
      moviesArr.push(item);
    });

    setMovies((oldMovies) => [...oldMovies, ...moviesArr]);
  };

  useEffect(() => {
    handleFetchMovies();
  }, []);

  return (
    <div className='movies'>
      <h2>Explore Popular Movies</h2>

      <div
        className='movies-box'
        style={loading ? { display: 'flex' } : { display: 'none' }}
      >
        <ClipLoader color={'#123abv'} loading={loading} size={80} />
      </div>

      {!loading && (
        <div className='movies-wrapper'>
          {/* Iterate over movies */}
          {getMovies.length !== 0 &&
            getMovies.map((movie, i) => {
              // Get first part of date
              if (
                movie.poster_path &&
                movie.title &&
                movie.vote_average &&
                movie.release_date &&
                movie.overview &&
                movie.genre_ids.length !== 0
              ) {
                const splitDate = movie.release_date.split('-');
                return (
                  <Link
                    href={{
                      pathname: '/movie',
                      query: { id: movie.id },
                    }}
                    key={i}
                    passHref={true}
                  >
                    <a>
                      <MovieCard
                        id={movie.id}
                        title={movie.original_title}
                        year={splitDate[0]}
                        vote={movie.vote_average.toFixed(1)}
                        tag='Movie'
                        img={
                          'https://image.tmdb.org/t/p/original/' +
                          movie.poster_path
                        }
                      />
                    </a>
                  </Link>
                );
              }
            })}
        </div>
      )}

      {/* Loading Icon */}
      <div className='movies-div'>
        <button className='loadmore-btn' onClick={loadMore}>
          More Movies
        </button>
      </div>
    </div>
  );
}
