import { styled } from "styled-components";
import { Movie } from "../schemas/movie";
import { Text } from "./Text";

const MovieItem = ({
  className,
  movie,
  showMovieDetails,
}: {
  className?: string;
  movie: Movie;
  showMovieDetails: (movie: Movie) => void;
}) => {
  const release_year = movie.release_date.split("-")[0];
  return (
    <a className={className} onClick={() => showMovieDetails(movie)}>
      <Text as="h1">{movie.original_title}</Text>
      <Text as="h2" $thin $italic>
        {release_year}
      </Text>
    </a>
  );
};

export default styled(MovieItem)`
  border: 1px solid var(--secondary);
  margin-bottom: 0.5rem;
  padding: 1rem;
  display: block;
  cursor: pointer;
  text-align: center;
`;
