import { Movie } from "../schemas/movie";
import noImage from "../assets/noImage.jpg";
import { useImageBase } from "./ConfigurationProvider";
import ListItem from "./ListItem";

interface MovieItemProps {
  className?: string;
  /** Movie to display in this tile */
  movie: Movie;
  /** Called when this movie's tile is clicked */
  showMovieDetails?: (movie: Movie) => void;
}

/** A tile representing a movie. Deriving from `ListItem` */
const MovieItem = ({ className, movie, showMovieDetails }: MovieItemProps) => {
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
      thumbnailTitle={movie.original_title}
      cutoff
    />
  );
};

export default MovieItem;
