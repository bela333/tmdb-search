import { render, screen } from "@testing-library/react";
import ModalNavbar from "./ModalNavbar";
import userEvent from "@testing-library/user-event";

it("closes modal", () => {
  const fn = jest.fn();
  render(<ModalNavbar closeModal={fn} />);
  userEvent.click(screen.getByRole("button"));
  expect(fn).toHaveBeenCalled();
});
