"use client";
import {
  Box,
  Container,
  Link,
  List,
  ListItemButton,
  ListSubheader,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { pages } from "./Navigation";

const Footer = () => {
  const theme = useTheme();
  return (
    <Container>
      <Stack
        bgcolor={theme.palette.primary.main}
        direction={{ xs: "column", s: "column", md: "row", lg: "row" }}
        justifyContent="space-between"
        alignItems={{
          xs: "center",
          s: "center",
          md: "flex-start",
          lg: "flex-start",
        }}
        gap={{ xs: 5, s: 5, md: 0, lg: 0 }}
        px={5}
        py={3}
      >
        <Box sx={{ width: "100%", maxWidth: "30rem" }}>
          <Typography
            component="h4"
            variant="h3"
            mb={1}
            borderBottom={"1px solid " + theme.palette.common.white}
            pb={1}
          >
            ObelusStream
          </Typography>

          <Typography component="p" variant="body1">
            ObelusStream was created with the idea of no more jumping ads, no
            more super slow loading and no more bad video quaity! We support
            more than 600k movies and series on demand with HD quality and
            subtitles to enjoy your watching time. Just grab your popcorns and
            your favourite bevarage and enjoy!
          </Typography>
        </Box>

        <List
          sx={{ width: "100%", maxWidth: 360 }}
          component="nav"
          subheader={
            <ListSubheader
              component="div"
              sx={{ bgcolor: "transparent", color: theme.palette.common.white }}
            >
              <Typography
                component="h4"
                variant="h3"
                mb={1}
                pb={1}
                borderBottom={"1px solid " + theme.palette.common.white}
              >
                Menu
              </Typography>
            </ListSubheader>
          }
        >
          {pages.map((page) => (
            <Link key={page.name} href={`${page.link.toLowerCase()}`}>
              <ListItemButton disableRipple>
                <Typography component="p" variant="body1">
                  {page.name}
                </Typography>
              </ListItemButton>
            </Link>
          ))}
        </List>

        <Image
          src="https://ik.imagekit.io/obelussoft/dmc-logo_Mm7dnURkl.png?updatedAt=1703509714002"
          width={300}
          height={100}
          alt="DMCA Logo"
          priority
        />
      </Stack>

      <Stack
        bgcolor={theme.palette.common.black}
        direction="row"
        justifyContent="center"
        alignItems="center"
        py={1}
      >
        <Typography component="p" variant="body1">
          ObelusStream © 2024
        </Typography>
      </Stack>
    </Container>
  );
};

export default Footer;
