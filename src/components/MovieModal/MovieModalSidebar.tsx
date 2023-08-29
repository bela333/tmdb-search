import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import ProgressBar from "../ProgressBar";
import noImage from "../../assets/noImage.jpg";
import { Text } from "../Text";

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
      <Thumbnail
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : noImage
        }
      />
      {director ? <Text $thin>Directed By:</Text> : null}
      {director ? (
        <Text as="h1" $bottomMargin="0.5rem">
          {director}
        </Text>
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
