import Link from "next/link";

export default function SeriesContent({
  series,
  season,
  episodeNumber,
  episodes,
}) {
  console.log(series);

  return (
    <div className="series-wrapper">
      <div className="series-left">
        <h4>Seasons</h4>
        <div className="series-left-div">
          {series?.seasons?.map((serie, i) => {
            const splitDate = serie.air_date?.split("-");

            const seasonNum = i === 0 ? i + 1 : i;
            if (
              serie.name !== "Specials" &&
              i <= series.last_episode_to_air.season_number
            ) {
              return (
                <Link
                  href={{
                    pathname: "/series",
                    query: {
                      id: series.id,
                      season: seasonNum,
                      episode: "1",
                    },
                  }}
                  key={serie.id}
                  passHref={true}
                >
                  <a>
                    <div className="season">
                      <p className={season == seasonNum ? "active" : ""}>
                        Season {seasonNum}
                        <span>
                          {splitDate !== undefined ? splitDate[0] : ""}
                        </span>
                      </p>
                    </div>
                  </a>
                </Link>
              );
            }
          })}
        </div>
      </div>
      <div className="series-right">
        <h4>Episodes</h4>
        <div className="series-right-div">
          {episodes?.episodes?.map((episode, i) => {
            if (
              i + 1 <= series.last_episode_to_air.episode_number &&
              season == series.last_episode_to_air.season_number
            ) {
              return (
                <Link
                  href={{
                    pathname: "/series",
                    query: {
                      id: series.id,
                      season: season,
                      episode: i + 1,
                    },
                  }}
                  key={episode.id}
                  passHref={true}
                >
                  <a>
                    <p className={episodeNumber == i + 1 ? "active" : ""}>
                      Episode {episode.episode_number}: {episode.name}
                    </p>
                  </a>
                </Link>
              );
            } else if (season != series.last_episode_to_air.season_number) {
              return (
                <Link
                  href={{
                    pathname: "/series",
                    query: {
                      id: series.id,
                      season: season,
                      episode: i + 1,
                    },
                  }}
                  key={episode.id}
                  passHref={true}
                >
                  <a>
                    <p className={episodeNumber == i + 1 ? "active" : ""}>
                      Episode {episode.episode_number}: {episode.name}
                    </p>
                  </a>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
