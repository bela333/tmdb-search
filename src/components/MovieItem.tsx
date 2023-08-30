import { Movie } from "../schemas/movie";
import noImage from "../assets/noImage.jpg";
import { useImageBase } from "./ConfigurationProvider";
import ListItem from "./ListItem";

const MovieItem = ({
  className,
  movie,
  showMovieDetails,
}: {
  className?: string;
  movie: Movie;
  showMovieDetails?: (movie: Movie) => void;
}) => {
  const release_year = movie.release_date.split("-")[0];
  const imageBaseUrl = useImageBase(300);
  return (
    <ListItem
      className={className}
      title={movie.original_title}
      subtitle={release_year}
      thumbnail={
        movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : noImage
      }
      onClick={() => {
        if (showMovieDetails) {
          showMovieDetails(movie);
        }
      }}
    />
  );
};

export default MovieItem;
