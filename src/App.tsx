import React from "react";
import { styled } from "styled-components";
import SearchBar from "./components/SearchBar";

const PlacedSearchBar = styled(SearchBar)`
  grid-area: searchbar;
`;

function App({ className }: { className?: string }) {
  return (
    <div className={`App ${className}`}>
      <PlacedSearchBar setText={alert} />
    </div>
  );
}

export default styled(App)`
  display: grid;
  grid-template-columns: auto 50rem auto;
  grid-template-rows: auto 1rem 100%;
  grid-template-areas:
    ". searchbar ."
    ". . ."
    ". list      .";
`;
