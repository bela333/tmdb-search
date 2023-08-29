import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import { Credits } from "../../schemas/credits";
import { Link, Text } from "../Text";
import { SuspensifiedPromise } from "../../suspensify";
import { Suspense } from "react";
import Loading from "../Loading";
import Flex from "../Flex";

const ActorEntry = styled.div`
  padding-bottom: 0.4rem;
`;

const Cast = ({
  className,
  credits,
}: {
  className?: string;
  credits: SuspensifiedPromise<Credits>;
}) => {
  const cast = credits.read().cast;
  if (cast.length <= 0) {
    return <div></div>;
  }
  return (
    <div>
      <h2>Cast</h2>
      {credits.read().cast.map((actor) => {
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

const MovieModalContent = ({
  className,
  movie,
  credits,
}: {
  className?: string;
  movie: Movie;
  credits: SuspensifiedPromise<Credits>;
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
      <Suspense
        fallback={
          <Flex>
            <Loading />
          </Flex>
        }
      >
        <Cast credits={credits} />
      </Suspense>
    </div>
  );
};

export default styled(MovieModalContent)`
  padding: 1rem;
  overflow-y: scroll;
`;
