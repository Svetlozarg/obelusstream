import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getGenre } from '../utils/genres';
import MovieCard from '../components/MovieCard';
import { getGenreText } from '../utils/genres';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Genres({ query }) {
  const [getMovies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genreText, setGenreText] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch first 2 pages on load
  const handleFetchMovies = async () => {
    setLoading(true);

    setMovies([]);
    setPage([]);

    const data = await getGenreText();
    setGenreText(data.genres);

    const pageOne = await getGenre(query, 1);
    const pageTwo = await getGenre(query, 2);

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

    const moviesData = await getGenre(query, page);

    const moviesArr = [];
    moviesData.results.map((item) => {
      moviesArr.push(item);
    });

    setMovies((oldMovies) => [...oldMovies, ...moviesArr]);
  };

  useEffect(() => {
    handleFetchMovies();
  }, [query]);

  return (
    <div className='genres'>
      <h2>
        {genreText.map((genreName) => {
          if (genreName.id == query) {
            return <span key='query'>{genreName.name}</span>;
          }
        })}{' '}
        Movies
      </h2>

      <div
        className='loading-box'
        style={loading ? { display: 'flex' } : { display: 'none' }}
      >
        <ClipLoader color={'#123abv'} loading={loading} size={80} />
      </div>

      {!loading && (
        <div className='genres-wrapper'>
          {/* Iterate over genre movies */}
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

      <div className='btn-wrap'>
        <button className='loadmore-btn' onClick={loadMore}>
          More Movies
        </button>
      </div>
    </div>
  );
}

// Get Static Props
export async function getServerSideProps(context) {
  // Get query
  let query = context.query.id;

  return {
    props: {
      query: query,
    },
  };
}
