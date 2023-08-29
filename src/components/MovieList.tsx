import { styled } from "styled-components";
import MovieItem from "./MovieItem";
import { Movie } from "../schemas/movie";
import { SuspensifiedPromise } from "../suspensify";
import { Suspense } from "react";
import Loading from "./Loading";

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
    return (
      <div className={className}>
        {movies.read().map((movie) => (
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
  flex-direction: column;
  justify-content: start;
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
      <Suspense fallback={<Loading />}>
        <MovieListItems movies={movies} showMovieDetails={showMovieDetails} />
      </Suspense>
    </div>
  );
};

export default styled(MovieList)`
  display: flex;
  flex-direction: column;
  min-height: 30rem;
  padding: 2rem;
  border: 1px solid var(--secondary);
  background-color: var(--background-secondary);
`;
