"use client";
import { Movie, SeriesFromList } from "@/services/apiTypes";
import { Typography, useTheme, Box } from "@mui/material";
import { MovieCard } from "../Cards/MovieCard";
import { SeriesCard } from "../Cards/SeriesCard";

interface SmallMovieListProps {
  title: string;
  moviesData?: Movie[];
  seriesData?: SeriesFromList[];
}

export const SmallMovieList: React.FC<SmallMovieListProps> = ({
  title,
  moviesData,
  seriesData,
}) => {
  const theme = useTheme();

  return (
    <Box p={5}>
      <Typography
        component="h2"
        variant="h2"
        width="20rem"
        borderBottom={"2px solid " + theme.palette.common.white}
        pb={1}
      >
        {title}
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, max-content))",
          gap: 2,
          mt: 2,
        }}
      >
        {moviesData ? (
          <>
            {moviesData.length === 0 && (
              <Typography component="h3" variant="h3">
                No movies found
              </Typography>
            )}
            {moviesData.length > 0 &&
              moviesData.map((movieData) => {
                return <MovieCard key={movieData.id} movieData={movieData} />;
              })}
          </>
        ) : null}

        {seriesData ? (
          <>
            {seriesData.length === 0 && (
              <Typography component="h3" variant="h3">
                No series found
              </Typography>
            )}
            {seriesData.length > 0 &&
              seriesData.map((seriesData) => {
                return (
                  <SeriesCard key={seriesData.id} seriesData={seriesData} />
                );
              })}
          </>
        ) : null}
      </Box>
    </Box>
  );
};
