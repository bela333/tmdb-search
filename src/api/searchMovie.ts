import { Movie } from "../schemas/movie";
import { apiFetch } from "./api";

/**
 * Search for movies with a certain name on TMDB
 * @param query - Name of the movie
 * @returns {Promise<Movie[]>}
 * @example
 * await searchMovie("Oppenheimer")
 */
const searchMovie = async (query: string): Promise<Movie[]> => {
  //TODO: Pagination
  const endpoint = `/search/movie?query=${encodeURIComponent(
    query,
  )}&language=en-US&page=1`;
  const response: Response = await apiFetch(endpoint, { method: "GET" });
  const message = await response.json();
  if (response.status !== 200) {
    throw message.status_message;
  }
  return message.results;
};

export default searchMovie;
