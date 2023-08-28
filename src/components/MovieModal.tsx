import { styled } from "styled-components";
import { Movie } from "../schemas/movie";

const MovieModal = ({
  className,
  movie,
}: {
  className?: string;
  movie: Movie;
}) => {
  return (
    <div className={className}>
      Ez egy MODÁL a {movie.original_title} című filmhez.
      <button onClick={() => alert("amogus")}>asd</button>
    </div>
  );
};

export default styled(MovieModal)`
  width: 10rem;
  height: 10rem;
  background-color: white;
`;
