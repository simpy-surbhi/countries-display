import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

test("renders App", () => {
  const props = {
    toggleDarkTheme: () => {},
  };
  render(<Header {...props} />);
  const linkElement = screen.getByText(/Where in the world/);
  expect(linkElement).toBeInTheDocument();
});
