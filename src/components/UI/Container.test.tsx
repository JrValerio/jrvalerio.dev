// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Container from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(<Container>hello</Container>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("applies jr-container class to the wrapper div", () => {
    const { container } = render(<Container>content</Container>);
    expect(container.firstElementChild).toHaveClass("jr-container");
  });
});
