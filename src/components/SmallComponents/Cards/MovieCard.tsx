"use client";
import { Movie } from "@/services/apiTypes";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Skeleton,
  Link,
  Box,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import HTMLTooltip from "@/components/MUIComponents/HTMLTooltip";

interface MovieCardProps {
  movieData: Movie;
  loading: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movieData, loading }) => {
  const theme = useTheme();

  if (loading) {
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

  if (!movieData.poster_path) return;

  return (
    <Link href={`/movie?id=${movieData.id}`} style={{ textDecoration: "none" }}>
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
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.poster_path})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "5px",
            marginBottom: 1,
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            p={0.2}
          >
            <HTMLTooltip>
              <Typography
                component="p"
                variant="h4"
                color={theme.palette.customColors.gold}
                mb={1}
              >
                {movieData.title}
              </Typography>
              <Typography component="p" variant="body1">
                {movieData.overview}
              </Typography>
            </HTMLTooltip>
          </Stack>
        </Box>

        <CardContent sx={{ m: 0, p: 0 }}>
          <Typography component="h5" variant="h5">
            {movieData.title.length > 18
              ? `${movieData.title
                  .slice(0, 16)
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}...`
              : movieData.title
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
            {movieData?.release_date?.slice(0, 4)}
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            gap={0.5}
          >
            <StarIcon sx={{ fontSize: "1.3rem" }} />
            <Typography component="p" variant="body1">
              {movieData?.vote_average?.toFixed(1)}
            </Typography>
          </Stack>
          <Typography component="p" variant="body1">
            Movie
          </Typography>
        </Stack>
      </Card>
    </Link>
  );
};
