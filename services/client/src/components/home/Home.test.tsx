import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home.component";

test("renders learn react link", () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/Home /i);
  expect(linkElement).toBeInTheDocument();
});
