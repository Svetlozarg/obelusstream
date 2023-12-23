"use client";
import { useEffect, useState } from "react";
import { Movie } from "@/services/apiTypes";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Skeleton,
  Link,
} from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";

interface MovieCardProps {
  movieData: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movieData }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
        {isLoading ? (
          <Skeleton variant="rectangular" width={170} height={220} />
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            width={170}
            height={220}
            style={{
              borderRadius: "5px",
              marginBottom: 1,
            }}
            alt="Movie Poster"
            priority
          />
        )}
        <CardContent sx={{ m: 0, p: 0 }}>
          {isLoading ? (
            <Skeleton variant="text" width={100} height={24} />
          ) : (
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
          )}
        </CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          m={0}
          p={0}
          mt={1}
        >
          {isLoading ? (
            <>
              <Skeleton variant="text" width={50} height={16} />
              <Skeleton variant="text" width={30} height={16} />
              <Skeleton variant="text" width={40} height={16} />
            </>
          ) : (
            <>
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
            </>
          )}
        </Stack>
      </Card>
    </Link>
  );
};
