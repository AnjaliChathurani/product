import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
test("render productDetails component in the document", () => {
  const component = render(<App />);
  const childElement = component.getByLabelText("Name");
  expect(childElement).toBeInTheDocument();
});
