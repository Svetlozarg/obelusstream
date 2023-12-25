"use client";
import { useEffect, useState } from "react";
import { Container, Stack, Typography, useTheme } from "@mui/material";
import { SmallMovieList } from "@/components/SmallComponents/MovieList/SmallMovieList";
import { callApi } from "@/services/callApi";
import {
  getPopularMovieList,
  getTrendingMovies,
} from "@/services/MovieLists/apiGetMovieLists";
import {
  Movie,
  MovieList,
  SeriesFromList,
  SeriesList,
} from "@/services/apiTypes";
import {
  getPopularTvShows,
  getTrendingTvShows,
} from "@/services/SeriesLists/apiGetSeriesLists";
import Search from "@/components/PageComponents/Search/Search";

export default function Home() {
  const theme = useTheme();
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<SeriesFromList[]>([]);
  const [popularMovieList, setPopularMovieList] = useState<Movie[]>([]);
  const [popularSeriesList, setPopularSeriesList] = useState<SeriesFromList[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const moviesData = await callApi<MovieList>({
          query: getTrendingMovies,
        });
        setTrendingMovies(moviesData.results);

        const seriesData = await callApi<SeriesList>({
          query: getTrendingTvShows,
        });

        setTrendingSeries(seriesData.results);

        const popularMoviesData = await callApi<MovieList>({
          query: getPopularMovieList,
        });
        setPopularMovieList(popularMoviesData.results);

        const popularSeriesData = await callApi<SeriesList>({
          query: getPopularTvShows,
        });
        setPopularSeriesList(popularSeriesData.results);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Container>
      <Stack
        height="20rem"
        bgcolor={theme.palette.secondary.main}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Typography component="h1" variant="h1" mb={3}>
          ObelusStream
        </Typography>
        <Typography component="h2" variant="h3" mb={6}>
          Enjoy watching your favourite movies and tv shows
        </Typography>

        <Search />
      </Stack>

      <SmallMovieList
        title="Trending Movies"
        moviesData={trendingMovies}
        loading={loading}
      />

      <SmallMovieList
        title="Trending Series"
        seriesData={trendingSeries}
        loading={loading}
      />

      <SmallMovieList
        title="Popular Movies"
        moviesData={popularMovieList}
        loading={loading}
      />

      <SmallMovieList
        title="Popular Series"
        seriesData={popularSeriesList}
        loading={loading}
      />
    </Container>
  );
}
