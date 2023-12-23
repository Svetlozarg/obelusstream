"use client";
import { Movie } from "@/services/apiTypes";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import VideocamIcon from "@mui/icons-material/Videocam";

interface MovieDescriptionProps {
  movieData: Movie;
  movieTrailer: string;
}

const MovieDescription: React.FC<MovieDescriptionProps> = ({
  movieData,
  movieTrailer,
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
          <Button
            sx={{ width: "8rem" }}
            variant="contained"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open(movieTrailer, "_blank");
              }
            }}
          >
            <VideocamIcon />
            Trailer
          </Button>
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
          {movieData.runtime} minutes
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
      </Stack>
    </Stack>
  );
};

export default MovieDescription;
