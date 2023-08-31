import { styled } from "styled-components";
import MovieItem from "./MovieItem";
import { Movie } from "../schemas/movie";
import { SuspensifiedPromise } from "../suspensify";
import { Suspense } from "react";
import { Text } from "./Text";
import GrowingSpinner from "./GrowingSpinner";

const SuspendedMovieList = ({
  movies,
  showMovieDetails,
  className,
}: {
  className?: string;
  movies: SuspensifiedPromise<Movie[]>;
  showMovieDetails: (movie: Movie) => void;
}) => {
  let list;
  // Read movie list from suspense. Return early, if an error occured
  try {
    list = movies.read();
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
  if (list.length == 0) {
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
      {list.map((movie) => (
        <MovieItem
          movie={movie}
          key={movie.id}
          showMovieDetails={showMovieDetails}
        />
      ))}
    </div>
  );
};

const StyledSuspendedMovieList = styled(SuspendedMovieList)`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media screen and (min-width: 425px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  padding-bottom: 1rem;
`;

interface MovieListProps {
  className?: string;
  /** A `SuspensifiedPromise` containing the list of movies shown. If `null`, it shows a generic "Welcome" screen. */
  movies: SuspensifiedPromise<Movie[]>;
  /** A callback called, when a movie tile is clicked */
  showMovieDetails: (movie: Movie) => void;
}

const MovieList = ({ className, movies, showMovieDetails }: MovieListProps) => {
  return (
    <div className={className}>
      <Suspense fallback={<GrowingSpinner $growX />}>
        <StyledSuspendedMovieList
          movies={movies}
          showMovieDetails={showMovieDetails}
        />
      </Suspense>
    </div>
  );
};

/**
 * Show a list of movies
 */
export default styled(MovieList)`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
