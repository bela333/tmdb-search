import { styled } from "styled-components";
import MovieItem from "./MovieItem";
import { Movie } from "../schemas/movie";
import { SuspensifiedPromise } from "../suspensify";
import { Suspense } from "react";
import Spinner from "./Spinner";
import { Text } from "./Text";

const MovieListItems = styled(
  ({
    movies,
    showMovieDetails,
    className,
  }: {
    className?: string;
    movies: SuspensifiedPromise<Movie[]>;
    showMovieDetails: (movie: Movie) => void;
  }) => {
    let list;
    try {
      list = movies.read();
    } catch (error: any) {
      if (error.then) {
        /* Duck typing. Is it a promise? */
        throw error;
      }
      return (
        <div className={className}>
          <Text $color="red">Could not get list of movies:</Text>
          <Text>{error + ""}</Text>
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
  },
)`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-left: calc(50% - (10rem + 3rem) / 2);
  padding-bottom: 1rem;
`;

const MovieList = ({
  className,
  movies,
  showMovieDetails,
}: {
  className?: string;
  movies: SuspensifiedPromise<Movie[]>;
  showMovieDetails: (movie: Movie) => void;
}) => {
  return (
    <div className={className}>
      <Suspense fallback={<Spinner />}>
        <MovieListItems movies={movies} showMovieDetails={showMovieDetails} />
      </Suspense>
    </div>
  );
};

export default styled(MovieList)`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
