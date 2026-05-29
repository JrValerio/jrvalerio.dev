// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("Button — native button variant", () => {
  it("renders a button element by default", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("defaults to type=button to prevent accidental form submission", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("accepts an explicit type override", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("merges custom className with base styles", () => {
    render(<Button className="extra">Label</Button>);
    expect(screen.getByRole("button")).toHaveClass("extra");
    expect(screen.getByRole("button")).toHaveClass("inline-flex");
  });
});

describe("Button — anchor variant", () => {
  it("renders an anchor element when as='a'", () => {
    render(<Button as="a" href="/projects">View</Button>);
    expect(screen.getByRole("link", { name: "View" })).toBeInTheDocument();
  });

  it("sets the href attribute", () => {
    render(<Button as="a" href="/about">About</Button>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/about");
  });

  it("passes additional anchor attributes through", () => {
    render(<Button as="a" href="/cv" target="_blank" rel="noopener noreferrer">CV</Button>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
