import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import { Credits } from "../../schemas/credits";
import { Link, Text } from "../Text";
import { SuspensifiedPromise } from "../../suspensify";
import { Suspense } from "react";
import Spinner from "../Spinner";
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
  let cast;
  try {
    cast = credits.read().cast;
  } catch (error: any) {
    if (error.then) {
      /* Duck typing. Is it a promise? */
      throw error;
    }
    return (
      <div className={className}>
        <Text $color="red">Could not get movie credits:</Text>
        <Text>{error + ""}</Text>
      </div>
    );
  }
  if (cast.length <= 0) {
    return <div></div>;
  }
  return (
    <div className={className}>
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
            {actor.character ? (
              <span>
                <Text as="span" $thin>
                  as
                </Text>{" "}
                {actor.character}
              </span>
            ) : null}
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
            <Spinner />
          </Flex>
        }
      >
        <Cast credits={credits} />
      </Suspense>
    </div>
  );
};

export default styled(MovieModalContent)`
  @media screen and (min-width: 425px) {
    overflow-y: scroll;
  }
`;
