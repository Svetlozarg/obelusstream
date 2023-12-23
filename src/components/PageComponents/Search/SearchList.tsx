"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { callApi } from "@/services/callApi";
import { getMultiSearch } from "@/services/Search/apiGetSearch";
import { Movie, SearchResult, SeriesFromList } from "@/services/apiTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchListProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  big?: boolean;
}

const SearchList: React.FC<SearchListProps> = ({ query, setQuery, big }) => {
  const router = useRouter();
  const [searchData, setSearchData] = useState<Movie[] | SeriesFromList[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const searchData = await callApi<SearchResult>({
          query: getMultiSearch(query),
        });
        setSearchData(searchData.results);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [query]);

  return (
    <List
      sx={{
        width: big ? "480px" : "100%",
        maxWidth: big ? "480px" : 360,
        maxHeight: 600,
        bgcolor: "background.default",
        position: "absolute",
        top: big ? "55px" : "45px",
        overflow: "auto",
        boxShadow: "1px 1px 4px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      {searchData.length === 0 && (
        <ListItem>
          <ListItemText
            primary="No results found"
            sx={{ textAlign: "center" }}
          />
        </ListItem>
      )}
      {searchData.length > 0 &&
        searchData.map((item: any) => {
          if (!item.poster_path) return;

          return (
            <>
              <ListItem
                key={item.id}
                sx={{
                  cursor: "pointer",
                  gap: 2,
                  ":hover": {
                    backgroundColor: "primary.main",
                  },
                }}
                onClick={() => {
                  if (item.media_type === "tv") {
                    router.push(`/series?id=${item.id}?season=1?episode=1`);
                  } else {
                    router.push(`/movie?id=${item.id}`);
                  }
                  setQuery("");
                }}
              >
                <ListItemAvatar>
                  <Image
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    width={80}
                    height={110}
                    style={{ borderRadius: "5px" }}
                    alt="Poster Image"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item?.title || item?.name}
                  secondary={
                    <Typography component="p" variant="body1">
                      {item?.release_date?.split("-")[0] ||
                        item?.first_air_date?.split("-")[0]}{" "}
                      {item?.vote_average && item?.vote_average?.toFixed(1)}{" "}
                      {item?.media_type && item?.media_type === "tv"
                        ? "TV"
                        : "Movie"}
                    </Typography>
                  }
                />
              </ListItem>
            </>
          );
        })}
    </List>
  );
};

export default SearchList;
