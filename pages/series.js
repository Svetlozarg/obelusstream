import { UserAuth } from "../context/AuthContext";
import { getSeries } from "../utils/series";
import IFrame from "../components/IFrame";
import InfoBlock from "../components/InfoBlock";
import { getSeriesTrailer } from "../utils/trailer";
import CastMembers from "../components/CastMembers";
import { fetchCastSeries } from "../utils/cast";
import { getRelatedSeries } from "../utils/related";
import Related from "../components/Related";
import SeriesContent from "../components/SeriesContent";
import { getEpisodes } from "../utils/series";

export default function Series({
  series,
  seasonNumber,
  episodeNumber,
  trailer,
  cast,
  related,
  episodes,
}) {
  // Get user data
  const { user } = UserAuth();

  return (
    <div className="single-movie">
      {/* Series Path */}
      <p className="series-path">
        Home / Series / {series?.original_name} - Season {seasonNumber} Episode{" "}
        {episodeNumber}
      </p>

      {/* Series Video */}
      <IFrame id={series.id} season={seasonNumber} episode={episodeNumber} />

      {/* Series Seasons and Episodes */}
      <SeriesContent
        series={series}
        season={seasonNumber}
        episodeNumber={episodeNumber}
        episodes={episodes}
      />

      {/* Series Information */}
      <InfoBlock
        id={series.id}
        img={series.poster_path}
        title={series.original_name}
        rate={series.vote_average.toFixed(1)}
        description={series.overview}
        date={series.first_air_date}
        genre={series.genres}
        seasons={series.number_of_seasons}
        country={series.production_countries}
        production={series.production_companies}
        trailer={trailer}
      />

      {/* Cast Members */}
      <CastMembers cast={cast.cast} />

      {/* Related Movies */}
      <Related type="tv" related={related} />
    </div>
  );
}

// Get Static Props
export async function getServerSideProps(context) {
  // Fetch Movie
  let series = await getSeries(context.query.id);
  // Get Chosen Season
  let seasonNumber = context.query.season;
  // Get Chosen Episode
  let episodeNumber = context.query.episode;
  // Fetch Trailer
  let trailer = await getSeriesTrailer(context.query.id);
  // Fetch Cast
  let cast = await fetchCastSeries(context.query.id);
  // Fetch Related
  let related = await getRelatedSeries(context.query.id);
  // Fetch Episodes
  let episodes = await getEpisodes(context.query.id, context.query.season);

  return {
    props: {
      series: series,
      seasonNumber: seasonNumber,
      episodeNumber: episodeNumber,
      trailer: trailer,
      cast: cast,
      related: related,
      episodes: episodes,
    },
  };
}
