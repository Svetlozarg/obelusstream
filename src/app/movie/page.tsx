"use client";
import Breadcrumbs from "@/components/MUIComponents/Breadcrumbs";
import MovieDescription from "@/components/PageComponents/Movie/MovieDescription";
import CastList from "@/components/SmallComponents/CastList/CastList";
import { SmallMovieList } from "@/components/SmallComponents/MovieList/SmallMovieList";
import Player from "@/components/SmallComponents/Player/Player";
import {
  getMovieById,
  getSimilarMovies,
  getMovieCredits,
  getMovieVideos,
  getMovieKeywords,
} from "@/services/Movies/apiGetMovies";
import {
  CrewList,
  KeyWord,
  KeyWordsResult,
  Member,
  Movie,
  MovieList,
  VideoList,
} from "@/services/apiTypes";
import { callApi } from "@/services/callApi";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MoviePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [movieId, setMovieId] = useState<string>();
  const [movieData, setMovieData] = useState<Movie>();
  const [movieRecommendations, setMovieRecommendations] = useState<Movie[]>();
  const [castData, setCastData] = useState<Member[]>([]);
  const [movieTrailer, setMovieTrailer] = useState<string>();
  const [movieKeywords, setMovieKeywords] = useState<KeyWord[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    if (id) {
      setMovieId(id);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (movieId) {
          const movieData = await callApi<Movie>({
            query: getMovieById(+movieId),
          });
          setMovieData(movieData);

          const movieRecommendations = await callApi<MovieList>({
            query: getSimilarMovies(+movieId),
          });

          setMovieRecommendations(movieRecommendations.results);

          const castData = await callApi<CrewList>({
            query: getMovieCredits(+movieId),
          });

          setCastData(castData.cast);

          const movieVideos = await callApi<VideoList>({
            query: getMovieVideos(+movieId),
          });

          const movieTrailer = movieVideos.results.find((video) =>
            video.name.toLowerCase().includes("official trailer")
          )?.key;
          setMovieTrailer(movieTrailer);

          const movieKeywords = await callApi<KeyWordsResult>({
            query: getMovieKeywords(+movieId),
          });
          console.log(movieKeywords);

          setMovieKeywords(movieKeywords.keywords);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        router.push("/");
      }
    })();
  }, [movieId, router]);

  if (!movieData) return;

  return (
    <Container>
      <Box px={{ sm: 0.5, md: 1, lg: 10 }} pt={4}>
        <Breadcrumbs link={movieData.original_title} />

        <Player movieId={movieData.id} />

        <MovieDescription
          movieData={movieData}
          movieTrailer={"https://www.youtube.com/embed/" + movieTrailer}
          movieKeywords={movieKeywords}
        />
      </Box>

      <CastList castData={castData} />

      <SmallMovieList
        title="Recommendations"
        moviesData={movieRecommendations}
        loading={loading}
      />
    </Container>
  );
};

export default MoviePage;
