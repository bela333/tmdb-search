import { render, screen } from "@testing-library/react";
import MovieList from "./MovieList";
import { Movie } from "../schemas/movie";
import { SuspensifiedPromise, suspensify } from "../suspensify";

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

const moviesSuspense: SuspensifiedPromise<Movie[]> = {
  read: () => {
    return movies;
  },
};

it("shows movies", () => {
  render(<MovieList movies={moviesSuspense} showMovieDetails={() => {}} />);
  expect(screen.getByText("Movie 1")).toBeInTheDocument();
  expect(screen.getByText("Movie 2")).toBeInTheDocument();
  expect(screen.getByText("1977")).toBeInTheDocument();
  expect(screen.getByText("1978")).toBeInTheDocument();
});

it("shows error", () => {
  render(
    <MovieList
      movies={{
        read: () => {
          throw "DUMMY ERROR";
        },
      }}
      showMovieDetails={() => {}}
    />,
  );
  expect(screen.getByText("DUMMY ERROR")).toBeInTheDocument();
});

it("shows spinner", () => {
  const promise: Promise<Movie[]> = new Promise(() => {});
  const suspense = suspensify(promise);
  render(<MovieList movies={suspense} showMovieDetails={() => {}} />);
  expect(screen.getByTitle("Spinner")).toBeInTheDocument();
});

it('shows "no results"', () => {
  const suspense: SuspensifiedPromise<Movie[]> = { read: () => [] };
  render(<MovieList movies={suspense} showMovieDetails={() => {}} />);
  expect(screen.getByText("No results")).toBeInTheDocument();
});
