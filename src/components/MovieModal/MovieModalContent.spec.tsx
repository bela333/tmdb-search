import { render, screen } from "@testing-library/react";
import MovieModalContent from "./MovieModalContent";
import { Movie } from "../../schemas/movie";
import { Credits } from "../../schemas/credits";
import { suspensify } from "../../suspensify";

const movie: Movie = {
  id: 2,
  original_title: "Movie 2",
  overview: "Story of Movie 2",
  release_date: "1978-02-02",
  vote_average: 6,
  vote_count: 12,
  poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
};

const credits: Credits = {
  cast: [
    {
      cast_id: 1,
      character: "GABEN",
      id: 1,
      name: "Gabe Newell",
    },
    {
      cast_id: 2,
      character: "Oppie",
      id: 2,
      name: "J. Robert Oppenheimer",
    },
  ],
  crew: [
    {
      id: 1,
      job: "Director",
      name: "Steven Spielberg",
    },
  ],
};

const credits2: Credits = {
  cast: [
    {
      cast_id: 1,
      character: "",
      id: 1,
      name: "Gabe Newell",
    },
  ],
  crew: [
    {
      id: 1,
      job: "Director",
      name: "Steven Spielberg",
    },
  ],
};

const suspendedCredits = { read: () => credits };
const suspendedCredits2 = { read: () => credits2 };

it("shows basic content", () => {
  render(<MovieModalContent movie={movie} credits={suspendedCredits} />);
  expect(screen.getByText("Movie 2")).toBeInTheDocument();
  expect(screen.getByText("Story of Movie 2")).toBeInTheDocument();
  expect(screen.getByText("GABEN")).toBeInTheDocument();
  expect(screen.getByText("J. Robert Oppenheimer")).toBeInTheDocument();

  expect(screen.getByText("Cast")).toBeInTheDocument();
  expect(screen.getAllByTestId("as")).not.toHaveLength(0);
});

it("shows spinner", () => {
  const promise: Promise<Credits> = new Promise(() => {});
  const suspense = suspensify(promise);
  render(<MovieModalContent movie={movie} credits={suspense} />);
  expect(screen.getByTitle("Spinner")).toBeInTheDocument();
});

it("does not show empty cast", () => {
  const credits: Credits = {
    cast: [],
    crew: [],
  };
  render(<MovieModalContent movie={movie} credits={{ read: () => credits }} />);
  expect(() => screen.getByText("Cast")).toThrowError();
});

it("does not show character if missing", () => {
  render(<MovieModalContent movie={movie} credits={suspendedCredits2} />);
  expect(() => screen.getAllByTestId("as")).toThrowError();
});

it("shows error", () => {
  render(
    <MovieModalContent
      movie={movie}
      credits={{
        read: () => {
          throw "DUMMY ERROR";
        },
      }}
    />,
  );
  expect(screen.getByText("DUMMY ERROR")).toBeInTheDocument();
});
