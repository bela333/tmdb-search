import { styled } from "styled-components";
import MovieItem from "./MovieItem";
import { Movie } from "../schemas/movie";

const MovieList = ({
  className,
  movies,
}: {
  className?: string;
  movies: Movie[];
}) => {
  return (
    <div className={className}>
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default styled(MovieList)`
  min-height: 30rem;
  padding: 2rem;
  border: 1px solid var(--secondary);
  background-color: var(--background-secondary);
`;
