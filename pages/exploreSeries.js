import Link from "next/link";

import { exploreSeries } from "../utils/exploreSeries";
import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Series({ series }) {
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
    let movies = await exploreSeries(getPage);

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
      <h2>Explore Popular Series</h2>
      <div className="movies-wrapper">
        {/* Iterate over first page of series */}
        {series.results.map((serie) => {
          if (
            serie.poster_path &&
            serie.genre_ids.length !== 0 &&
            serie.original_name &&
            serie.origin_country &&
            serie.overview &&
            serie.vote_average
          ) {
            return (
              <Link
                href={{
                  pathname: "/series",
                  query: { id: serie.id, season: "1", episode: "1" },
                }}
                key={serie.id}
                passHref={true}
              >
                <a>
                  <MovieCard
                    id={serie.id}
                    title={serie.name}
                    year={serie.origin_country[0]}
                    vote={serie.vote_average.toFixed(1)}
                    tag="TV"
                    img={
                      "https://image.tmdb.org/t/p/original/" + serie.poster_path
                    }
                  />
                </a>
              </Link>
            );
          }
        })}

        {/* Iterate over series array */}
        {!loading &&
          getMovies.map((serie) => {
            if (
              serie.poster_path &&
              serie.genre_ids.length !== 0 &&
              serie.original_name &&
              serie.origin_country &&
              serie.overview &&
              serie.vote_average
            ) {
              return (
                <Link
                  href={{
                    pathname: "/series",
                    query: { id: serie.id, season: "1", episode: "1" },
                  }}
                  key={serie.id}
                  passHref={true}
                >
                  <a>
                    <MovieCard
                      id={serie.id}
                      title={serie.name}
                      year={serie.origin_country[0]}
                      vote={serie.vote_average.toFixed(1)}
                      tag="TV"
                      img={
                        "https://image.tmdb.org/t/p/original/" +
                        serie.poster_path
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
  // Fetch First Page Of Series
  let series = await exploreSeries(1);

  return {
    props: {
      series: series,
    },
  };
}
