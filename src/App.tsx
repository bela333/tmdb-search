import React from "react";
import { styled } from "styled-components";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import { dummyResults } from "./dummy";

const PlacedSearchBar = styled(SearchBar)`
  grid-area: searchbar;
`;
const PlacedMovieList = styled(MovieList)`
  grid-area: movielist;
`;

function App({ className }: { className?: string }) {
  return (
    <div className={className}>
      <PlacedSearchBar setText={alert} />
      <PlacedMovieList movies={dummyResults} />
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
