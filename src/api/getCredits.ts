import { Credits } from "../schemas/credits";
import { apiFetch } from "./api";

/**
 * Get credits for a movie
 * @param movieId - ID of the requested movie
 * @returns {Promise<Credits>}
 * @example
 * await getCredits(872585)
 */
const getCredits = async (movieId: number): Promise<Credits> => {
  const endpoint = `/movie/${movieId}/credits?language=en-US`;
  const response: Response = await apiFetch(endpoint, { method: "GET" });
  const message = await response.json();
  if (response.status !== 200) {
    throw message.status_message;
  }
  return message;
};

export default getCredits;
