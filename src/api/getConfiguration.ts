import { Configuration, defaultConfiguration } from "../schemas/configuration";
import { apiFetch } from "./api";

//For development, use hard coded values. TODO: Set this to `false` in production
const development = true;

/**
 * Get website configuration
 * @returns {Promise<Configuration>}
 */
const getConfiguration = async (): Promise<Configuration> => {
  if (development) {
    return defaultConfiguration;
  }
  const endpoint = `/configuration`;

  const response: Response = await apiFetch(endpoint, { method: "GET" });
  const message = await response.json();
  if (response.status !== 200) {
    // Use hardcoded defaults
    return defaultConfiguration;
  }
  return message;
};

export default getConfiguration;
