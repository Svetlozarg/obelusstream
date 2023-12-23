import { Member } from "@/services/apiTypes";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import MemberCard from "../Cards/MemberCard";

interface CastListProps {
  castData: Member[];
}

const CastList: React.FC<CastListProps> = ({ castData }) => {
  const theme = useTheme();

  return (
    <Box p={5}>
      <Typography
        component="h2"
        variant="h2"
        width="20rem"
        borderBottom={"2px solid " + theme.palette.common.white}
        pb={1}
      >
        Cast Members
      </Typography>

      <Stack direction="row" gap={1} mt={2} sx={{ overflow: "auto" }}>
        {castData.length === 0 && (
          <Typography component="h3" variant="h3">
            No cast members found
          </Typography>
        )}
        {castData.length > 0 &&
          castData.map((member) => (
            <MemberCard key={member.id} memberData={member} />
          ))}
      </Stack>
    </Box>
  );
};

export default CastList;
