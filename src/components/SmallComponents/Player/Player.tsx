"use client";
import { Box } from "@mui/material";

const styles = {
  playerBox: {
    width: "100%",
    height: "80vh",
    bgcolor: "black",
    borderRadius: "10px",
    my: 4,
  },
  player: {
    width: "100%",
    height: "80vh",
    borderRadius: "10px",
    border: "none",
  },
};

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
    <Box sx={styles.playerBox}>
      {movieId && (
        <iframe
          src={`https://vidsrc.xyz/embed/movie/${movieId}`}
          style={styles.player}
          referrerPolicy="origin"
        ></iframe>
      )}

      {series && (
        <iframe
          src={`https://vidsrc.xyz/embed/tv/${series?.id}/${series?.season}-${series?.episode}`}
          style={styles.player}
          referrerPolicy="origin"
        ></iframe>
      )}
    </Box>
  );
};

export default Player;
