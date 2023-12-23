import axios, { AxiosRequestConfig } from "axios";
import { CallApiParams } from "./apiTypes";
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const callApi = async <T>(params: CallApiParams): Promise<T> => {
  const { query } = params;
  const { endpoint, method, variables, input } = query;

  const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}${
    input ? `&input=${input}` : ""
  }`;

  const config: AxiosRequestConfig = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    data: variables,
  };

  try {
    const response = await axios(url, config);
    return response.data;
  } catch (error) {
    console.log("API err ", error);
    throw new Error(`API error - ${(error as Error).message}`);
  }
};
