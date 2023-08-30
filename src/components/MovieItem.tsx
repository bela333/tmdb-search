import { styled } from "styled-components";
import { Movie } from "../schemas/movie";
import { Text } from "./Text";
import noImage from "../assets/noImage.jpg";
import { useImageBase } from "./ConfigurationProvider";

const Thumbnail = styled.img`
  width: 80%;
  height: auto;
  margin-bottom: 1rem;
`;

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
  const imageBaseUrl = useImageBase(300);
  return (
    <a className={className} onClick={() => showMovieDetails(movie)}>
      <Thumbnail
          src={
            movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : noImage
          }
        />
      <Text>{movie.original_title}</Text>
      <Text $thin $italic>
        {release_year}
      </Text>
    </a>
  );
};

export default styled(MovieItem)`
  border: 1px solid var(--secondary);
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 1rem;
  display: block;
  cursor: pointer;
  text-align: center;
  min-width: 10rem;
  max-width: 10rem;
  height: 20rem;
  scroll-snap-align: center;
  background-color: var(--background-secondary);
  border-radius: 0.5rem;
`;
