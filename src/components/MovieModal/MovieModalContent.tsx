import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import { Credits } from "../../schemas/credits";
import { Link, Text } from "../Text";
import { SuspensifiedPromise } from "../../suspensify";
import { Suspense } from "react";
import Spinner from "../Spinner";
import Flex from "../Flex";
import GrowingSpinner from "../GrowingSpinner";

const ActorEntry = styled.div`
  padding-bottom: 0.4rem;
`;

interface CastProps {
  className?: string;
  /** A `SuspensifiedPromise` containing further information about the movie, regarding the creators */
  credits: SuspensifiedPromise<Credits>;
}

const Cast = ({ className, credits }: CastProps) => {
  let cast;

  // Read the list of cast, from the `credits` suspense
  try {
    cast = credits.read().cast;
  } catch (error: any) {
    if (error.then) {
      // Duck typing. Is it a promise? If it is, we should follow Suspense behaviour and raise it up.
      throw error;
    }
    return (
      <div className={className}>
        <Text $color="red">Could not get movie credits:</Text>
        <Text>{error + ""}</Text>
      </div>
    );
  }

  // If the cast list is empty, don't show section
  if (cast.length <= 0) {
    return <div></div>;
  }

  return (
    <div className={className}>
      <h2>Cast</h2>
      {cast.map((actor) => {
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

interface MovieModalContentProps {
  className?: string;
  /** The movie to be shown in detail */
  movie: Movie;
  /** A `SuspensifiedPromise` containing further information about the movie, regarding the creators */
  credits: SuspensifiedPromise<Credits>;
}

const MovieModalContent = ({
  className,
  movie,
  credits,
}: MovieModalContentProps) => {
  return (
    <div className={className}>
      <Link
        as="a"
        target="_blank"
        href={`https://www.themoviedb.org/movie/${movie.id}`}
        $fontSize="1.5em"
        $bold
      >
        {movie.original_title}
      </Link>
      <Text $justified>{movie.overview}</Text>
      <Suspense fallback={<GrowingSpinner $growX />}>
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
