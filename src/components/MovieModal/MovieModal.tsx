import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import MovieModalSidebar from "./MovieModalSidebar";
import MovieModalContent from "./MovieModalContent";
import { dummyCredits } from "../../dummy";

const PlacedMovieModalSidebar = styled(MovieModalSidebar)`
  grid-area: sidebar;
`;
const PlacedMovieModalContent = styled(MovieModalContent)`
  grid-area: content;
`;

const Separator = styled.div`
  grid-area: separator;
  background-color: var(--secondary);
`;

const MovieModal = ({
  className,
  movie,
}: {
  className?: string;
  movie: Movie;
}) => {
  return (
    <div className={className}>
      <PlacedMovieModalSidebar movie={movie} credits={dummyCredits} />
      <Separator />
      <PlacedMovieModalContent movie={movie} credits={dummyCredits} />
    </div>
  );
};

export default styled(MovieModal)`
  height: 40rem;
  max-height: 100vh;
  background-color: var(--background-secondary);
  display: grid;
  grid-template-columns: 15rem 1px 30rem;
  grid-template-rows: auto;
  grid-template-areas: "sidebar separator content";
`;
