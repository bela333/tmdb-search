import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import ProgressBar from "../ProgressBar";
import noImage from "../../assets/noImage.jpg";

const Thumbnail = styled.img`
  width: 80%;
  height: auto;
  margin-bottom: 1rem;
`;

const ThinText = styled.h2`
  margin: 0;
  font-weight: 100;
`;

const Director = styled.h1`
  margin: 0;
  font-weight: normal;
  margin-bottom: 0.5rem;
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
      {director ? <ThinText>Directed By:</ThinText> : null}
      {director ? <Director>{director}</Director> : null}
      <ProgressBar value={movie.vote_average / 10} />
      <ThinText>
        {(movie.vote_average * 10) | 0}% ({movie.vote_count} votes)
      </ThinText>
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
