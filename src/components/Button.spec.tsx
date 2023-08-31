import { render, screen } from "@testing-library/react";
import Button from "./Button";
import "jest-styled-components";
import userEvent from "@testing-library/user-event";

it("shows text", () => {
  render(<Button>Push me!</Button>);
  expect(screen.getByText("Push me!")).toBeInTheDocument();
});

it("when clicked", () => {
  const callback = jest.fn();
  render(<Button onClick={callback}>Push me!</Button>);
  const button = screen.getByText("Push me!");
  userEvent.click(button);
  expect(callback).toHaveBeenCalledTimes(1);
  userEvent.click(button);
  expect(callback).toHaveBeenCalledTimes(2);
});

it("has border", () => {
  render(<Button>Push me!</Button>);
  const button = screen.getByText("Push me!");
  expect(button).toHaveStyleRule("border", "1px solid var(--secondary)");
});

it("has no border", () => {
  render(<Button $noBorder>Push me!</Button>);
  const button = screen.getByText("Push me!");
  expect(button).toHaveStyleRule("border", "0px solid var(--secondary)");
});
