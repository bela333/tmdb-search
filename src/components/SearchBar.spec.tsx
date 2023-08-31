import { act, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";

it("sets text on click", () => {
  const fn = jest.fn();
  render(<SearchBar setText={fn} />);
  act(() => {
    userEvent.type(screen.getByTitle("Search box"), "Test string");
    userEvent.click(screen.getByRole("button"));
  });
  expect(fn).toHaveBeenCalledWith("Test string");
});

it("not sets text when not clicked", () => {
  const fn = jest.fn();
  render(<SearchBar setText={fn} />);
  act(() => {
    userEvent.type(screen.getByTitle("Search box"), "Test string");
  });
  expect(fn).not.toHaveBeenCalledWith("Test string");
});

it("has no setText", () => {
  render(<SearchBar />);
  userEvent.click(screen.getByRole("button"));
});
