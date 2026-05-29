// @vitest-environment happy-dom
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Frame from "./Frame";

describe("Frame", () => {
  it("renders four decorative lines", () => {
    const { container } = render(<Frame />);
    const lines = container.querySelectorAll(".frame_line");
    expect(lines).toHaveLength(4);
  });

  it("is hidden from assistive technologies", () => {
    const { getByRole } = render(<Frame />);
    // aria-hidden="true" means the element is not exposed to accessibility tree
    expect(() => getByRole("presentation")).toThrow();
    const wrapper = document.querySelector("#Frame");
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("renders all four directional classes", () => {
    const { container } = render(<Frame />);
    for (const dir of ["left", "right", "top", "bottom"]) {
      expect(container.querySelector(`.frame_line-${dir}`)).toBeInTheDocument();
    }
  });
});
