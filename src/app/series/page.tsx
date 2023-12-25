"use client";
import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import {
  getSeriesById,
  getSeriesCredits,
  getSeriesRecommendations,
  getSeriesSeason,
  getSeriesVideos,
} from "@/services/Series/apiGetSeries";
import { callApi } from "@/services/callApi";
import {
  CrewList,
  Episode,
  Member,
  Season,
  Series,
  SeriesFromList,
  SeriesList,
  VideoList,
} from "@/services/apiTypes";
import Breadcrumbs from "@/components/MUIComponents/Breadcrumbs";
import { useRouter } from "next/navigation";
import CastList from "@/components/SmallComponents/CastList/CastList";
import { SmallMovieList } from "@/components/SmallComponents/MovieList/SmallMovieList";
import SeriesDescription from "@/components/PageComponents/Series/SeriesDescription";
import Player from "@/components/SmallComponents/Player/Player";
import SeriesSeasons from "@/components/PageComponents/Series/SeriesSeasons";

interface SeriesParamsProps {
  id: string;
  season: string;
  episode: string;
}

const SeriesPage = () => {
  const [seriesParams, setSeriesParams] = useState<SeriesParamsProps>();
  const [seriesData, setSeriesData] = useState<Series>();
  const [seriesRecommendations, setSeriesRecommendations] = useState<
    SeriesFromList[]
  >([]);
  const [movieTrailer, setMovieTrailer] = useState<string>();
  const [castData, setCastData] = useState<Member[]>([]);
  const [seriesSeason, setseriesSeason] = useState<Episode[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id")?.split("?")[0];
    const season = searchParams.get("id")?.split("?")[1].split("=")[1];
    const episode = searchParams.get("id")?.split("?")[2].split("=")[1];

    if (id && season && episode) {
      setSeriesParams({ id, season, episode });
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (seriesParams) {
          const seriesData = await callApi<Series>({
            query: getSeriesById(+seriesParams.id),
          });
          setSeriesData(seriesData);

          const seriesRecommendations = await callApi<SeriesList>({
            query: getSeriesRecommendations(+seriesParams.id),
          });
          setSeriesRecommendations(seriesRecommendations.results);

          const castData = await callApi<CrewList>({
            query: getSeriesCredits(+seriesParams.id),
          });
          setCastData(castData.cast);

          const seriesVideos = await callApi<VideoList>({
            query: getSeriesVideos(+seriesParams.id),
          });

          const movieTrailer = seriesVideos.results.find((video) =>
            video.name.toLowerCase().includes("official trailer")
          )?.key;
          setMovieTrailer(movieTrailer);

          const seriesSeasonData = await callApi<Season>({
            query: getSeriesSeason(+seriesParams.id, +seriesParams.season),
          });
          setseriesSeason(seriesSeasonData.episodes);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        router.push("/");
      }
    })();
  }, [seriesParams, router]);

  if (!seriesData) return;

  return (
    <Container>
      <Box px={{ sm: 0.5, md: 1, lg: 10 }} pt={4}>
        <Breadcrumbs
          link={
            seriesParams?.season && seriesParams?.episode
              ? `${seriesData.name} Season ${seriesParams.season} Episode ${seriesParams.episode}`
              : seriesData.name
          }
          loading={loading}
          series
        />

        {seriesParams && seriesData.last_episode_to_air && (
          <Player series={seriesParams} />
        )}

        {seriesParams && seriesData.last_episode_to_air && (
          <SeriesSeasons
            seasonsData={seriesData.seasons}
            seasonData={seriesSeason}
            currentSeason={seriesParams?.season}
            currentEpisode={seriesParams?.episode}
            seriesId={seriesParams?.id}
          />
        )}

        <SeriesDescription
          seriesData={seriesData}
          seriesTrailer={"https://www.youtube.com/embed/" + movieTrailer}
        />
      </Box>

      <CastList castData={castData} />
      <SmallMovieList
        title="Recommendations"
        seriesData={seriesRecommendations}
        loading={loading}
      />
    </Container>
  );
};

export default SeriesPage;
