import { render, screen } from "@testing-library/react";
import MovieModalSidebar from "./MovieModalSidebar";
import { Movie } from "../../schemas/movie";
import { Credits } from "../../schemas/credits";
import { suspensify } from "../../suspensify";

const movie: Movie = {
  id: 2,
  original_title: "Movie 2",
  overview: "Story of Movie 2",
  release_date: "",
  vote_average: 6,
  vote_count: 12,
  poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
};
const movie2: Movie = {
  id: 2,
  original_title: "Movie 2",
  overview: "Story of Movie 2",
  release_date: "1978-02-02",
  vote_average: 6,
  vote_count: 12,
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
  crew: [],
};

const suspendedCredits = { read: () => credits };
const suspendedCredits2 = { read: () => credits2 };

it("shows thumbnail", () => {
  render(<MovieModalSidebar credits={suspendedCredits} movie={movie} />);
  expect(
    screen
      .getAllByRole("img")
      .filter(
        (elem) => (elem as HTMLImageElement).src.indexOf("loading") < 0,
      )[0],
  ).toHaveAttribute(
    "src",
    "http://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  );
});

it("shows nothing when loading", () => {
  const promise: Promise<Credits> = new Promise(() => {});
  const suspense = suspensify(promise);
  render(<MovieModalSidebar movie={movie} credits={suspense} />);
  expect(() => screen.getByText("Directed By:")).toThrowError();
});

it("shows director", () => {
  render(<MovieModalSidebar credits={suspendedCredits} movie={movie} />);
  expect(screen.getByText("Steven Spielberg")).toBeInTheDocument();
  expect(screen.getByText("Directed By:")).toBeInTheDocument();
});

it("does not show empty director", () => {
  render(<MovieModalSidebar credits={suspendedCredits2} movie={movie} />);
  expect(() => screen.getByText("Directed By:")).toThrowError();
});

it("does shows nothing on error", () => {
  render(
    <MovieModalSidebar
      credits={{
        read: () => {
          throw "DUMMY ERROR";
        },
      }}
      movie={movie}
    />,
  );
  expect(() => screen.getByText("Directed By:")).toThrowError();
});

it('shows "noImage" when no image', () => {
  render(<MovieModalSidebar credits={suspendedCredits} movie={movie2} />);
  expect(
    screen
      .getAllByRole("img")
      .filter(
        (elem: HTMLElement) =>
          (elem as HTMLImageElement).src == "http://localhost/noImage.jpg",
      ),
  ).not.toHaveLength(0);
});

it("shows release date", () => {
  render(<MovieModalSidebar credits={suspendedCredits} movie={movie2} />);
  expect(screen.getByText("Release date: 1978-02-02")).toBeInTheDocument();
});
it("hides missing release date", () => {
  render(<MovieModalSidebar credits={suspendedCredits} movie={movie} />);
  expect(() => screen.getByText("Release date: 1978-02-02")).toThrowError();
});
