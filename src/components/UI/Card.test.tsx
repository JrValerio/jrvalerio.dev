// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "./Card";

describe("Card", () => {
  it("renders children inside an article", () => {
    render(<Card>card content</Card>);
    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent("card content");
  });

  it("always applies jr-surface-card base class", () => {
    render(<Card>text</Card>);
    expect(screen.getByRole("article")).toHaveClass("jr-surface-card");
  });

  it("merges optional className with base classes", () => {
    render(<Card className="custom-class">text</Card>);
    const article = screen.getByRole("article");
    expect(article).toHaveClass("jr-surface-card");
    expect(article).toHaveClass("custom-class");
  });

  it("does not add trailing space when className is omitted", () => {
    render(<Card>text</Card>);
    const article = screen.getByRole("article");
    expect(article.className.trim()).toBe("jr-surface-card p-6");
  });
});
