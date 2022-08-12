import Link from "next/link";
import { getSearch } from "../utils/search";

import MovieCard from "../components/MovieCard";

export default function Search({ search, query }) {
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
          {search.results.map((result) => {
            // If Movie
            if (
              result.media_type === "movie" &&
              result.poster_path &&
              result.title &&
              result.vote_average &&
              result.release_date &&
              result.overview &&
              result.genre_ids.length !== 0
            ) {
              const splitDate = result.release_date.split("-");
              return (
                <Link
                  href={{
                    pathname: "/movie",
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
                      tag={
                        result.media_type.charAt(0).toUpperCase() +
                        result.media_type.slice(1)
                      }
                      img={
                        "https://image.tmdb.org/t/p/original/" +
                        result.poster_path
                      }
                    />
                  </a>
                </Link>
              );
              // If tv
            } else if (
              result.media_type === "tv" &&
              result.poster_path &&
              result.genre_ids.length !== 0 &&
              result.original_name &&
              result.origin_country &&
              result.overview &&
              result.vote_average &&
              result.origin_country.length !== 0
            ) {
              return (
                <Link
                  href={{
                    pathname: "/series",
                    query: { id: result.id, season: "1", episode: "1" },
                  }}
                  key={result.id}
                  passHref={true}
                >
                  <a>
                    <MovieCard
                      id={result.id}
                      title={result.original_name}
                      year={result.origin_country[0]}
                      vote={result.vote_average.toFixed(1)}
                      tag={result.media_type.toUpperCase()}
                      img={
                        "https://image.tmdb.org/t/p/original/" +
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
    if (typeof window !== "undefined") {
      window.location.href = "/";
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
