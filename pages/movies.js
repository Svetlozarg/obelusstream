import Link from "next/link";

import { fetchMovies } from "../utils/movies";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Movies({ movies }) {
  // State for storing series
  const [getMovies, setMovies] = useState([]);
  // State for page
  const [getPage, setPage] = useState(2);
  // State for loading
  const [loading, setLoading] = useState(false);

  // Fetch next page and add to array
  const loadMoreMovies = async () => {
    setLoading(true);

    // Fetch next page
    let movies = await fetchMovies(getPage);

    // Loop and push to the array
    movies.results.forEach((movie) => {
      const newMovies = [];
      newMovies.push(movie);
      setMovies((oldMovies) => [...oldMovies, ...newMovies]);
    });

    // Current page + 1
    setPage(getPage + 1);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadMoreMovies();
  }, []);

  return (
    <div className="movies">
      <h2>Explore Popular Movies</h2>
      <div className="movies-wrapper">
        {/* Iterate over movies */}
        {movies.results.map((movie) => {
          if (
            movie.poster_path &&
            movie.title &&
            movie.vote_average &&
            movie.release_date &&
            movie.overview &&
            movie.genre_ids.length !== 0
          ) {
            // Get first part of date
            const splitDate = movie.release_date.split("-");

            return (
              <Link
                href={{
                  pathname: "/movie",
                  query: { id: movie.id },
                }}
                key={movie.id}
                passHref={true}
              >
                <a>
                  <MovieCard
                    id={movie.id}
                    title={movie.original_title}
                    year={splitDate[0]}
                    vote={movie.vote_average.toFixed(1)}
                    tag="Movie"
                    img={
                      "https://image.tmdb.org/t/p/original/" + movie.poster_path
                    }
                  />
                </a>
              </Link>
            );
          }
        })}

        {/* Iterate over movies array */}
        {!loading &&
          getMovies.map((movie) => {
            if (
              movie.poster_path &&
              movie.title &&
              movie.vote_average &&
              movie.release_date &&
              movie.overview &&
              movie.genre_ids.length !== 0
            ) {
              // Get first part of date
              const splitDate = movie.release_date.split("-");

              return (
                <Link
                  href={{
                    pathname: "/movie",
                    query: { id: movie.id },
                  }}
                  key={movie.id}
                  passHref={true}
                  style={loading ? { display: "none" } : { display: "block" }}
                >
                  <a>
                    <MovieCard
                      id={movie.id}
                      title={movie.original_title}
                      year={splitDate[0]}
                      vote={movie.vote_average.toFixed(1)}
                      tag="Movie"
                      img={
                        "https://image.tmdb.org/t/p/original/" +
                        movie.poster_path
                      }
                    />
                  </a>
                </Link>
              );
            }
          })}
      </div>

      {/* Loading Icon */}
      <div className="movies-div">
        {loading ? (
          <ClipLoader color={"#123abv"} loading={loading} size={80} />
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
  // Fetch First Page Of Movies
  let movies = await fetchMovies(1);

  return {
    props: {
      movies: movies,
    },
  };
}
