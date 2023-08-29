import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import ProgressBar from "../ProgressBar";
import noImage from "../../assets/noImage.jpg";
import { Link, Text } from "../Text";

const Thumbnail = styled.img`
  width: 80%;
  height: auto;
  margin-bottom: 1rem;
`;

const MovieModalSidebar = ({
  className,
  movie,
  director,
}: {
  className?: string;
  movie: Movie;
  director?: string;
}) => {
  return (
    <div className={className}>
      <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noopener noreferrer">
      <Thumbnail
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : noImage
        }
      />
      </a>
      {director ? <Text $thin>Directed By:</Text> : null}
      {director ? (
        <Link as="a" target="_blank" href={`https://www.themoviedb.org/person/11`} $bottomMargin="0.5rem" $fontSize="2em" $underlined>
          {director}
        </Link>
      ) : null}
      <ProgressBar value={movie.vote_average / 10} />
      <Text $thin>
        {(movie.vote_average * 10) | 0}% ({movie.vote_count} votes)
      </Text>
    </div>
  );
};

export default styled(MovieModalSidebar)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  text-align: center;
`;
