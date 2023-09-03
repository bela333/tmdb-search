import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import RatingBar from "../RatingBar";
import noImage from "../../assets/noImage.jpg";
import { Link, Text } from "../Text";
import { Credits, extractDirector } from "../../schemas/credits";
import { SuspensifiedPromise } from "../../suspensify";
import { Suspense } from "react";
import { useImageBase } from "../ConfigurationProvider";
import Thumbnail from "../Thumbnail";

interface DirectorProps {
  className?: string;
  /** A `SuspensifiedPromise` containing further information about the movie, regarding the creators */
  credits: SuspensifiedPromise<Credits>;
}

const Director = ({ className, credits }: DirectorProps) => {
  let director;

  // Read credits suspense, and extract the director (the first one)
  try {
    director = extractDirector(credits.read().crew);
  } catch (error: any) {
    if (error.then) {
      // Duck typing. Is it a promise? If it is, we should follow Suspense behaviour and raise it up.
      throw error;
    }
    // In case of error, don't show anything
    return <div className={className}></div>;
  }
  return (
    <div className={className}>
      {director ? <Text $thin>Directed By:</Text> : null}
      {director ? (
        <Link
          as="a"
          target="_blank"
          href={`https://www.themoviedb.org/person/${director.id}`}
          $bottomMargin="0.5rem"
          $fontSize="2em"
          $underlined
        >
          {director.name}
        </Link>
      ) : null}
    </div>
  );
};

interface MovieModalSidebarProps {
  className?: string;
  /** The movie to be shown in detail */
  movie: Movie;
  /** A `SuspensifiedPromise` containing further information about the movie, regarding the creators */
  credits: SuspensifiedPromise<Credits>;
}

const MovieModalSidebar = ({
  className,
  movie,
  credits,
}: MovieModalSidebarProps) => {
  const imageBaseUrl = useImageBase(300);
  return (
    <div className={className}>
      <a
        href={`https://www.themoviedb.org/movie/${movie.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Thumbnail
          $width="100%"
          src={
            movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : noImage
          }
          title={movie.original_title}
          alt={movie.original_title}
        />
      </a>
      <Suspense>
        <Director credits={credits} />
      </Suspense>
      <RatingBar value={movie.vote_average / 10} />
      <Text $thin>
        {(movie.vote_average * 10) | 0}% ({movie.vote_count} votes)
      </Text>
      {movie.release_date ? (
        <Text $topMargin="1rem">Release date: {movie.release_date}</Text>
      ) : null}
    </div>
  );
};

export default styled(MovieModalSidebar)`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 425px) {
    margin: 1rem;
  }
  margin: 0rem 1rem 1rem 1rem;
  text-align: center;
`;
