"use client";
import { Box, ClickAwayListener, TextField, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import SearchList from "./SearchList";

interface SearchProps {
  big?: boolean;
}

const Search: React.FC<SearchProps> = ({ big }) => {
  const theme = useTheme();
  const [query, setQuery] = useState<string>("");

  const handleClickAway = () => {
    setQuery("");
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative" }}>
        <TextField
          placeholder="Search..."
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon />,
            style: {
              width: big ? "30rem" : "18rem",
              height: big ? "3rem" : "2.5rem",
              backgroundColor: theme.palette.common.white,
              color: theme.palette.common.black,
              borderRadius: big ? "30px" : "20px",
              border: "none",
              outline: "none",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
          }}
        />

        {query ? (
          <SearchList query={query} setQuery={setQuery} big={big} />
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export default Search;
