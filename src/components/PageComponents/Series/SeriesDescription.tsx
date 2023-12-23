"use client";
import { Series } from "@/services/apiTypes";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import VideocamIcon from "@mui/icons-material/Videocam";

interface SeriesDescriptionProps {
  seriesData: Series;
  seriesTrailer: string;
}

const SeriesDescription: React.FC<SeriesDescriptionProps> = ({
  seriesData,
  seriesTrailer,
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
        src={`https://image.tmdb.org/t/p/original${seriesData.poster_path}`}
        width={300}
        height={450}
        alt="Movie Poster"
        style={{ borderRadius: "10px" }}
        priority
      />
      <Stack gap={1}>
        <Typography component="h3" variant="h2">
          {seriesData.name}
        </Typography>

        <Typography
          component="p"
          variant="body1"
          color={theme.palette.customColors.gold}
        >
          IMDb: {seriesData.vote_average.toFixed(1)}
        </Typography>

        {!seriesTrailer.includes("undefined") && (
          <Button
            sx={{ width: "8rem" }}
            variant="contained"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open(seriesTrailer, "_blank");
              }
            }}
          >
            <VideocamIcon />
            Trailer
          </Button>
        )}

        <Typography component="p" variant="body1" mt={4}>
          {seriesData.overview}
        </Typography>

        <Typography component="p" variant="body1" mt={4}>
          <span style={{ color: theme.palette.customColors.darkRed }}>
            Release date:
          </span>{" "}
          {seriesData.first_air_date}
        </Typography>

        <Typography component="p" variant="body1">
          <span style={{ color: theme.palette.customColors.darkRed }}>
            Genre:
          </span>{" "}
          {seriesData.genres.map((genre) => genre.name).join(", ")}
        </Typography>

        <Typography component="p" variant="body1">
          <span style={{ color: theme.palette.customColors.darkRed }}>
            Number of seasons:
          </span>{" "}
          {seriesData.number_of_seasons}
        </Typography>

        <Typography component="p" variant="body1">
          <span style={{ color: theme.palette.customColors.darkRed }}>
            Country:
          </span>{" "}
          {seriesData.production_countries
            .map((country) => country.name)
            .join(", ")}
        </Typography>

        <Typography component="p" variant="body1">
          <span style={{ color: theme.palette.customColors.darkRed }}>
            Production:
          </span>{" "}
          {seriesData.production_companies
            .map((company) => company.name)
            .join(", ")}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SeriesDescription;
