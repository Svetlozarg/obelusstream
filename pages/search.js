import Link from 'next/link';
import { getSearch } from '../utils/search';

import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import { getSeries } from '../utils/series';
import { getMovie } from '../utils/movie';

export default function Search({ search, query }) {
  // State to hold series info
  const [getSeriesInfo, setSeriesInfo] = useState([]);

  const handleSeries = () => {
    const seriesID = [];
    const moviesID = [];
    search.results.map((id) => {
      if (id.media_type === 'movie') {
        moviesID.push(id.id);
      } else if (id.media_type === 'tv') {
        seriesID.push(id.id);
      }
    });

    const resultArr = [];
    seriesID.map(async (serieResult, i) => {
      resultArr.push(await getSeries(serieResult));

      if (i === seriesID.length - 1) {
        setSeriesInfo(resultArr);
      }
    });
    moviesID.map(async (movieResult, i) => {
      resultArr.push(await getMovie(movieResult));

      if (i === moviesID.length - 1) {
        setSeriesInfo(resultArr);
      }
    });
  };

  useEffect(() => {
    handleSeries();
  }, [query]);

  // Check if there is a search query
  if (search.length !== 0 || query.length !== 0) {
    return (
      <div className="search">
        {/* Show no results for empty query */}
        {search <= 0 && (
          <div className="no-results">
            <h2>
              No matching results were found for: <span>{query[0]}</span>
            </h2>
            <h2>Please try searching again.</h2>
          </div>
        )}
        {/* Show result info */}
        {search && (
          <h2>
            Search results for: <span>{query[0]}</span>
          </h2>
        )}

        <div className="search-wrapper">
          {/* Iterate over search results */}
          {getSeriesInfo.map((result) => {
            // If Movie
            if (
              result.poster_path &&
              result.title &&
              result.vote_average &&
              result.release_date &&
              result.overview
            ) {
              const splitDate = result.release_date.split('-');
              return (
                <Link
                  href={{
                    pathname: '/movie',
                    query: { id: result.id },
                  }}
                  key={result.id}
                  passHref={true}
                >
                  <a>
                    <MovieCard
                      id={result.id}
                      title={result.original_title}
                      year={splitDate[0]}
                      vote={result.vote_average.toFixed(1)}
                      tag="Movie"
                      img={
                        'https://image.tmdb.org/t/p/original/' +
                        result.poster_path
                      }
                    />
                  </a>
                </Link>
              );
              // If tv
            } else if (
              result.poster_path &&
              result.original_name &&
              result.origin_country &&
              result.overview &&
              result.vote_average &&
              result.origin_country.length !== 0
            ) {
              // Get first part of date
              const splitDate = result?.last_air_date?.split('-');
              const splitDateFirst = result?.first_air_date?.split('-');

              return (
                <Link
                  href={{
                    pathname: '/series',
                    query: { id: result.id, season: '1', episode: '1' },
                  }}
                  key={result.id}
                  passHref={true}
                >
                  <a>
                    <MovieCard
                      id={result.id}
                      title={result.original_name}
                      year={
                        splitDate !== undefined
                          ? splitDate[0]
                          : splitDateFirst[0]
                      }
                      vote={result.vote_average.toFixed(1)}
                      tag="TV"
                      seasons={result.last_episode_to_air?.season_number}
                      episodes={result.last_episode_to_air?.episode_number}
                      img={
                        'https://image.tmdb.org/t/p/original/' +
                        result.poster_path
                      }
                    />
                  </a>
                </Link>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }
}

// Get Static Props
export async function getServerSideProps(context) {
  // Get query
  let query = context.query.query;

  let queryArr = [];

  // Fetch Movie
  let search = await getSearch(query);

  queryArr.push(query);

  if (search === undefined || queryArr.length === 0) {
    search = [];
    queryArr = [];
  }

  return {
    props: {
      search: search,
      query: queryArr,
    },
  };
}
