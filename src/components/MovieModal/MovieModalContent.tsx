import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import { Credits } from "../../schemas/credits";
import { Link, Text } from "../Text";

const ActorEntry = styled.div`
  padding-bottom: 0.4rem;
`;

const MovieModalContent = ({
  className,
  movie,
  credits,
}: {
  className?: string;
  movie: Movie;
  credits: Credits;
}) => {
  return (
    <div className={className}>
      <Link
        as="a"
        target="_blank"
        href={`https://www.themoviedb.org/movie/${movie.id}`}
        $fontSize="2em"
        $bold
      >
        {movie.original_title}
      </Link>
      <Text $justified>{movie.overview}</Text>
      <h2>Cast</h2>
      {credits.cast.map((actor) => {
        return (
          <ActorEntry key={actor.id + "#" + actor.character}>
            <Link
              as="a"
              target="_blank"
              href={`https://www.themoviedb.org/person/${actor.id}`}
              $underlined
            >
              {actor.name}
            </Link>{" "}
            <Text as="span" $thin>
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
