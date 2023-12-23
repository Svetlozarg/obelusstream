import { Query } from "../apiTypes";

export const getMultiSearch = (query: string): Query => ({
  endpoint: "search/multi",
  method: "GET",
  input: `&query=${query}&page=1&include_adult=false`,
});
