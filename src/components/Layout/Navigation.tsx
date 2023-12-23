"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Drawer from "./Drawer";
import { Logo } from "./Logo";
import { useRouter } from "next/navigation";
import Search from "../PageComponents/Search/Search";

export interface PageProps {
  name: string;
  link: string;
}

const Navigation = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const pageRouter = useRouter();

  const pages: PageProps[] = [
    { name: "Home", link: "/" },
    { name: "Movies", link: "/explore/movies" },
    { name: "Series", link: "/explore/series" },
  ];

  useEffect(() => {
    const currentPath = window.location.pathname.toLowerCase();
    if (
      currentPath.includes("/explore/movies") ||
      currentPath.includes("/movie")
    ) {
      setTabValue(1);
    } else if (
      currentPath.includes("/explore/series") ||
      currentPath.includes("/series")
    ) {
      setTabValue(2);
    } else {
      setTabValue(0);
    }
  }, [pageRouter]);

  const renderTabs = () => (
    <Tabs
      TabIndicatorProps={{
        style: {
          backgroundColor: theme.palette.common.white,
        },
      }}
      textColor="inherit"
      value={tabValue}
      onChange={(e, tabValue) => setTabValue(tabValue)}
    >
      {pages.map((page, index) => (
        <Tab
          key={index}
          label={page.name}
          component="a"
          onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            event.preventDefault();
            pageRouter.push(`${page.link.toLowerCase()}`);
          }}
          disableRipple
        />
      ))}
    </Tabs>
  );

  return (
    <AppBar sx={{ position: "unset" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={5}
        py={1}
      >
        <Box onClick={() => setTabValue(0)}>
          <Logo />
        </Box>
        {isMatch ? (
          <>
            <Drawer pages={pages} />
          </>
        ) : (
          <>
            {renderTabs()}
            <Search />
          </>
        )}
      </Stack>
    </AppBar>
  );
};

export default Navigation;
