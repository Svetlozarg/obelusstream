import { useEffect, useState } from 'react';
import { getMovie } from '../utils/movie';
import Link from 'next/link';
import MovieCard from '../components/MovieCard';
import ClipLoader from 'react-spinners/ClipLoader';
import { getSeries } from '../utils/series';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import {
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Favorites() {
  const router = useRouter();
  const { user } = UserAuth();
  // State for favourite movies
  const [movies, setMovies] = useState([]);
  // State for favourite series
  const [series, setSeries] = useState([]);
  // State for loading
  const [loading, setLoading] = useState();
  // State for tabs
  const [toggleTab, setToggleTab] = useState(1);

  // Movies ID Array
  let moviesArr = [];
  let seriesArr = [];

  let movieIdArr = [];
  let seriesIdArr = [];

  //   Fetch Favourite Movies
  const fetchMovies = async () => {
    if (user.displayName !== undefined) {
      setLoading(true);
      const queryDoc = await getDocs(collection(db, user.displayName));
      queryDoc.forEach((doc) => {
        movieIdArr.push(doc.data());
      });

      movieIdArr.forEach(async (movie) => {
        if (movie.tag === 'movie') {
          moviesArr.push(await getMovie(movie.id));
          setMovies(moviesArr);
        }
      });

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  //   Fetch Favourite Series
  const fetchSeries = async () => {
    if (user.displayName !== undefined) {
      setLoading(true);
      const queryDoc = await getDocs(collection(db, user.displayName));
      queryDoc.forEach((doc) => {
        seriesIdArr.push(doc.data());
      });
      seriesIdArr.forEach(async (serie) => {
        if (serie.tag === 'tv') {
          seriesArr.push(await getSeries(serie.id));
          setSeries(seriesArr);
        }
      });

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleToggleTab = (index) => {
    setToggleTab(index);
  };

  const fetchData = () => {
    if (user !== undefined) {
      fetchMovies();
      fetchSeries();
    }
  };

  useEffect(() => {
    if (user !== undefined) {
      fetchData();
    } else {
      router.push('/login');
    }
  }, [user?.displayName]);

  return (
    <div className="favourites">
      <div className="favourites-tabs">
        <h2
          className={toggleTab === 1 ? 'active' : ''}
          onClick={() => handleToggleTab(1)}
        >
          Favourite Movies
        </h2>
        <h2
          className={toggleTab === 2 ? 'active' : ''}
          onClick={() => handleToggleTab(2)}
        >
          Favourite Series
        </h2>
      </div>

      {/* Movies Tab */}
      <div
        className="favourites-main-wrapper"
        style={toggleTab === 1 ? { display: 'block' } : { display: 'none' }}
      >
        {/* Loading Icon */}
        {loading ? (
          <div
            style={{
              height: '40vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ClipLoader color={'#123abv'} loading={loading} size={80} />
          </div>
        ) : (
          ''
        )}

        {/* No movies */}
        {movies.length <= 0 && !loading && (
          <p className="no-movies-p">No movies added to the list</p>
        )}

        {/* Favourtie Movies */}
        {!loading && (
          <div
            className={
              movies.length < 10
                ? 'favourites-wrapper .start'
                : 'favourites-wrapper .center'
            }
          >
            {/* Iterate over favourite movies */}
            {movies.map((movie) => {
              if (movie === undefined) return;
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
                      year={splitDate[0]}
                      vote={movie?.vote_average.toFixed(1)}
                      tag="Movie"
                      description={movie?.overview}
                      runtime={movie?.runtime}
                      country={movie?.original_language}
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
        )}
      </div>

      {/* Series Tab */}
      <div
        className="favourites-main-wrapper"
        style={toggleTab === 2 ? { display: 'block' } : { display: 'none' }}
      >
        {/* Loading Icon */}
        {loading ? (
          <div
            style={{
              height: '40vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ClipLoader color={'#123abv'} loading={loading} size={80} />
          </div>
        ) : (
          ''
        )}

        {/* No series */}
        {series.length <= 0 && !loading && (
          <p className="no-movies-p">No series added to the list</p>
        )}

        {/* Favourtie Series */}
        {!loading && (
          <div
            className={
              series.length < 10
                ? 'favourites-wrapper .start'
                : 'favourites-wrapper .center'
            }
          >
            {/* Iterate over favourite series */}
            {series.map((serie) => {
              if (serie === undefined) return;
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
                      tag="TV"
                      seasons={serie?.last_episode_to_air?.season_number}
                      episodes={serie?.last_episode_to_air?.episode_number}
                      description={serie?.overview}
                      runtime={serie?.episode_run_time[0]}
                      country={serie?.origin_country[0]}
                      genre={serie?.genres}
                      img={
                        'https://image.tmdb.org/t/p/original/' +
                        serie?.poster_path
                      }
                    />
                  </a>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
