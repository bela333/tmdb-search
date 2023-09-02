import { render, screen } from "@testing-library/react";
import MovieList from "./MovieList";
import { Movie } from "../schemas/movie";
import { SuspensifiedPromise, suspensify } from "../suspensify";
import { SearchMovieResult } from "../api/searchMovie";

const movies: Movie[] = [
  {
    id: 1,
    original_title: "Movie 1",
    overview: "Story of Movie 1",
    release_date: "1977-01-01",
    vote_average: 5,
    vote_count: 10,
  },
  {
    id: 2,
    original_title: "Movie 2",
    overview: "Story of Movie 2",
    release_date: "1978-02-02",
    vote_average: 6,
    vote_count: 12,
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  },
];

const moviesSuspense: SuspensifiedPromise<SearchMovieResult> = {
  read: () => ({
    page: 1,
    results: movies,
    total_pages: 1,
  }),
};

it("shows movies", () => {
  render(<MovieList results={moviesSuspense} showMovieDetails={() => {}} />);
  expect(screen.getByText("Movie 1")).toBeInTheDocument();
  expect(screen.getByText("Movie 2")).toBeInTheDocument();
  expect(screen.getByText("1977")).toBeInTheDocument();
  expect(screen.getByText("1978")).toBeInTheDocument();
});

it("shows error", () => {
  render(
    <MovieList
      results={{
        read: () => {
          throw "DUMMY ERROR";
        },
      }}
      showMovieDetails={() => {}}
    />,
  );
  expect(screen.getByText("DUMMY ERROR")).toBeInTheDocument();
});

it('shows "no results"', () => {
  const suspense: SuspensifiedPromise<SearchMovieResult> = {
    read: () => ({
      page: 1,
      results: [],
      total_pages: 1,
    }),
  };
  render(<MovieList results={suspense} showMovieDetails={() => {}} />);
  expect(screen.getByText("No results")).toBeInTheDocument();
});
