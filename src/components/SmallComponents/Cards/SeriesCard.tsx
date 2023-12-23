"use client";
import { useEffect, useState } from "react";
import { getSeriesById } from "@/services/Series/apiGetSeries";
import { Series, SeriesFromList } from "@/services/apiTypes";
import { callApi } from "@/services/callApi";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Skeleton,
  Box,
  useTheme,
  Link,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface SeriesCardProps {
  seriesData: SeriesFromList;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({ seriesData }) => {
  const theme = useTheme();
  const [singleSeriesData, setSingleSeriesData] = useState<Series | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const singleSeriesData = await callApi<Series>({
          query: getSeriesById(seriesData.id),
        });
        setSingleSeriesData(singleSeriesData);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [seriesData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Card
        sx={{
          width: 170,
          height: 280,
          bgcolor: "transparent",
          boxShadow: "none",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={170}
          height={220}
          style={{
            borderRadius: "5px",
            marginBottom: 1,
          }}
        />
        <CardContent sx={{ m: 0, p: 0 }}>
          <Skeleton variant="text" width={100} height={30} />
        </CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          m={0}
          p={0}
          mt={1}
        >
          <Skeleton variant="text" width={50} height={20} />
          <Skeleton variant="text" width={30} height={20} />
          <Skeleton variant="text" width={40} height={20} />
        </Stack>
      </Card>
    );
  }

  if (!singleSeriesData) return null;

  return (
    <Link
      href={`/series?id=${seriesData.id}?season=1?episode=1`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          width: 170,
          height: 280,
          bgcolor: "transparent",
          boxShadow: "none",
          cursor: "pointer",
        }}
      >
        <Box
          width={170}
          height={220}
          sx={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${singleSeriesData.poster_path})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "5px",
            marginBottom: 1,
          }}
        >
          <Stack direction="row">
            <Typography
              component="p"
              variant="body2"
              bgcolor="#FDD92A"
              color={theme.palette.common.black}
              py={0.2}
              px={0.4}
              sx={{ borderBottomRightRadius: "5px" }}
            >
              S{singleSeriesData.number_of_seasons} E
              {singleSeriesData.number_of_episodes}
            </Typography>
          </Stack>
        </Box>
        <CardContent sx={{ m: 0, p: 0 }}>
          <Typography component="h5" variant="h5">
            {singleSeriesData.original_name.length > 18
              ? `${singleSeriesData.original_name
                  .slice(0, 16)
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}...`
              : singleSeriesData.original_name
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
          </Typography>
        </CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          m={0}
          p={0}
          mt={1}
        >
          <Typography component="p" variant="body1">
            {singleSeriesData.last_air_date
              ? singleSeriesData.last_air_date.slice(0, 4)
              : singleSeriesData.first_air_date
              ? singleSeriesData.first_air_date.slice(0, 4)
              : new Date().getFullYear()}
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            gap={0.5}
          >
            <StarIcon sx={{ fontSize: "1.3rem" }} />
            <Typography component="p" variant="body1">
              {singleSeriesData.vote_average.toFixed(1)}
            </Typography>
          </Stack>
          <Typography component="p" variant="body1">
            Series
          </Typography>
        </Stack>
      </Card>
    </Link>
  );
};
