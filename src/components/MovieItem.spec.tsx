import { render, screen } from "@testing-library/react";
import MovieItem from "./MovieItem";
import { Movie } from "../schemas/movie";
import userEvent from "@testing-library/user-event";
import noImage from "../assets/noImage.jpg";

const movie: Movie = {
  id: 0,
  original_title: "Original title",
  overview: "Overview",
  release_date: "2023-08-31",
  vote_average: 5,
  vote_count: 10,
  poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
};

it("shows movie details", () => {
  render(<MovieItem movie={movie} />);
  expect(screen.getByText("Original title")).toBeInTheDocument();
  expect(screen.getByText("2023")).toBeInTheDocument();
});

it("can be clicked", () => {
  const fn = jest.fn();
  render(<MovieItem movie={movie} showMovieDetails={fn} />);
  userEvent.click(screen.getByRole("link"));
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenCalledWith(movie);
});

it("can have no onClick", () => {
  render(<MovieItem movie={movie} />);
  userEvent.click(screen.getByRole("link"));
});

it("can show noImage", () => {
  const noImageMovie: Movie = {
    ...movie,
    poster_path: undefined,
  };
  render(<MovieItem movie={noImageMovie} />);
  expect(
    screen
      .getAllByRole("img")
      .filter(
        (elem: HTMLElement) =>
          (elem as HTMLImageElement).src == "http://localhost/noImage.jpg",
      ),
  ).not.toHaveLength(0);
});
