import { styled } from "styled-components";
import MovieItem from "./MovieItem";
import { Movie } from "../schemas/movie";
import { SuspensifiedPromise } from "../suspensify";
import { Text } from "./Text";
import { SearchMovieResult } from "../api/searchMovie";

interface MovieListProps {
  className?: string;
  /** A `SuspensifiedPromise` with the information about the current page of movies. */
  results: SuspensifiedPromise<SearchMovieResult>;
  /** A callback called, when a movie tile is clicked */
  showMovieDetails: (movie: Movie) => void;
}

const MovieList = ({
  results,
  showMovieDetails,
  className,
}: MovieListProps) => {
  let result;
  // Read movie list from suspense. Return early, if an error occured
  try {
    result = results.read();
  } catch (error: any) {
    if (error.then) {
      // Duck typing. Is it a promise? If it is, we should follow Suspense behaviour and raise it up.
      throw error;
    }
    return (
      <div className={className}>
        <Text $color="red">Could not get list of movies:</Text>
        <Text>{error + ""}</Text>
      </div>
    );
  }
  // Show "No Results" if the search result list was empty
  if (result.results.length === 0) {
    return (
      <div className={className}>
        <Text $color="red" $bold>
          No results
        </Text>
      </div>
    );
  }
  return (
    <div className={className}>
      {result.results.map((movie) => (
        <MovieItem
          movie={movie}
          key={movie.id}
          showMovieDetails={showMovieDetails}
        />
      ))}
    </div>
  );
};

export default styled(MovieList)`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media screen and (min-width: 425px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  padding-bottom: 1rem;
`;
