import Link from 'next/link';

import { exploreSeries } from '../utils/exploreSeries';
import MovieCard from '../components/MovieCard';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { getSeries } from '../utils/series';

export default function Series({ series }) {
  // State for storing series
  const [getMovies, setMovies] = useState([]);
  // State for page
  const [getPage, setPage] = useState(2);
  // State for loading
  const [loading, setLoading] = useState(false);
  // State to hold series info
  const [getSeriesInfo, setSeriesInfo] = useState([]);

  // Fetch next page and add to array
  const loadMoreMovies = async () => {
    setLoading(true);

    // Fetch next page
    let series = await exploreSeries(getPage);

    // Loop and push to the array
    series.results.forEach(async (movie) => {
      const newMovies = [];
      newMovies.push(await getSeries(movie.id));
      setMovies((oldMovies) => [...oldMovies, ...newMovies]);
    });

    // Current page + 1
    setPage(getPage + 1);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleSeries = () => {
    const seriesID = [];
    series.results.map((id) => {
      seriesID.push(id.id);
    });

    const seriesInfo = [];
    seriesID.map(async (serie, i) => {
      seriesInfo.push(await getSeries(serie));

      if (i === seriesID.length - 1) {
        setSeriesInfo(seriesInfo);
      }
    });
  };

  useEffect(() => {
    loadMoreMovies();
    handleSeries();
  }, []);

  return (
    <div className="movies">
      <h2>Explore Popular Series</h2>
      <div className="movies-wrapper">
        {/* Iterate over first page of series */}
        {getSeriesInfo.map((serie) => {
          if (
            serie.poster_path &&
            serie.original_name &&
            serie.origin_country &&
            serie.overview &&
            serie.vote_average
          ) {
            // Get first part of date
            const splitDate = serie?.last_air_date?.split('-');
            const splitDateFirst = serie?.first_air_date?.split('-');

            return (
              <Link
                href={{
                  pathname: '/series',
                  query: { id: serie.id, season: '1', episode: '1' },
                }}
                key={serie.id}
                passHref={true}
              >
                <a>
                  <MovieCard
                    id={serie.id}
                    title={serie.name}
                    year={
                      splitDate !== undefined ? splitDate[0] : splitDateFirst[0]
                    }
                    vote={serie.vote_average.toFixed(1)}
                    tag="TV"
                    seasons={serie.last_episode_to_air?.season_number}
                    episodes={serie.last_episode_to_air?.episode_number}
                    description={serie.overview}
                    runtime={serie.episode_run_time[0]}
                    country={serie.origin_country[0]}
                    genre={serie.genres}
                    img={
                      'https://image.tmdb.org/t/p/original/' + serie.poster_path
                    }
                  />
                </a>
              </Link>
            );
          }
        })}

        {/* Iterate over series array */}
        {getMovies.map((serie, i) => {
          if (i < getMovies.length - 10) {
            if (
              serie.poster_path &&
              serie.original_name &&
              serie.origin_country &&
              serie.overview &&
              serie.vote_average
            ) {
              // Get first part of date
              const splitDate = serie?.last_air_date?.split('-');
              const splitDateFirst = serie?.first_air_date?.split('-');

              return (
                <Link
                  href={{
                    pathname: '/series',
                    query: { id: serie.id, season: '1', episode: '1' },
                  }}
                  key={serie.id}
                  passHref={true}
                >
                  <a>
                    <MovieCard
                      id={serie.id}
                      title={serie.name}
                      year={
                        splitDate !== undefined
                          ? splitDate[0]
                          : splitDateFirst[0]
                      }
                      vote={serie.vote_average.toFixed(1)}
                      tag="TV"
                      seasons={serie.last_episode_to_air?.season_number}
                      episodes={serie.last_episode_to_air?.episode_number}
                      description={serie.overview}
                      runtime={serie.episode_run_time[0]}
                      country={serie.origin_country[0]}
                      genre={serie.genres}
                      img={
                        'https://image.tmdb.org/t/p/original/' +
                        serie.poster_path
                      }
                    />
                  </a>
                </Link>
              );
            }
          }
        })}

        {/* Iterate over series array */}
        {!loading &&
          getMovies.map((serie, i) => {
            if (i >= getMovies.length - 10) {
              if (
                serie.poster_path &&
                serie.original_name &&
                serie.origin_country &&
                serie.overview &&
                serie.vote_average
              ) {
                // Get first part of date
                const splitDate = serie?.last_air_date?.split('-');
                const splitDateFirst = serie?.first_air_date?.split('-');

                return (
                  <Link
                    href={{
                      pathname: '/series',
                      query: { id: serie.id, season: '1', episode: '1' },
                    }}
                    key={serie.id}
                    passHref={true}
                  >
                    <a>
                      <MovieCard
                        id={serie.id}
                        title={serie.name}
                        year={
                          splitDate !== undefined
                            ? splitDate[0]
                            : splitDateFirst[0]
                        }
                        vote={serie.vote_average.toFixed(1)}
                        tag="TV"
                        seasons={serie.last_episode_to_air?.season_number}
                        episodes={serie.last_episode_to_air?.episode_number}
                        description={serie.overview}
                        runtime={serie.episode_run_time[0]}
                        country={serie.origin_country[0]}
                        genre={serie.genres}
                        img={
                          'https://image.tmdb.org/t/p/original/' +
                          serie.poster_path
                        }
                      />
                    </a>
                  </Link>
                );
              }
            }
          })}
      </div>

      {/* Loading Icon */}
      <div className="movies-div">
        {loading ? (
          <ClipLoader color={'#123abv'} loading={loading} size={80} />
        ) : (
          <button className="loadmore-btn" onClick={loadMoreMovies}>
            More Movies
          </button>
        )}
      </div>
    </div>
  );
}

// Get Static Props
export async function getServerSideProps() {
  // Fetch First Page Of Series
  let series = await exploreSeries(1);

  return {
    props: {
      series: series,
    },
  };
}
