import { render } from "@testing-library/react";
import { CountriesContainer } from "./CountriesContainer";
import * as React from "react";

test("renders Countries Container", () => {
  const component = render(<CountriesContainer />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
