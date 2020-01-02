import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login.component";

test("renders learn react link", () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/Login /);
  expect(linkElement).toBeInTheDocument();
});
