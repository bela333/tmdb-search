import { render, screen } from "@testing-library/react";
import PageNumber from "./PageNumber";
import userEvent from "@testing-library/user-event";

it("shows page number", () => {
  render(
    <PageNumber
      results={{
        read: () => ({
          page: 3,
          results: [],
          total_pages: 6,
        }),
      }}
      changePage={() => {}}
    />,
  );
  expect(screen.getByText("3/6")).toBeInTheDocument();
});

it("shows nothing on error", () => {
  render(
    <PageNumber
      results={{
        read: () => {
          throw "DUMMY ERROR";
        },
      }}
      changePage={() => {}}
    />,
  );
  expect(screen.getByTestId("pagenumber-no-show")).toBeInTheDocument();
});

it("goes back when possible", () => {
  const fn = jest.fn();
  render(
    <PageNumber
      results={{
        read: () => ({
          page: 5,
          total_pages: 8,
          results: [],
        }),
      }}
      changePage={fn}
    />,
  );
  userEvent.click(screen.getByTestId("pagenumber-left"));
  expect(fn).toBeCalledWith(4);
});

it("goes forward when possible", () => {
  const fn = jest.fn();
  render(
    <PageNumber
      results={{
        read: () => ({
          page: 5,
          total_pages: 8,
          results: [],
        }),
      }}
      changePage={fn}
    />,
  );
  userEvent.click(screen.getByTestId("pagenumber-right"));
  expect(fn).toBeCalledWith(6);
});

it("does not go back when not possible", () => {
  const fn = jest.fn();
  render(
    <PageNumber
      results={{
        read: () => ({
          page: 1,
          total_pages: 8,
          results: [],
        }),
      }}
      changePage={fn}
    />,
  );
  userEvent.click(screen.getByTestId("pagenumber-left"));
  expect(fn).not.toBeCalled();
});

it("does not go forward when not possible", () => {
  const fn = jest.fn();
  render(
    <PageNumber
      results={{
        read: () => ({
          page: 8,
          total_pages: 8,
          results: [],
        }),
      }}
      changePage={fn}
    />,
  );
  userEvent.click(screen.getByTestId("pagenumber-right"));
  expect(fn).not.toBeCalled();
});
