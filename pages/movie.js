import { getMovie } from "../utils/movie";
import { getRelated } from "../utils/related";
import { getMovieTrailer } from "../utils/trailer";
import { fetchCast } from "../utils/cast";
import IFrame from "../components/IFrame";
import InfoBlock from "../components/InfoBlock";
import CastMembers from "../components/CastMembers";
import Related from "../components/Related";

export default function Movie(movie) {
  return (
    <div
      className="single-movie"
      style={
        movie.movie[0] === "empty" ? { display: "none" } : { display: "block" }
      }
    >
      {/* Show path */}
      <p className="movie-path">Home / Movies / {movie.movie.title}</p>

      {/* Series Video */}
      <IFrame id={movie.movie.id} />

      {/* Series Information */}
      <InfoBlock
        id={movie.movie.id}
        img={movie.movie.poster_path}
        title={movie.movie.original_title}
        rate={movie.movie.vote_average.toFixed(1)}
        description={movie.movie.overview}
        date={movie.movie.release_date}
        genre={movie.movie.genres}
        runtime={movie.movie.runtime}
        country={movie.movie.production_countries}
        production={movie.movie.production_companies}
        trailer={movie.trailer}
      />

      {/* Cast Members */}
      <CastMembers cast={movie.cast} />

      {/* Related Movies */}
      <Related type="movie" related={movie.related} />
    </div>
  );
}

// Get Static Props
export async function getServerSideProps(context) {
  // Fetch Movie
  let movie = await getMovie(context.query.id);

  // Fetch Related
  let related = await getRelated(context.query.id);

  // Fetch Trailer
  let trailer = await getMovieTrailer(context.query.id);

  // Fetch Cast
  let cast = await fetchCast(context.query.id);

  return {
    props: {
      movie: movie,
      related: related,
      trailer: trailer,
      cast: cast.cast,
    },
  };
}
