import { styled } from "styled-components";
import { Movie } from "../schemas/movie";

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  font-style: italic;
  color: gray;
  font-weight: 100;
`;

const MovieItem = ({
  className,
  movie,
}: {
  className?: string;
  movie: Movie;
}) => {
  const release_year = movie.release_date.split("-")[0];
  return (
    <a className={className} onClick={() => alert(movie.original_title)}>
      <Title>{movie.original_title}</Title>
      <Subtitle>{release_year}</Subtitle>
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
