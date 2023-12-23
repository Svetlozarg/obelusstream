import { Member } from "@/services/apiTypes";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import VideocamIcon from "@mui/icons-material/Videocam";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

interface MemberCardProps {
  memberData: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ memberData }) => {
  const theme = useTheme();

  return (
    <Box>
      {memberData.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/original${memberData.profile_path}`}
          width={170}
          height={220}
          style={{
            borderRadius: "5px",
            marginBottom: 1,
          }}
          alt="Movie Poster"
          priority
        />
      ) : (
        <Stack
          sx={{
            width: 170,
            height: 220,
            bgcolor: theme.palette.grey[800],
            borderRadius: "5px",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <ImageNotSupportedIcon
            sx={{ fontSize: "8rem", color: theme.palette.common.white }}
          />
        </Stack>
      )}

      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={0.1}
      >
        <PersonIcon /> {memberData.original_name}
        <Typography component="p" variant="body2"></Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={0.1}
      >
        <VideocamIcon /> {memberData.character}
        <Typography component="p" variant="body2"></Typography>
      </Stack>
    </Box>
  );
};

export default MemberCard;
