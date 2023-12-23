"use client";
import { Episode, Season } from "@/services/apiTypes";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

interface SeriesSeasonsProps {
  seasonsData: Season[];
  seasonData: Episode[];
  currentSeason: string;
  currentEpisode: string;
  seriesId: string;
}

const SeriesSeasons: React.FC<SeriesSeasonsProps> = ({
  seasonsData,
  seasonData,
  currentSeason,
  currentEpisode,
  seriesId,
}) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Stack
      sx={{
        bgcolor: theme.palette.secondary.light,
        borderRadius: "10px",
        p: "2rem",
        mb: "1rem",
      }}
      direction="row"
      gap={4}
      flexWrap={{ xs: "wrap", md: "nowrap" }}
    >
      <Box width="100%" maxWidth="15rem">
        <Typography component="p" variant="h3" mb={2}>
          Seasons
        </Typography>

        <Stack direction="column" gap={1}>
          {seasonsData.map((season) => {
            if (!season.name.toLowerCase().includes("season")) return null;
            return (
              <Stack
                key={season.id}
                direction="row"
                gap={2}
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  minWidth: "10rem",
                  bgcolor:
                    +currentSeason === season.season_number
                      ? theme.palette.customColors.gold
                      : theme.palette.grey[800],
                  color:
                    +currentSeason === season.season_number
                      ? theme.palette.common.black
                      : theme.palette.common.white,
                  p: 1,
                  borderRadius: "5px",
                  cursor: "pointer",
                  my: 0.2,
                }}
                onClick={() => {
                  router.push(
                    `series?id=${seriesId}?season=${season.season_number}?episode=1`
                  );
                  setTimeout(() => {
                    location.reload();
                  }, 100);
                }}
              >
                <Typography component="p" variant="body1">
                  Season {season.season_number}
                </Typography>
                <Typography component="p" variant="body1">
                  {season?.air_date?.split("-")[0]}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>

      <Box>
        <Typography component="p" variant="h3" mb={1.8}>
          Episodes
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1}>
          {seasonData.map((episode) => {
            return (
              <Stack
                key={episode.id}
                direction="row"
                gap={2}
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  bgcolor:
                    +currentEpisode === episode.episode_number
                      ? theme.palette.customColors.gold
                      : theme.palette.grey[800],
                  color:
                    +currentEpisode === episode.episode_number
                      ? theme.palette.common.black
                      : new Date(episode.air_date) > new Date()
                      ? theme.palette.grey[500]
                      : theme.palette.common.white,
                  p: 1,
                  borderRadius: "5px",
                  cursor:
                    new Date(episode.air_date) > new Date()
                      ? "default"
                      : "pointer",
                  my: 0.5,
                }}
                onClick={() => {
                  if (new Date(episode.air_date) > new Date()) return;
                  router.push(
                    `series?id=${seriesId}?season=${currentSeason}?episode=${episode.episode_number}`
                  );
                  setTimeout(() => {
                    location.reload();
                  }, 100);
                }}
              >
                <Typography component="p" variant="body1">
                  Episode {episode.episode_number}: {episode.name}{" "}
                  {new Date(episode.air_date) > new Date()
                    ? `(${episode.air_date})`
                    : null}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
};

export default SeriesSeasons;
