import { render, screen } from "@testing-library/react";
import ListItem from "./ListItem";
import noImage from "../assets/noImage.jpg";
import userEvent from "@testing-library/user-event";

it("has thumbnail", () => {
  render(<ListItem title="Title" subtitle="Subtitle" thumbnail={noImage} />);
  expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
});

it("has subtitle", () => {
  render(<ListItem title="Title" subtitle="Subtitle" />);
  expect(screen.getByText("Subtitle")).toBeInTheDocument();
});

it("has no subtitle", () => {
  render(<ListItem title="Title" />);
  expect(() => screen.getByText("Subtitle")).toThrowError();
});

it("has no thumbnail", () => {
  render(<ListItem title="Title" subtitle="Subtitle" />);
  expect(screen.queryAllByRole("img").length).toBe(0);
});

it("can be clicked", () => {
  const fn = jest.fn();
  render(<ListItem title="Title" subtitle="Subtitle" onClick={fn} />);
  userEvent.click(screen.getByRole("link"));
  expect(fn).toHaveBeenCalled();
});

it("has no onClick", () => {
  render(<ListItem title="Title" subtitle="Subtitle" />);
  userEvent.click(screen.getByRole("link"));
});
