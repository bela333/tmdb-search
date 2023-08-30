import { styled } from "styled-components";
import { Movie } from "../../schemas/movie";
import MovieModalSidebar from "./MovieModalSidebar";
import MovieModalContent from "./MovieModalContent";
import { useMemo } from "react";
import getCredits from "../../api/getCredits";
import { suspensify } from "../../suspensify";
import ModalNavbar from "./ModalNavbar";

const PlacedMovieModalSidebar = styled(MovieModalSidebar)`
  grid-area: sidebar;
`;
const PlacedModalNavbar = styled(ModalNavbar)`
  grid-area: navbar;
  @media screen and (min-width: 425px) {
    display: none;
  }
`;
const PlacedMovieModalContent = styled(MovieModalContent)`
  grid-area: content;
  padding: 1rem;
`;

const Separator = styled.div`
  grid-area: separator;
  background-color: var(--secondary);
`;

const MovieModal = ({
  className,
  movie,
  setIsShown,
}: {
  className?: string;
  movie: Movie;
  setIsShown: (isShown: boolean) => void;
}) => {
  const credits = useMemo(() => suspensify(getCredits(movie.id)), [movie]);
  return (
    <div className={className}>
      <PlacedModalNavbar setIsShown={setIsShown} />
      <PlacedMovieModalSidebar movie={movie} credits={credits} />
      <Separator />
      <PlacedMovieModalContent movie={movie} credits={credits} />
    </div>
  );
};

export default styled(MovieModal)`
  @media screen and (min-width: 425px) {
    height: 40rem;
    max-height: 100vh;
    grid-template-columns: 15rem 1px 30rem;
    grid-template-rows: auto;
    grid-template-areas: "sidebar separator content";
    overflow-y: visible;
    padding: 0;
    width: auto;
    border-radius: 0.5rem;
  }
  grid-template-columns: auto;
  grid-template-rows: 2.5rem auto 1px auto;
  grid-template-areas: "navbar" "sidebar" "separator" "content";
  height: calc(100dvh - 1rem);
  width: calc(100dvw - 1rem);
  border-radius: 1rem;
  overflow-y: scroll;
  background-color: var(--background-secondary);
  display: grid;
`;
