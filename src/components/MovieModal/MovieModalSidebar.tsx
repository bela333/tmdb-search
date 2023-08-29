import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import ProgressBar from "../ProgressBar";
import noImage from "../../assets/noImage.jpg";
import { Link, Text } from "../Text";
import { Credits, extractDirector } from "../../schemas/credits";
import { SuspensifiedPromise } from "../../suspensify";
import { Suspense } from "react";

const Thumbnail = styled.img`
  width: 80%;
  height: auto;
  margin-bottom: 1rem;
`;

const Director = ({
  className,
  credits,
}: {
  className?: string;
  credits: SuspensifiedPromise<Credits>;
}) => {
  const director = extractDirector(credits.read().crew);
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

const MovieModalSidebar = ({
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
      <a
        href={`https://www.themoviedb.org/movie/${movie.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Thumbnail
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : noImage
          }
        />
      </a>
      <Suspense>
        <Director credits={credits} />
      </Suspense>
      <ProgressBar value={movie.vote_average / 10} />
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
  margin: 1rem;
  text-align: center;
`;
