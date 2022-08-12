import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import MovieCard from "../components/MovieCard";

import { getTrendingMovies, getTrendingSeries } from "../utils/trending";

export default function Home({ movies, series }) {
  // Ref for search
  const query = useRef("");

  // On enter search
  const onKeyPress = (e) => {
    if (e.which == 13) {
      Router.push("/search/?query=" + query.current.value);
    }
  };

  return (
    <div>
      <Head>
        <title>ObelusStream</title>
        <meta
          name="description"
          content="A movie and serie streaming website"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Search */}
      <div className="main-search">
        <div className="main-search-cont">
          <h2>Find Movies or Series to watch</h2>
          <div className="main-search-cont-div">
            <div id="searchUsers" className="top-search">
              <div className="top-search__input-container">
                {/* Search */}
                <input
                  className="top-search__input"
                  type="text"
                  spellCheck="false"
                  placeholder="Search..."
                  ref={query}
                  onKeyPress={onKeyPress}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ color: "#000", width: "25px", marginRight: "16px" }}
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Movies */}
      <div className="trending">
        <h2>Trending Movies</h2>
        <div className="trending-wrapper">
          {/* Iterate over trending movies */}
          {movies.map((movie) => {
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
                    tag={
                      movie.media_type.charAt(0).toUpperCase() +
                      movie.media_type.slice(1)
                    }
                    img={
                      "https://image.tmdb.org/t/p/original/" + movie.poster_path
                    }
                  />
                </a>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Trending Series */}
      <div className="trending">
        <h2>Trending Series</h2>
        <div className="trending-wrapper">
          {/* Iterate over trending series */}
          {series.map((serie) => {
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
                    tag={serie.media_type.toUpperCase()}
                    img={
                      "https://image.tmdb.org/t/p/original/" + serie.poster_path
                    }
                  />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Get Static Props
export async function getStaticProps() {
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
