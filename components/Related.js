import { useState, useEffect } from "react";
import { getSeries } from "../utils/series";
import { getMovie } from "../utils/movie";
import Link from "next/link";
import MovieCard from "../components/MovieCard";

export default function Related({ type, related }) {
  // State for loading
  const [loading, setLoading] = useState(true);
  // State to hold series info
  const [getMovieInfo, setMovieInfo] = useState([]);
  // State to hold series info
  const [getSeriesInfo, setSeriesInfo] = useState([]);

  const handleType = () => {
    if (type === "movie") {
      const moviesInfo = [];
      related.results.map(async (movie, i) => {
        const movieInfo = await getMovie(movie.id);
        moviesInfo.push(movieInfo);
        if (i === related.results.length - 1) {
          setMovieInfo(moviesInfo);
        }
      });
    } else if (type === "tv") {
      const seriesInfo = [];
      related.results.map(async (serie, i) => {
        const serieInfo = await getSeries(serie.id);
        seriesInfo.push(serieInfo);
        if (i === related.results.length - 1) {
          setSeriesInfo(seriesInfo);
        }
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    handleType();
  }, []);

  // If Movie
  if (type === "movie") {
    return (
      <div>
        <h2
          className="related-title"
          style={loading ? { display: "none" } : { display: "block" }}
        >
          You may also like
        </h2>
        <div
          className="related-movies"
          style={loading ? { display: "none" } : { width: "100%" }}
        >
          {/* Iterate over related movies */}
          {getMovieInfo.map((relatedMovie) => {
            // Get first part of date
            const splitDate = relatedMovie.release_date.split("-");

            if (
              relatedMovie.poster_path &&
              relatedMovie.title &&
              relatedMovie.vote_average &&
              relatedMovie.release_date &&
              relatedMovie.overview
            ) {
              return (
                <Link
                  href={{
                    pathname: "/movie",
                    query: { id: relatedMovie.id },
                  }}
                  key={relatedMovie.id}
                  passHref={true}
                >
                  <a>
                    <MovieCard
                      title={relatedMovie.original_title}
                      year={splitDate[0]}
                      vote={relatedMovie.vote_average.toFixed(1)}
                      tag="Movie"
                      img={
                        "https://image.tmdb.org/t/p/original/" +
                        relatedMovie.poster_path
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
  }

  // If Series
  if (type === "tv") {
    return (
      <div>
        <h2
          className="related-title"
          style={
            loading || related.length === 0
              ? { display: "none" }
              : { display: "block" }
          }
        >
          You may also like
        </h2>
        <div
          className={
            related.length < 10
              ? "related-movies .start"
              : "related-movies .center"
          }
          style={loading ? { display: "none" } : { width: "100%" }}
        >
          {/* Iterate over related movies */}
          {getSeriesInfo.map((relatedMovie) => {
            if (
              relatedMovie.poster_path &&
              relatedMovie.original_name &&
              relatedMovie.origin_country &&
              relatedMovie.overview &&
              relatedMovie.vote_average
            ) {
              // Get first part of date
              const splitDate = relatedMovie?.last_air_date?.split("-");
              const splitDateFirst = relatedMovie?.first_air_date?.split("-");

              return (
                <Link
                  href={{
                    pathname: "/series",
                    query: { id: relatedMovie.id, season: "1", episode: "1" },
                  }}
                  key={relatedMovie.id}
                  passHref={true}
                >
                  <a>
                    <MovieCard
                      title={relatedMovie.name}
                      year={
                        splitDate !== undefined
                          ? splitDate[0]
                          : splitDateFirst[0]
                      }
                      vote={relatedMovie.vote_average.toFixed(1)}
                      tag="TV"
                      seasons={relatedMovie.last_episode_to_air?.season_number}
                      episodes={
                        relatedMovie.last_episode_to_air?.episode_number
                      }
                      img={
                        "https://image.tmdb.org/t/p/original/" +
                        relatedMovie.poster_path
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
  }
}
