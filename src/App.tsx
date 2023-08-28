import React, { useState } from "react";
import { styled } from "styled-components";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import { dummyResults } from "./dummy";
import ModalEnvironment from "./components/ModalEnvironment";
import MovieModal from "./components/MovieModal/MovieModal";
import { Movie } from "./schemas/movie";

const PlacedSearchBar = styled(SearchBar)`
  grid-area: searchbar;
`;
const PlacedMovieList = styled(MovieList)`
  grid-area: movielist;
`;

function App({ className }: { className?: string }) {
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | undefined>();

  const showMovieDetails = (movie: Movie) => {
    setModalMovie(movie);
    setIsModalShown(true);
  };

  return (
    <div className={className}>
      <PlacedSearchBar setText={alert} />
      <PlacedMovieList
        movies={dummyResults}
        showMovieDetails={showMovieDetails}
      />
      <ModalEnvironment
        isShown={isModalShown && modalMovie != undefined}
        setIsShown={setIsModalShown}
      >
        {/* Because of "isShown", modalMovie will only be used, if it is not undefined */}
        <MovieModal movie={modalMovie as Movie} />
      </ModalEnvironment>
    </div>
  );
}

export default styled(App)`
  display: grid;
  grid-template-columns: auto 50rem auto;
  grid-template-rows: auto 1.5rem auto;
  grid-template-areas:
    ". searchbar ."
    ". . ."
    ". movielist .";
`;
