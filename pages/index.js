import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getSeries } from '../utils/series';
import { getMovie } from '../utils/movie';

import MovieCard from '../components/MovieCard';

import { getTrendingMovies, getTrendingSeries } from '../utils/trending';

export default function Home({ movies, series }) {
  // State to hold series info
  const [getSeriesInfo, setSeriesInfo] = useState([]);
  const [getMoviesInfo, setMoviesInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  // Ref for search
  const query = useRef('');

  // On enter search
  const onKeyPress = (e) => {
    if (e.which == 13) {
      Router.push('/search/?query=' + query.current.value);
    }
  };

  const handleSeriesMovies = () => {
    const seriesInfo = [];
    series.map(async (serie, i) => {
      const serieInfo = await getSeries(serie.id);
      seriesInfo.push(serieInfo);
      if (i === series.length - 1) {
        setSeriesInfo(seriesInfo);
      }
    });

    const moviesInfo = [];
    movies.map(async (movie, i) => {
      const movieInfo = await getMovie(movie.id);
      moviesInfo.push(movieInfo);
      if (i === movies.length - 1) {
        setMoviesInfo(moviesInfo);
      }
    });

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    handleSeriesMovies();
  }, []);

  return (
    <div>
      <Head>
        <title>ObelusStream</title>
        <meta
          name='description'
          content='A movie and serie streaming website'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* Main Search */}
      <div className='main-search'>
        <div className='main-search-cont'>
          <h2>Find Movies or Series to watch</h2>
          <div className='main-search-cont-div'>
            <div id='searchUsers' className='top-search'>
              <div className='top-search__input-container'>
                {/* Search */}
                <input
                  className='top-search__input'
                  type='text'
                  spellCheck='false'
                  placeholder='Search...'
                  ref={query}
                  onKeyPress={onKeyPress}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ color: '#000', width: '25px', marginRight: '16px' }}
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Movies */}
      <div className='trending'>
        <h2>Trending Movies</h2>
        {loading && (
          <div className='movie-loading-skeleton'>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
          </div>
        )}

        <div
          className='trending-wrapper'
          style={loading ? { display: 'none' } : { display: 'grid' }}
        >
          {/* Iterate over trending movies */}
          {getMoviesInfo.map((movie) => {
            // Get first part of date
            const splitDate = movie?.release_date.split('-');
            return (
              <Link
                href={{
                  pathname: '/movie',
                  query: { id: movie?.id },
                }}
                key={movie?.id}
                passHref={true}
              >
                <a>
                  <MovieCard
                    id={movie?.id}
                    title={movie?.original_title}
                    description={movie?.overview}
                    year={splitDate[0]}
                    vote={movie?.vote_average.toFixed(1)}
                    tag='Movie'
                    runtime={movie?.runtime}
                    country={movie?.production_countries[0]?.name}
                    genre={movie?.genres}
                    img={
                      'https://image.tmdb.org/t/p/original/' +
                      movie?.poster_path
                    }
                  />
                </a>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Trending Series */}
      <div className='trending'>
        <h2>Trending Series</h2>
        {loading && (
          <div className='movie-loading-skeleton'>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
            <div className='skeleton-cjtpzwmve7u'></div>
          </div>
        )}
        <div
          className='trending-wrapper'
          style={loading ? { display: 'none' } : { display: 'grid' }}
        >
          {/* Iterate over trending series */}
          {getSeriesInfo.map((serie) => {
            if (
              serie?.vote_average !== 0 &&
              serie?.last_episode_to_air?.season_number !== 0 &&
              serie?.last_episode_to_air?.episode_number !== 0
            ) {
              // Get first part of date
              const splitDate = serie?.last_air_date?.split('-');
              const splitDateFirst = serie?.first_air_date?.split('-');
              return (
                <Link
                  href={{
                    pathname: '/series',
                    query: { id: serie?.id, season: '1', episode: '1' },
                  }}
                  key={serie?.id}
                  passHref={true}
                >
                  <a>
                    <MovieCard
                      id={serie?.id}
                      title={serie?.name}
                      year={
                        splitDate !== undefined
                          ? splitDate[0]
                          : splitDateFirst[0]
                      }
                      vote={serie?.vote_average.toFixed(1)}
                      description={serie?.overview}
                      tag='TV'
                      runtime={serie?.episode_run_time[0]}
                      country={serie?.origin_country[0]}
                      seasons={serie?.last_episode_to_air?.season_number}
                      episodes={serie?.last_episode_to_air?.episode_number}
                      genre={serie?.genres}
                      img={
                        'https://image.tmdb.org/t/p/original/' +
                        serie?.poster_path
                      }
                    />
                  </a>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

// Get Static Props
export async function getServerSideProps() {
  // Fetch Trending Movies
  const trendingMovies = await getTrendingMovies();

  // Fetch Trending Series
  const trendingSeries = await getTrendingSeries();

  return {
    props: {
      movies: trendingMovies,
      series: trendingSeries,
    },
  };
}
