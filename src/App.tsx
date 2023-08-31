import { Suspense, useMemo, useState } from "react";
import { styled } from "styled-components";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import ModalEnvironment from "./components/ModalEnvironment";
import MovieModal from "./components/MovieModal/MovieModal";
import { Movie } from "./schemas/movie";
import searchMovie from "./api/searchMovie";
import { SuspensifiedPromise, suspensify } from "./suspensify";
import { ConfigurationProvider } from "./components/ConfigurationProvider";
import getConfiguration from "./api/getConfiguration";
import GrowingSpinner from "./components/GrowingSpinner";
import Welcome from "./components/Welcome";

const MovieListPlace = styled.div`
  grid-area: movielist;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
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

  const configuration = useMemo(() => {
    return suspensify(getConfiguration());
  }, []);

  return (
    <Suspense fallback={<GrowingSpinner $growX $growY />}>
      <ConfigurationProvider configuration={configuration}>
        <div className={className}>
          <SearchBarPlace>
            <SearchBar setText={(text) => setSearch(text)} />
          </SearchBarPlace>
          <MovieListPlace>
            {search ? (
              <MovieList movies={results} showMovieDetails={showMovieDetails} />
            ) : (
              <Welcome />
            )}
          </MovieListPlace>
          <ModalEnvironment
            isShown={isModalShown && modalMovie !== undefined}
            closeModal={() => setIsModalShown(false)}
          >
            {/* Because of "isShown", modalMovie will only be used, if it is not undefined */}
            <MovieModal
              movie={modalMovie as Movie}
              closeModal={() => setIsModalShown(false)}
            />
          </ModalEnvironment>
        </div>
      </ConfigurationProvider>
    </Suspense>
  );
}

export default styled(App)`
  display: grid;
  height: 100%;
  grid-template-columns: 100%;
  grid-template-rows: auto 0.5rem auto;
  grid-template-areas:
    "searchbar"
    "."
    "movielist";
  @media screen and (min-width: 425px) {
    grid-template-columns: auto 50rem auto;
    grid-template-rows: auto 1.5rem auto;
    grid-template-areas:
      ". searchbar ."
      ". . ."
      "movielist movielist movielist";
  }
`;
