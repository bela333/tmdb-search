const readAccessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDY4NmZjMTk0ODhkMTEzYjIyYmM0OGZlM2I0Y2ZlYiIsInN1YiI6IjY0ZWM3NWJjNDU4MTk5MDEzYTdmMmZmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q3e_TZD9ihrztDN_h9zl_DFUqKiRfEny-6pAXAtQGpE";
const baseUrl = "https://api.themoviedb.org/3";
const baseHeaders = {
  accept: "application/json",
  Authorization: "Bearer " + readAccessToken,
};

/**
 * The primary gateway for accessing the TMDB API
 * @param endpoint - The API endpoint
 * @param init - An object containing any custom settings that you want to apply to the request. Same as `fetch`
 * @returns {Promise<Response>}
 * @example
 * await apiFetch("/search/movie?query=Oppenheimer", {method: "GET"});
 */
const apiFetch = (endpoint: string, init?: RequestInit): Promise<Response> => {
  if (!init) {
    init = {};
  }
  if (!init.headers) {
    init.headers = {};
  }
  init.headers = { ...baseHeaders, ...init.headers }; // Inject baseHeaders into `init`
  return fetch(baseUrl + endpoint, init);
};

export { baseUrl, apiFetch };
