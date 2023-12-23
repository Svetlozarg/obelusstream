"use client";
import { Box } from "@mui/material";

interface PlayerProps {
  movieId?: number;
  series?: {
    id: string;
    season: string;
    episode: string;
  };
}

const Player: React.FC<PlayerProps> = ({ movieId, series }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "700px",
        bgcolor: "black",
        borderRadius: "10px",
        my: 4,
      }}
    >
      {movieId && (
        <iframe
          src={`https://vidsrc.xyz/embed/movie/${movieId}`}
          style={{
            width: "100%",
            height: "700px",
            borderRadius: "10px",
            border: "none",
          }}
          referrerPolicy="origin"
        ></iframe>
      )}

      {series && (
        <iframe
          src={`https://vidsrc.xyz/embed/tv/${series?.id}/${series?.season}-${series?.episode}`}
          style={{
            width: "100%",
            height: "700px",
            borderRadius: "10px",
            border: "none",
          }}
          referrerPolicy="origin"
        ></iframe>
      )}
    </Box>
  );
};

export default Player;
