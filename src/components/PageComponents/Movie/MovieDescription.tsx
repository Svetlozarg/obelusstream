"use client";
import { KeyWord, Movie } from "@/services/apiTypes";
import { Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import TrailerModal from "@/components/SmallComponents/Trailer/TrailerModal";

interface MovieDescriptionProps {
  movieData: Movie;
  movieTrailer: string;
  movieKeywords: KeyWord[];
}

const MovieDescription: React.FC<MovieDescriptionProps> = ({
  movieData,
  movieTrailer,
  movieKeywords,
}) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        bgcolor: theme.palette.secondary.light,
        borderRadius: "10px",
        p: "2rem",
      }}
      direction="row"
      gap={4}
      flexWrap={{ xs: "wrap", md: "nowrap" }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
        width={300}
        height={450}
        alt="Movie Poster"
        style={{ borderRadius: "10px" }}
        priority
      />
      <Stack gap={1}>
        <Typography component="h3" variant="h2">
          {movieData.original_title}
        </Typography>

        <Typography
          component="p"
          variant="body1"
          color={theme.palette.customColors.gold}
        >
          IMDb: {movieData.vote_average.toFixed(1)}
        </Typography>

        {!movieTrailer.includes("undefined") && (
          <TrailerModal trailerURL={movieTrailer} />
        )}

        <Typography component="p" variant="body1" mt={4}>
          {movieData.overview}
        </Typography>

        <Typography component="p" variant="body1" mt={4}>
          <span style={{ color: theme.palette.customColors.darkRed }}>
            Release date:
          </span>{" "}
          {movieData.release_date}
        </Typography>

        <Typography component="p" variant="body1">
          <span style={{ color: theme.palette.customColors.darkRed }}>
            Genre:
          </span>{" "}
          {movieData.genres.map((genre) => genre.name).join(", ")}
        </Typography>

        <Typography component="p" variant="body1">
          <span style={{ color: theme.palette.customColors.darkRed }}>
            Duration:
          </span>{" "}
          {`${Math.floor(movieData.runtime / 60)}h ${
            movieData.runtime % 60
          }min`}
        </Typography>

        <Typography component="p" variant="body1">
          <span style={{ color: theme.palette.customColors.darkRed }}>
            Country:
          </span>{" "}
          {movieData.production_countries
            .map((country) => country.name)
            .join(", ")}
        </Typography>

        <Typography component="p" variant="body1">
          <span style={{ color: theme.palette.customColors.darkRed }}>
            Production:
          </span>{" "}
          {movieData.production_companies
            .map((company) => company.name)
            .join(", ")}
        </Typography>

        <Typography component="p" variant="body1">
          <span style={{ color: theme.palette.customColors.darkRed }}>
            Keywords:
          </span>{" "}
          {movieKeywords
            .map((keyword) => {
              const words = keyword.name.split(" ");
              const capitalizedWords = words.map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1);
              });
              return capitalizedWords.join(" ");
            })
            .join(", ")}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default MovieDescription;
