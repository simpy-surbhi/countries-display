import { CountryInfo } from "./CountryInfo";
import * as React from "react";
import { render } from "test-utils";

test("renders Country", () => {
  const component = render(<CountryInfo />);
  const tree = component.getByDisplayValue;
  expect(tree).toMatchSnapshot();
});
