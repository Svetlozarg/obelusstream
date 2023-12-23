"use client";
import {
  Button,
  Container,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

export default function NotFound() {
  const theme = useTheme();

  return (
    <Container sx={{ width: "100%", height: "100%" }}>
      <Stack
        sx={{
          width: "100vw",
          height: "50vh",
        }}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          sx={{
            width: "100%",
            maxWidth: "40rem",
            height: "300px",
            bgcolor: theme.palette.primary.main,
            borderRadius: "10px",
            p: "3rem",
            textAlign: "center",
            gap: 4,
          }}
        >
          <Typography component="h2" variant="h2">
            Page not found
          </Typography>

          <Typography component="p" variant="body1">
            Hey movie explorer, the page you are looking for does not exist!
          </Typography>

          <Typography component="p" variant="body1">
            Please check the URL or go back to the homepage.
          </Typography>

          <Link href="/">
            <Button
              variant="contained"
              sx={{ color: "#fff", bgcolor: theme.palette.grey[900] }}
            >
              Go back to homepage
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
