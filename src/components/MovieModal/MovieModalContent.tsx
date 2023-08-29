import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import { Cast } from "../../schemas/cast";
import { Text } from "../Text";

const ActorEntry = styled.div`
  padding-bottom: 0.4rem;
`;

const MovieModalContent = ({
  className,
  movie,
  cast,
}: {
  className?: string;
  movie: Movie;
  cast: Cast[];
}) => {
  return (
    <div className={className}>
      <h1>{movie.original_title}</h1>
      <Text justified>{movie.overview}</Text>
      <h2>Cast</h2>
      {cast.map((actor) => {
        return (
          <ActorEntry key={actor.id + "#" + actor.character}>
            <a href={`https://www.themoviedb.org/person/${actor.id}`}>
              {actor.name}
            </a>{" "}
            <Text as="span" thin>
              as
            </Text>{" "}
            {actor.character}
          </ActorEntry>
        );
      })}
    </div>
  );
};

export default styled(MovieModalContent)`
  padding: 1rem;
  overflow-y: scroll;
`;
