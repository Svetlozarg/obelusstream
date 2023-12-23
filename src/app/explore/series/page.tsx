"use client";
import { memo, useEffect, useState } from "react";
import {
  BottomNavigation as TopNavigation,
  BottomNavigationAction as TopNavigationAction,
  Box,
  Container,
  useTheme,
  Typography,
} from "@mui/material";
import { GenresList, SeriesFromList, SeriesList } from "@/services/apiTypes";
import { callApi } from "@/services/callApi";
import {
  getAllSeriesGenres,
  getDiscoverSeries,
  getSeriesByGenre,
} from "@/services/Series/apiGetSeries";
import { useRouter } from "next/navigation";
import { SmallMovieList } from "@/components/SmallComponents/MovieList/SmallMovieList";

const MemoizedSmallMovieList = memo(SmallMovieList);

const SeriesPage = () => {
  const theme = useTheme();
  const [genreId, setGenreId] = useState<string>();
  const [genresData, setGenresData] = useState<GenresList>();
  const [seriesData, setSeriesData] = useState<SeriesFromList[]>([]);
  const [page, setPage] = useState<number>(1);
  const [value, setValue] = useState(0);
  const router = useRouter();

  const handleGetMoviesNextPage = async (
    genreId: string | null,
    page: number
  ) => {
    try {
      let moviesData: SeriesList;
      if (genreId) {
        moviesData = await callApi<SeriesList>({
          query: getSeriesByGenre(+genreId, page),
        });
      } else {
        moviesData = await callApi<SeriesList>({
          query: getDiscoverSeries(page),
        });
      }
      setSeriesData((prevMoviesData: SeriesFromList[]) => {
        const newMovies = moviesData.results.filter((movie) => {
          return !prevMoviesData.some((prevMovie) => prevMovie.id === movie.id);
        });
        return [...prevMoviesData, ...newMovies];
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (genreId) {
          handleGetMoviesNextPage(genreId, page + 1);
        } else {
          handleGetMoviesNextPage(null, page + 1);
        }
        setPage((prevPage) => prevPage + 1);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    if (id) {
      setGenreId(id);
    }

    (async () => {
      try {
        const genresData = await callApi<GenresList>({
          query: getAllSeriesGenres(),
        });
        setGenresData(genresData);

        const pagesToFetch = [1, 2, 3];
        await Promise.all(
          pagesToFetch.map((page) => handleGetMoviesNextPage(id, page))
        );
        setPage(3);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Container>
      {genresData && (
        <Box
          sx={{
            width: "100%",
            overflow: "auto",
            bgcolor: theme.palette.primary.main,
            borderTop: "1px solid #fff",
          }}
        >
          <TopNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            sx={{
              bgcolor: theme.palette.primary.main,

              justifyContent: "flex-start",
            }}
          >
            <TopNavigationAction
              value={0}
              label={
                <Typography
                  sx={{ color: theme.palette.common.white }}
                  component="p"
                  variant="body1"
                >
                  All
                </Typography>
              }
              sx={{ bgcolor: !genreId ? theme.palette.grey[800] : "" }}
              onClick={() => {
                router.push("/explore/series");
                setSeriesData([]);
                setTimeout(() => {
                  location.reload();
                }, 300);
              }}
            />
            {genresData?.genres.map((genre) => {
              return (
                <TopNavigationAction
                  key={genre.id}
                  value={genre.id}
                  label={
                    <Typography
                      sx={{
                        color: theme.palette.common.white,
                      }}
                      component="p"
                      variant="body1"
                    >
                      {genre.name}
                    </Typography>
                  }
                  sx={{
                    bgcolor:
                      genreId && genre.id === +genreId
                        ? theme.palette.grey[800]
                        : "",
                    minWidth: 120,
                  }}
                  onClick={() => {
                    router.push(`/explore/series?id=${genre.id}`);
                    setSeriesData([]);
                    setTimeout(() => {
                      location.reload();
                    }, 300);
                  }}
                />
              );
            })}
          </TopNavigation>
        </Box>
      )}

      <MemoizedSmallMovieList
        title={
          genreId
            ? `${
                genresData?.genres.find((genre) => genre.id === +genreId)?.name
              } Series` ?? ""
            : "All Series Genres"
        }
        seriesData={seriesData}
      />
    </Container>
  );
};

export default SeriesPage;
