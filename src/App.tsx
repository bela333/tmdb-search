import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import ModalEnvironment from "./components/ModalEnvironment";
import MovieModal from "./components/MovieModal/MovieModal";
import { Movie } from "./schemas/movie";
import searchMovie, { SearchMovieResult } from "./api/searchMovie";
import { SuspensifiedPromise, suspensify } from "./suspensify";
import { ConfigurationProvider } from "./components/ConfigurationProvider";
import getConfiguration from "./api/getConfiguration";
import GrowingSpinner from "./components/GrowingSpinner";
import Welcome from "./components/Welcome";
import PageNumber from "./components/PageNumber";

const MovieListPlace = styled.div`
  grid-area: movielist;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
`;

const SearchBarPlace = styled.div`
  grid-area: searchbar;
`;

const BottomPageNumberPlace = styled.div`
  grid-area: bottompagenumber;
`;
const TopPageNumberPlace = styled.div`
  grid-area: toppagenumber;
  display: none;
  @media screen and (min-width: 425px) {
    display: unset;
  }
`;

function App({ className }: { className?: string }) {
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | undefined>();
  const showMovieDetails = (movie: Movie) => {
    setModalMovie(movie);
    setIsModalShown(true);
  };

  // Disable scroll on body, if modal is shown
  useEffect(() => {
    if (isModalShown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalShown]);

  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const refScroll = useRef<HTMLDivElement>(null);
  const results: SuspensifiedPromise<SearchMovieResult> = useMemo(() => {
    // Put scrolling div back to starting position when searching/changing page
    if (refScroll.current) {
      refScroll.current.scrollLeft = 0;
      refScroll.current.scrollTop = 0;
    }
    if (!search) {
      return {
        read: (): SearchMovieResult => ({
          page: 1,
          results: [],
          total_pages: 1,
        }),
      };
    }
    const promise = searchMovie(search, page);
    return suspensify(promise);
  }, [search, page]);

  const configuration = useMemo(() => {
    return suspensify(getConfiguration());
  }, []);

  return (
    <Suspense fallback={<GrowingSpinner $growX $growY />}>
      <ConfigurationProvider configuration={configuration}>
        <div className={className}>
          <SearchBarPlace>
            <SearchBar
              setText={(text) => {
                setSearch(text);
                setPage(1);
              }}
            />
          </SearchBarPlace>
          <Suspense
            fallback={
              <MovieListPlace>
                <GrowingSpinner $growX />
              </MovieListPlace>
            }
          >
            <MovieListPlace ref={refScroll}>
              {search ? (
                <MovieList
                  results={results}
                  showMovieDetails={showMovieDetails}
                />
              ) : (
                <Welcome />
              )}
            </MovieListPlace>
            <TopPageNumberPlace>
              {search ? (
                <PageNumber results={results} changePage={setPage} />
              ) : null}
            </TopPageNumberPlace>
            <BottomPageNumberPlace>
              {search ? (
                <PageNumber results={results} changePage={setPage} />
              ) : null}
            </BottomPageNumberPlace>
          </Suspense>
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
  grid-template-rows: auto 0.5rem auto auto;
  grid-template-areas:
    "searchbar"
    "."
    "movielist"
    "bottompagenumber";
  @media screen and (min-width: 425px) {
    grid-template-columns: auto 50rem auto;
    grid-template-rows: auto 1.5rem auto auto;
    grid-template-areas:
      ". searchbar ."
      ". . ."
      "toppagenumber toppagenumber toppagenumber"
      "movielist movielist movielist"
      "bottompagenumber bottompagenumber bottompagenumber";
  }
`;
