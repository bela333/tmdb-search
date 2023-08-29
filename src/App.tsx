import { useMemo, useState } from "react";
import { styled } from "styled-components";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import ModalEnvironment from "./components/ModalEnvironment";
import MovieModal from "./components/MovieModal/MovieModal";
import { Movie } from "./schemas/movie";
import searchMovie from "./api/searchMovie";
import { SuspensifiedPromise, suspensify } from "./suspensify";

const MovieListPlace = styled.div`
  grid-area: movielist;
`;
const SearchBarPlace = styled.div`
  grid-area: searchbar;
`;

function App({ className }: { className?: string }) {
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | undefined>();
  const showMovieDetails = (movie: Movie) => {
    setModalMovie(movie);
    setIsModalShown(true);
  };

  const [search, setSearch] = useState<string | undefined>();
  const results: SuspensifiedPromise<Movie[]> = useMemo(() => {
    if (!search) {
      return { read: () => [] };
    }
    return suspensify(searchMovie(search));
  }, [search]);

  return (
    <div className={className}>
      <SearchBarPlace>
        <SearchBar setText={(text) => setSearch(text)} />
      </SearchBarPlace>
      <MovieListPlace>
        <MovieList movies={results} showMovieDetails={showMovieDetails} />
      </MovieListPlace>
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
