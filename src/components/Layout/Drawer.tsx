"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from "./Logo";
import { PageProps } from "./Navigation";
import { useRouter } from "next/navigation";

interface DrawerComp {
  pages: PageProps[];
}

const DrawerComp: React.FC<DrawerComp> = ({ pages }) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const pageRouter = useRouter();
  const [activePage, setActivePage] = useState<string>("");

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    const currentPath = window.location.pathname.toLowerCase();
    if (
      currentPath.includes("/explore/movies") ||
      currentPath.includes("/movie")
    ) {
      setActivePage("/explore/movies");
    } else if (
      currentPath.includes("/explore/series") ||
      currentPath.includes("/series")
    ) {
      setActivePage("/series");
    } else {
      setActivePage("/");
    }
  }, [pageRouter]);

  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            p: 2,
          }}
        >
          <Logo />
        </Box>

        <List
          sx={{
            minWidth: 200,
            height: "100%",
            bgcolor: theme.palette.background.default,
          }}
        >
          {pages.map((page, index) => (
            <Link href={`${page.link.toLowerCase()}`} key={index}>
              <ListItemButton
                sx={{
                  bgcolor:
                    activePage === page.link ? theme.palette.primary.main : "",
                }}
              >
                <ListItemText
                  sx={{
                    color: theme.palette.common.white,
                    textAlign: "center",
                  }}
                >
                  {page.name}
                </ListItemText>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon sx={{ color: theme.palette.common.white }} />
      </IconButton>
    </>
  );
};

export default DrawerComp;
