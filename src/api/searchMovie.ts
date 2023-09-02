import { Movie } from "../schemas/movie";
import { apiFetch } from "./api";

export interface SearchMovieResult {
  results: Movie[];
  page: number;
  total_pages: number;
}

/**
 * Search for movies with a certain name on TMDB
 * @param {string} query - Name of the movie
 * @param {number} page - Which page of the results to return
 * @returns {Promise<Movie[]>}
 * @example
 * await searchMovie("Oppenheimer")
 */
const searchMovie = async (
  query: string,
  page: number,
): Promise<SearchMovieResult> => {
  //TODO: Pagination
  const endpoint = `/search/movie?query=${encodeURIComponent(
    query,
  )}&language=en-US&page=${page}`;
  const response: Response = await apiFetch(endpoint, { method: "GET" });
  const message = await response.json();
  if (response.status !== 200) {
    throw message.status_message;
  }
  return message;
};

export default searchMovie;
